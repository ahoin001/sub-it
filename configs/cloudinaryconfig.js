// CLOUDINARY SET UP
/****************************************************************/
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'damclaohv',                            // TODO USE ENV FOR SECURITY AFTER MAKING SURE IT ALL WORKS
  api_key: 357812489313368,                           // process.env.CLOUDINARY_API_KEY, 
  api_secret: 'BN_PH_5aGxM9bI-eMB9HXHIxR10'             // process.env.CLOUDINARY_API_SECRET

  // cloud_name: process.env.cloudName,
  // api_key: process.env.cloudKey,
  // api_secret: process.env.cloudSecret

});

module.exports = cloudinary;