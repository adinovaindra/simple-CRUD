const jwt = require("jsonwebtoken");
const authenticationToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    const err = new Error(`Unauthorized!`);
    err.status = 401;
    throw err;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const err = new Error(`Invalid Token!`);
      err.status = 403;
      throw err;
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticationToken;
