// CLOUDINARY SET UP
/****************************************************************/
const cloudinary = require('cloudinary').v2;

// var multer = require('multer');
// var storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   }
// });

// var upload = multer({ storage: storage })

cloudinary.config({
  cloud_name: 'damclaohv',                            // TODO USE ENV FOR SECURITY AFTER MAKING SURE IT ALL WORKS
  api_key: 357812489313368,                           // process.env.CLOUDINARY_API_KEY, 
  api_secret: 'BN_PH_5aGxM9bI-eMB9HXHIxR10'             // process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
