const express = require('express');
const upload = require('../middleware/upload');
const { getImageUrl } = require('../utils/getImageUrl');
const uploadRouter = express.Router();


uploadRouter.post('/image', upload.single('file'), (req,res) => {

    if(!req.file) return res.status(400).json({message: 'No file uploaded'});

   
    const fileUrl = getImageUrl(req.file.filename);
     res.status(201).json({url: fileUrl});
})

module.exports = uploadRouter;