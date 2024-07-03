const db = require('./db');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

async function authentificate(username, password) {
  const requete = "SELECT * FROM utilisateur WHERE username = ?";
  const result = await db.query(
    requete, [username]
  );

  if (result.length == 0) {
    return null;
  }

  try {
    let isSuccess = comparePasswords(result[0].password, password);

    if (isSuccess == true) {
      const token = jwt.sign({ username: username }, 'secret_key', { expiresIn: '1h' });
      return { token };
      //res.json({ token: token });
    } else {
      return (null);
    }
  } catch (error) {
    return (null);
  }

}
function comparePasswords(plainPassword, hashedPassword) {
  const isPasswordValid = plainPassword == hashedPassword;
  return isPasswordValid;
}


module.exports = {
  authentificate
}

