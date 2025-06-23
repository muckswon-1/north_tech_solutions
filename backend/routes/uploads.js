const express = require('express');
const upload = require('../middleware/upload');
const uploadRouter = express.Router();


uploadRouter.post('/image', upload.single('file'), (req,res) => {
   
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file?.filename}`;
     res.status(201).json({url: fileUrl});
})

module.exports = uploadRouter;