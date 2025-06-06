const { Pool } = require("pg");
const envFile = require("./envConfig");

require("dotenv").config({ path: envFile });

const poolConfig = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
};

let pool = null;

if (process.env.NODE_ENV === "staging") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool(poolConfig);
}

pool.on("connect", () => {
  console.log("✅ Connected to PostresSQL");
});

module.exports = pool;
