const pool = require("../config/db");

const Inquiry = {
  returnAll: async () => {
    const result = await pool.query("SELECT * FROM inquiry");
    return result.rows;
  },
  returnById: async (id) => {
    const result = await pool.query("SELECT * FROM inquiry WHERE id = $1", [
      id,
    ]);
    return result.rows;
  },
  create: async (userInfo, productsInfo) => {
    try {
      const {
        companyName: company_name,
        businessType: business_type,
        contactName: contact_name,
        contactPhone: contact_phone,
        contactEmail: contact_email,
        message,
      } = userInfo;

      // Step 1: Insert into inquirt table
      const query = `INSERT INTO inquiry (company_name, business_type, contact_name, contact_phone, contact_email, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`;

      const result = await pool.query(query, [
        company_name,
        business_type,
        contact_name,
        contact_phone,
        contact_email,
        message,
      ]);

      const inquiryId = result.rows[0].id;

      // Step 2: Insert into inquiry_product table
      for (const product of productsInfo) {
        const productQuery = `INSERT INTO product_inquiry (product_id, inquiry_id, quantity) VALUES ($1, $2, $3)`;
        await pool.query(productQuery, [
          product.productId,
          inquiryId,
          product.quantity,
        ]);
      }

      await pool.query("COMMIT");
      return { inquiryId };
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  },
  update: async (id, inquiry) => {
    const result = await pool.query(
      "UPDATE inquiry SET company_name = $1, business_type = $2, contact_name = $3, contact_phone = $4, contact_email = $5 WHERE id =$6 RETURNING *",
      [
        inquiry.company_name,
        inquiry.business_type,
        inquiry.contact_name,
        inquiry.contact_phone,
        inquiry.contact_email,
        id,
      ],
    );

    return result.rows[0];
  },
  delete: async (id) => {
    const result = await pool.query("DELETE FROM inquiry WHERE id = $1", [id]);
    return result.rows[0];
  },
};

module.exports = Inquiry;
