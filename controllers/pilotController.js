const {
  showAllPilots,
  verifyId,
  addNewPilot,
  editPilotExisted,
  deletePilotExisted,
} = require("../services/pilotServices");

const getAllPilot = async (req, res) => {
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
};

const getPilotById = async (req, res) => {
  const ID = Number(req.params.id);
  const selectedPilot = await verifyId(ID);

  const { id, nama, jamTerbang } = { ...selectedPilot };

  res.status(200).json({
    message: `Pilot dengan ID ${ID} ditemukan!`,
    Id: id,
    Nama: nama,
    "Jam Terbang": jamTerbang,
  });
};

const addPilot = async (req, res) => {
  const nama = req.body.nama?.trim();
  const jamTerbang = Number(req.body.jamTerbang);

  const pilotAdded = await addNewPilot(nama, jamTerbang);

  res.status(201).json({
    message: `Pilot ${nama} berhasil ditambahkan!`,
    pilotAdded,
  });
};

const editPilot = async (req, res) => {
  const id = Number(req.params.id);
  const nama = req.body.nama?.trim();
  const jamTerbang = Number(req.body.jamTerbang);

  const pilotEdited = await editPilotExisted(id, nama, jamTerbang);

  const { oldPilotData, selectedPilot } = { ...pilotEdited };
  if (
    oldPilotData.nama === selectedPilot.nama &&
    selectedPilot.jamTerbang !== oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Jam terbang berhasil dirubah",
      selectedPilot,
    });
  } else if (
    oldPilotData.nama !== selectedPilot.nama &&
    selectedPilot.jamTerbang === oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Nama pilot berhasil dirubah",
      selectedPilot,
    });
  } else if (
    oldPilotData.nama == selectedPilot.nama &&
    selectedPilot.jamTerbang === oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Tidak ada perubahan data!",
      selectedPilot,
    });
  } else if (
    oldPilotData.nama !== selectedPilot.nama &&
    selectedPilot.jamTerbang !== oldPilotData.jamTerbang
  ) {
    res.status(200).json({
      pesan: "Perubahan data berhasil!",
      selectedPilot,
    });
  }
};

const deletePilot = async (req, res) => {
  const id = Number(req.params.id);

  const pilotDeleted = await deletePilotExisted(id);

  res.status(200).json({
    pesan: `Pilot dengan Id ${id} telah dihapus!`,
    pilotDeleted,
  });
};

module.exports = {
  getAllPilot,
  getPilotById,
  addPilot,
  editPilot,
  deletePilot,
};
