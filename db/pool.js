const { Pool } = require("pg");

module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: "hossein",
  database: "mini_messagedb",
  password: "24601",
  port: 5432, // The default port
});
