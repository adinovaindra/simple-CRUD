const {
  registerNewUser,
  loginRegisteredUser,
} = require("../services/authServices");

const registerUser = async (req, res) => {
  const email = req.body.email;
  const nama = req.body.nama;
  const password = req.body.password;

  await registerNewUser(email, nama, password);

  res.status(201).json({
    pesan: `User registered!`,
    user: {
      nama,
      email,
    },
  });
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const token = await loginRegisteredUser(email, password);

  res.status(200).json({
    pesan: `Login success!`,
    token,
  });
};

module.exports = {
  registerUser,
  loginUser,
};
