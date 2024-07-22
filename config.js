const config = {
  db: {
    host: "mysql-179289-0.cloudclusters.net",
    user: "alasquality",
    password: process.env.DATABASEPASSWORD,
    database: "zoodb",
    connectTimeout: 60000
  },
  listPerPage: 10,
};
module.exports = config;
