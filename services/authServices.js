const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findRegisteredEmail } = require("../repositories/authRepositories");
const { createNewUser } = require("../repositories/authRepositories");

const registerNewUser = async (email, nama, password) => {
  const err = new Error();
  if (!email || !nama || !password) {
    err.message = `Pastikan seluruh field terisi!`;
    err.status = 400;
    throw err;
  }

  const registeredEmail = await findRegisteredEmail(email);

  if (registeredEmail) {
    err.message = `Email sudah terdaftar!`;
    err.status = 400;
    throw err;
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const addUser = await createNewUser(email, nama, hashPassword);

  return addUser;
};

const loginRegisteredUser = async (email, password) => {
  const err = new Error();

  if (!email || !password) {
    err.message = `Pastikan seluruh field terisi!`;
    err.status = 400;
    throw err;
  }

  const registeredEmail = await findRegisteredEmail(email);

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

  return token;
};

module.exports = {
  registerNewUser,
  loginRegisteredUser,
};
