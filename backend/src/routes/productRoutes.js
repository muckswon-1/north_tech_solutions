const express = require("express");
const productController = require("../controllers/productController");
const ProductRouter = express.Router();

//get all products
ProductRouter.get("/", productController.getAllProducts);
//get single product by id
ProductRouter.get("/:id", productController.getProductById);
//create a product
ProductRouter.post("/", productController.createProduct);
//delete a product
ProductRouter.delete("/:id", productController.deleteProduct);
//update a product
ProductRouter.put("/:id", productController.updateProduct);

module.exports = ProductRouter;
