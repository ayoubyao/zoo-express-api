const config = {
  db: {
    host: "mysql-179289-0.cloudclusters.net:10036",
    user: "alasquality",
    password: process.env.DATABASEPASSWORD,
    database: "zoodb",
    connectTimeout: 60000
  },
  listPerPage: 10,
};
module.exports = config;
