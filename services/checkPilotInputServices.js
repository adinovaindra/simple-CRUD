const checkPilotInput = (nama, jamTerbang) => {
  if (!nama && jamTerbang <= 0) {
    const err = new Error(
      "Nama kosong dan jam terbang dibawah atau sama dengan 0 jam!",
    );
    err.status = 400;
    throw err;
  }

  if (!nama && !jamTerbang) {
    const err = new Error("Body masih kosong!");
    err.status = 400;
    throw err;
  }

  if (!nama || typeof nama !== "string") {
    const err = new Error("Nama belum ditambahkan atau format nama salah!");
    err.status = 400;
    throw err;
  }

  if (isNaN(jamTerbang) || jamTerbang <= 0) {
    const err = new Error(
      "Jam terbang belum ditambahkan atau format jam terbang salah!",
    );
    err.status = 400;
    throw err;
  }
};


module.exports = checkPilotInput