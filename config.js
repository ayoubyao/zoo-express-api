const config = {
  db: {
    host: "zoo-express-1970.mysql.b.osc-fr1.scalingo-dbs.com",
    user: "zoo_express_1970",
    password: process.env.DATABASEPASSWORD,
    database: "zoo_express_1970",
    port:34612,
    connectTimeout: 60000
  },
  listPerPage: 10,
};
module.exports = config; 
