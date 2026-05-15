require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRoutes");
const prisma = require("./prisma");
const pilotRouter = require("./routes/pilotRoutes");

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

prisma
  .$connect()
  .then(() => console.log("Database terhubung!"))
  .catch((err) => console.log("Database gagal terhubung:", err));

const PORT = process.env.PORT;

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

app.use("/pilot", pilotRouter);

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
