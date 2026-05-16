const { showAllPilots } = require("../repositories/pilotRepositories");
const {
  verifyId,
  addNewPilot,
  editPilotExisted,
  deletePilotExisted,
} = require("../services/pilotServices");

const getAllPilot = async (req, res, next) => {
  try {
    const pilots = await showAllPilots();

    if (pilots.length === 0) {
      return res
        .status(200)
        .send(`Daftar pilot Indonesia Airlines masih kosong!`);
    }
    res.status(200).json({
      pesan: "Daftar Pilot Indonesia Airlines",
      pilots,
    });
  } catch (error) {
    next(error);
  }
};

const getPilotById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const selectedPilot = await verifyId(id);

    const { nama, jamTerbang } = { ...selectedPilot };

    res.status(200).json({
      pesan: `Pilot dengan ID ${id} ditemukan!`,
      Id: id,
      Nama: nama,
      "Jam Terbang": jamTerbang,
    });
  } catch (error) {
    next(error);
  }
};

const addPilot = async (req, res, next) => {
  try {
    const nama = req.body.nama;
    const jamTerbang = Number(req.body.jamTerbang);

    const pilotAdded = await addNewPilot(nama, jamTerbang);

    res.status(201).json({
      pesan: `Pilot ${nama} berhasil ditambahkan!`,
      pilotAdded,
    });
  } catch (error) {
    next(error);
  }
};

const editPilot = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const nama = req.body.nama;
    const jamTerbang = Number(req.body.jamTerbang);

    const { pesan, selectedPilot } = await editPilotExisted(
      id,
      nama,
      jamTerbang,
    );

    res.status(200).json({
      pesan,
      selectedPilot,
    });
  } catch (error) {
    next(error);
  }
};

const deletePilot = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const pilotDeleted = await deletePilotExisted(id);

    res.status(200).json({
      pesan: `Pilot dengan Id ${id} telah dihapus!`,
      pilotDeleted,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPilot,
  getPilotById,
  addPilot,
  editPilot,
  deletePilot,
};
