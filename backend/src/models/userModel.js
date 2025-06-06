const pool = require("../config/db");
const bcrypt = require("bcrypt");

const USER = {
  returnAll: async () => {
    const result = await pool.query("SELECT * FROM sokoni_user");
    return result.rows;
  },
  returnByEmail: async (email) => {
    const result = await pool.query(
      "SELECT * FROM sokoni_user WHERE email = $1",
      [email],
    );
    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  },
  returnById: async (id) => {
    const result = await pool.query("SELECT * FROM sokoni_user WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
  create: async (user) => {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      //check if email already exists
      const existingUser = await USER.returnByEmail(user.email);
      if (existingUser) {
        return null;
      }

      const result = await pool.query(
        "INSERT INTO sokoni_user (email, password) VALUES ($1, $2) RETURNING *",
        [user.email, hashedPassword],
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    const result = await pool.query("DELETE FROM sokoni_user WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  },
  update: async (id, user) => {
    const result = await pool.query(
      "UPDATE sokoni_user SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
      [user.email, user.password, id],
    );
    return result.rows[0];
  },
};

module.exports = USER;
