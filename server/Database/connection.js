const pg = require("pg");

const connection = pg.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chattott",
});

module.exports = connection;
