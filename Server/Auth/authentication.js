const jwt = require('jsonwebtoken');

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token not found", status: false });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid token", status: false });
    }

    req.user = decoded; // Optionally pass decoded token data
    next();
  });
};

module.exports = verifytoken;
