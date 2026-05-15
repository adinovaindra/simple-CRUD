const {
  specificPilot,
  insertnewPilot,
  updatePilot,
  deletePilotSelected,
} = require("../repositories/pilotRepositories");
const checkPilotInput = require("./checkPilotInputServices");

const verifyId = async (id) => {
  const selectedPilot = await specificPilot(id);

  if (!selectedPilot) {
    const err = new Error(`Pilot dengan id ${id} tidak ditemukan`);
    err.status = 404;
    throw err;
  }

  return selectedPilot;
};

const addNewPilot = async (nama, jamTerbang) => {
  checkPilotInput(nama, jamTerbang);

  const insertPilot = await insertnewPilot(nama, jamTerbang);

  return insertPilot;
};

const editPilotExisted = async (id, nama, jamTerbang) => {
  let err = new Error();
  const oldPilotData = await verifyId(id);

  checkPilotInput(nama, jamTerbang);

  if (!oldPilotData) {
    err.message = `Pilot dengan ID ${id} tidak ditemukan!`;
    err.status = 404;
    throw err;
  }

  const selectedPilot = await updatePilot(id, nama, jamTerbang);

  let pesan = "Perubahan data berhasil!";

  if (
    oldPilotData.nama === selectedPilot.nama &&
    selectedPilot.jamTerbang !== oldPilotData.jamTerbang
  ) {
    pesan = "Jam terbang berhasil dirubah";
  } else if (
    oldPilotData.nama !== selectedPilot.nama &&
    selectedPilot.jamTerbang === oldPilotData.jamTerbang
  ) {
    pesan = "Nama pilot berhasil dirubah";
  } else if (
    oldPilotData.nama == selectedPilot.nama &&
    selectedPilot.jamTerbang === oldPilotData.jamTerbang
  ) {
    pesan = "Tidak ada perubahan data!";
  }

  return {
    pesan,
    selectedPilot,
  };
};

const deletePilotExisted = async (id) => {
  verifyId(id);

  const deletePilot = await deletePilotSelected(id);

  return deletePilot;
};

module.exports = {
  verifyId,
  addNewPilot,
  editPilotExisted,
  deletePilotExisted,
};
