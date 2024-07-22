const config = {
  db: {
    host: "zoo-express-1970.mysql.b.osc-fr1.scalingo-dbs.com:34612",
    user: "zoo_express_1970",
    password: process.env.DATABASEPASSWORD,
    database: "dbs13114825",
    connectTimeout: 60000
  },
  listPerPage: 10,
};
module.exports = config; 
