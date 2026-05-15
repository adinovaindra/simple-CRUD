const express = require("express");
const prisma = require("../prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  let err = new Error();
  const email = req.body.email;
  const nama = req.body.nama;
  const password = req.body.password;

  if (!email || !nama || !password) {
    err.message = `Pastikan seluruh field terisi!`;
    err.status = 400;
    throw err;
  }

  const registeredEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (registeredEmail) {
    err.message = `Email sudah terdaftar!`;
    err.status = 400;
    throw err;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const addUser = await prisma.user.create({
    data: {
      nama,
      email,
      password: hashPassword,
    },
  });

  res.status(201).json({
    pesan: `User registered!`,
    user: {
      nama,
      email,
    },
  });
});

router.post("/login", async (req, res) => {
  const err = new Error();
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    err.message = `Pastikan seluruh field terisi!`;
    err.status = 400;
    throw err;
  }

  const registeredEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!registeredEmail) {
    err.message = `Email / Password Salah!`;
    err.status = 401;
    throw err;
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    registeredEmail.password,
  );

  if (!isPasswordMatch) {
    err.message = `Email / Password Salah!`;
    err.status = 401;
    throw err;
  }

  const payload = { id: registeredEmail.id, email: registeredEmail.email };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({
    pesan: `Login success!`,
    token
  });
});

module.exports = router;
