const { Pool } = require("pg");

const pool = new Pool({
  user: "sokoni_admin",
  password: "J0YBXsr6EyzXcxG",
  host: "localhost",
  port: 5432,
  database: "sokoni_db",
});

pool.on("connect", () => {
  console.log("✅ Connected to PostresSQL");
});

module.exports = pool;
