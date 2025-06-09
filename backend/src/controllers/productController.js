const Product = require("../models/productModel");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.returnAll();

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.returnById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // create a product
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // delete a product
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.delete(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // update a product
  updateProduct: async (req, res) => {
    try {
      const product = await Product.update(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getRelatedProducts: async (req,res) => {
    try {
      const id = req.params.id;

      if(id){
        const relatedProducts =  await Product.related(id);
        
        if(relatedProducts.length === 0){
          res.status(401).json([]);
        }else {
          res.json(relatedProducts);
        }
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error?.message, error});
    }
  }
};

module.exports = productController;
