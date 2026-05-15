const prisma = require("../config/db");

const findRegisteredEmail = async (email) => {
  const registeredEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const createNewUser = async (email, nama, password) => {
  const user = await prisma.user.create({
    data: {
      nama,
      email,
      password,
    },
  });

  return user;
};

module.exports = {
  findRegisteredEmail,
  createNewUser,
};
