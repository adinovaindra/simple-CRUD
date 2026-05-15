const prisma = require("../config/db");

const specificPilot = async (id) => {
  const selectedPilot = await prisma.pilot.findUnique({
    where: {
      id,
    },
  });

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

const insertnewPilot = async (nama, jamTerbang) => {
  const insertPilot = await prisma.pilot.create({
    data: {
      nama,
      jamTerbang,
    },
  });

  return insertPilot;
};

const updatePilot = async (id, nama, jamTerbang) => {
  const selectedPilot = await prisma.pilot.update({
    where: {
      id,
    },
    data: {
      nama: nama,
      jamTerbang: jamTerbang,
    },
  });

  return selectedPilot;
};

const deletePilotSelected = async (id) => {
  const deletePilot = await prisma.pilot.delete({
    where: {
      id,
    },
  });

  return deletePilot;
};

const findRegisteredEmail = async (email) => {
  const registeredEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return registeredEmail;
};

module.exports = {
  specificPilot,
  showAllPilots,
  insertnewPilot,
  updatePilot,
  deletePilotSelected,
  findRegisteredEmail,
};
