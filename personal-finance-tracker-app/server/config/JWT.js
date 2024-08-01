const { sign, verify } = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET,
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated" });

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;
    next();
    // if (validToken) {
    //   req.authenticated = true;
    //   return next();
    // }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
