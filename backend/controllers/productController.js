
const {Product, User, Company} = require("../models");

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: User,
            attributes: ['id'],
            include: [
              {
                model: Company,
                attributes: ['name']
              }
            ]
          }
        ]
      });

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // create a product
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      console.log(product);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // delete a product
  deleteProduct: async (req, res) => {
    try {
      const deleted = await Product.destroy({where: {id:req.params.id}});
      if(!deleted){
        return res.status(401).json({message: 'Product not found'})
      }
      res.json({message: 'Product deleted'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  // update a product
  updateProduct: async (req, res) => {
    try {
      const {userId} = req.params;
      console.log(req.body);

      const product = req.body;
      const [updated] = await Product.update(product, {
        where : {
          id: product.id,
          userId
        },
        returning: true
      });

      if(!updated){
        return res.status(404).json({message: "Product not found."})
      }
      const updatedProduct = await Product.findByPk(product.id);
      res.json(updatedProduct);
      
    } catch (error) {
  
      res.status(500).json({ message: error.message });
    }
  },

  getUserProducts: async (req,res) => {
    try {
      const {userId} = req.params;
      const products = await Product.findAll({
        where: {userId},
        include: [
      
         {
          model: User,
          attributes: {exclude: ['password','createdAt','updatedAt']}
         }
        ],
        order: [['createdAt', 'DESC']]
      }
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }



  },
  getRelatedProducts: async (req,res) => {
    try {
      // const id = req.params.id;

      // if(id){
      //   const relatedProducts =  await Product.related(id);
        
      //   if(relatedProducts.length === 0){
      //     res.status(401).json([]);
      //   }else {
      //     res.json(relatedProducts);
      //   }
      // }

     return  res.json([]);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({message: error?.message, error});
    }
  }
};

module.exports = productController;
