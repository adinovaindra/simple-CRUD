const {
  registerNewUser,
  loginRegisteredUser,
} = require("../services/authServices");

const registerUser = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const token = await loginRegisteredUser(email, password);

    res.status(200).json({
      pesan: `Login success!`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
