require("dotenv").config();
const express = require("express");
const authRouter = require("./auth");
const prisma = require("./prisma");
const authenticationToken = require("./middleware");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

prisma
  .$connect()
  .then(() => console.log("Database terhubung!"))
  .catch((err) => console.log("Database gagal terhubung:", err));

const PORT = process.env.PORT;

const verifyId = async (ID) => {
  const selectedPilot = await prisma.pilot.findUnique({
    where: {
      id: ID,
    },
  });

  return selectedPilot;
};

app.use((req, res, next) => {
  const currentDate = new Date().getDate();
  const month = new Date().getMonth();
  const monthList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const currentYear = new Date().getFullYear();
  console.log(
    `Request ini memiliki request method "${req.method}", URL "${req.url}", dan diterima pada tanggal ${currentDate} ${monthList[month]} ${currentYear}.`,
  );

  next();
});

app.get("/", (req, res) => {
  res.send(`Halo saya kembali`);
});

app.get("/pilot", authenticationToken, async (req, res) => {
  const pilots = await prisma.pilot.findMany({
    orderBy: {
      id: "asc",
    },
  });
  if (pilots.length === 0) {
    return res
      .status(200)
      .send(`Daftar pilot Indonesia Airlines masih kosong!`);
  }
  res.status(200).json({
    pesan: "Daftar Pilot Indonesia Airlines",
    pilots,
  });
});

app.get("/pilot/:id", async (req, res) => {
  const ID = Number(req.params.id);
  const selectedPilot = await verifyId(ID);

  if (!selectedPilot) {
    const err = new Error(`Pilot dengan id ${ID} tidak ditemukan`);
    err.status = 404;
    throw err;
  }

  const { id, nama, jamTerbang } = { ...selectedPilot };

  res.status(200).json({
    message: `Pilot dengan ID ${ID} ditemukan!`,
    Id: id,
    Nama: nama,
    "Jam Terbang": jamTerbang,
  });
});

app.post("/pilot", async (req, res) => {
  const nama = req.body.nama?.trim();
  const jamTerbang = Number(req.body.jamTerbang);

  if (!nama && jamTerbang <= 0) {
    const err = new Error(
      "Nama kosong dan jam terbang dibawah atau sama dengan 0 jam!",
    );
    err.status = 400;
    throw err;
  }

  if (!nama && !jamTerbang) {
    const err = new Error("Req Body masih kosong!");
    err.status = 400;
    throw err;
  }

  if (!nama || typeof nama !== "string") {
    const err = new Error("Nama belum ditambahkan atau format nama salah!");
    err.status = 400;
    throw err;
  }

  if (isNaN(jamTerbang) || jamTerbang <= 0) {
    const err = new Error(
      "Jam terbang belum ditambahkan atau format jam terbang salah!",
    );
    err.status = 400;
    throw err;
  }

  const addPilot = await prisma.pilot.create({
    data: {
      nama,
      jamTerbang,
    },
  });

  res.status(201).json({
    message: `Pilot ${nama} berhasil ditambahkan!`,
    addPilot,
  });
});

app.put("/pilot/:id", async (req, res) => {
  let err = new Error();
  const ID = Number(req.params.id);
  const nama = req.body.nama?.trim();
  const jamTerbang = Number(req.body.jamTerbang);
  const oldPilotData = await verifyId(ID);

  if (!oldPilotData) {
    err.message = `Pilot dengan ID ${ID} tidak ditemukan!`;
    err.status = 404;
    throw err;
  }

  if (!nama && !jamTerbang) {
    err.message = `Format nama kosong atau salah dan Format jam terbang kosong atau salah!`;
    err.status = 400;
    throw err;
  }

  if (isNaN(jamTerbang) || jamTerbang <= 0) {
    err.message = `Format jam terbang salah / Jam terbang tidak boleh kurang dari 0!`;
    err.status = 400;
    throw err;
  }

  if (!nama) {
    err.message = `Format nama salah / nama tidak boleh kosong!`;
    err.status = 400;
    throw err;
  }

  const selectedPilot = await prisma.pilot.update({
    where: {
      id: Number(ID),
    },
    data: {
      nama: nama,
      jamTerbang: jamTerbang,
    },
  });

  if (
    oldPilotData.nama === selectedPilot.nama &&
    selectedPilot.jamTerbang !== oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Jam terbang berhasil dirubah",
      selectedPilot,
    });
  } else if (
    oldPilotData.nama !== selectedPilot.nama &&
    selectedPilot.jamTerbang === oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Nama pilot berhasil dirubah",
      selectedPilot,
    });
  } else if (
    oldPilotData.nama == selectedPilot.nama &&
    selectedPilot.jamTerbang === oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Tidak ada perubahan data!",
      selectedPilot,
    });
  } else if (
    oldPilotData.nama !== selectedPilot.nama &&
    selectedPilot.jamTerbang !== oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Perubahan data berhasil!",
      selectedPilot,
    });
  }
});

app.delete("/pilot/:id", async (req, res) => {
  const ID = Number(req.params.id);
  const selectedPilot = await verifyId(ID);

  if (!selectedPilot) {
    const err = new Error(`Pilot dengan ${ID} tidak ditemukan!`);
    err.status = 404;
    throw err;
  }

  const deletePilot = await prisma.pilot.delete({
    where: {
      id: ID,
    },
  });

  res.status(200).json({
    pesan: `Pilot dengan Id ${ID} telah dihapus!`,
    deletePilot,
  });
});

app.get("/{*path}", (req, res) => {
  const err = new Error(`PAGE NOT FOUND!`);
  err.status = 404;
  throw err;
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    pesan: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
