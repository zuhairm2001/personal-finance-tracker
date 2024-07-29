const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "jwtscretplschange",
  );
  return accessToken;
};

const validateToken (req, res, next) => {
  const accessToken = req.cookies["accessToken"]

  if (!accessToken) 
    return res.status(400).json({error: "User not Authenticated"});

  try {
    const validToken = verify(accessToken, "jwtscretplschange")
    if (validToken) {
      req.authenticated = true
      return next()
    }
  } catch(err) {
    return res.status(400).json({error: err})
  }
}

module.exports = { createTokens };
