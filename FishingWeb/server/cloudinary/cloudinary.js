const express = require("express")
const cloudinary = require("cloudinary").v2;
const cloudinaryRouter = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET,
    cloud_url: process.env.CLOUDINARY_URL
})

module.exports = { cloudinaryRouter };