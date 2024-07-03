const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);

  // for (let i = 0; i < params.length; i++) {
  //   params[i] = connection.escape(params[i])
  // }

  const [results,] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}