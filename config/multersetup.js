const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${new Date().getDate().toLocaleString()}${file.originalname}`);
    // callback(null, Date.now() + file.originalname);
  },
});
// const storage = multer.diskStorage({
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + file.originalname);
//   },
// });

// const imageFilter = (req, file, cb) => {
//   if (![file.originalname.match(/\.(jpg|jpeg|png|pdf|)$/i)]) {
//     return cb(new Error("Only image files and pdf are supported!"), false);
//   }
//   cb(null, true);
// };

const upload = multer({
  storage,
});

module.exports = upload;
