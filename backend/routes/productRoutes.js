const express = require("express");
const productController = require("../controllers/productController");
const { verifyAccessToken } = require("./verify");
const { check } = require("express-validator");
const checkRole = require("../middleware/checkRole");
const ProductRouter = express.Router();

//get all products
ProductRouter.get("/", productController.getAllProducts);
//get single product by id
ProductRouter.get("/:id", productController.getProductById);
//create a product
ProductRouter.post("/",verifyAccessToken,checkRole(['user','admin']), productController.createProduct);
//delete a product
ProductRouter.delete("/:id", productController.deleteProduct);
//update a product
ProductRouter.patch("/user/:userId",verifyAccessToken, checkRole(['user','admin']),  productController.updateProduct);
ProductRouter.get("/user/:userId",verifyAccessToken, checkRole(['user','admin']), productController.getUserProducts);
ProductRouter.get("/:id/related", productController.getRelatedProducts );

module.exports = ProductRouter;
