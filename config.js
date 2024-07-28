const config = {
  db: {
    host: "108.181.197.182",
    user: "alasquality",
    port: 10036,
    password: process.env.DATABASEPASSWORD,
    database: "zoodb",
    connectTimeout: 60000
  },
  listPerPage: 10,
};
module.exports = config;
