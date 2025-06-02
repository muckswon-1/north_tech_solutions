const pool = require("../config/db");

const Product = {
  returnAll: async () => {
    const result = await pool.query("SELECT * FROM product");
    return result.rows;
  },
  returnById: async (id) => {
    const result = await pool.query("SELECT * FROM product WHERE id = $1", [
      id,
    ]);
    return result.rows;
  },
  create: async (product) => {
    const result = await pool.query(
      "INSERT INTO product (name, description, price, image_url, additional_images,specs) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        product.name,
        product.description,
        product.price,
        product.image_url,
        product.additional_images,
        product.specs,
      ],
    );
    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query("DELETE FROM product WHERE id = $1", [id]);
    return result.rows[0];
  },
  // update a product by any field
  update: async (id, product) => {
    const productValues = Object.values(product);
    const productKeys = Object.keys(product);
    const query = `UPDATE product SET ${productKeys.map((key, index) => `${key} = $${index + 1}`).join(", ")} WHERE id = $${productKeys.length + 1} RETURNING *`;

    const result = await pool.query(query, [...productValues, id]);
    return result.rows[0];
  },
};

module.exports = Product;
