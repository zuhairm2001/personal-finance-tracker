const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user.id },
    "tempsecret",
  );

  return accessToken;
};

module.exports = { createTokens };
