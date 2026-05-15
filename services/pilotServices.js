const verifyId = async (id) => {
  const selectedPilot = await prisma.pilot.findUnique({
    where: {
      id,
    },
  });

  if (!selectedPilot) {
    const err = new Error(`Pilot dengan id ${id} tidak ditemukan`);
    err.status = 404;
    throw err;
  }

  return selectedPilot;
};

const showAllPilots = async () => {
  const pilots = await prisma.pilot.findMany({
    orderBy: {
      id: "asc",
    },
  });
  return pilots;
};

const addNewPilot = async (nama, jamTerbang) => {
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

  const insertPilot = await prisma.pilot.create({
    data: {
      nama,
      jamTerbang,
    },
  });

  return insertPilot;
};

const editPilotExisted = async (id, nama, jamTerbang) => {
  let err = new Error();
  const oldPilotData = await verifyId(id);

  if (!oldPilotData) {
    err.message = `Pilot dengan ID ${id} tidak ditemukan!`;
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
      id,
    },
    data: {
      nama: nama,
      jamTerbang: jamTerbang,
    },
  });

  const allDatas = {
    oldPilotData,
    selectedPilot,
  };

  return allDatas;
};

const deletePilotExisted = async (id) => {
  verifyId(id);

  const deletePilot = await prisma.pilot.delete({
    where: {
      id,
    },
  });

  return deletePilot
};

module.exports = {
  verifyId,
  showAllPilots,
  addNewPilot,
  editPilotExisted,
  deletePilotExisted,
};
