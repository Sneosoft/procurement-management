const multer = require("multer");
const path = require("path");

module.exports = class FileUploader {
  constructor() {}

  upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", "..", "uploads"));
      },
      filename: function (req, file, cb) {
        // cb(
        //   null,
        //   file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        // );
        console.log(req.body);
        const fileName = `${req.query.id}-${
          req.query.type
        }-${Date.now()}${path.extname(file.originalname)}`;
        req.filePath = fileName;
        cb(null, `${fileName}`);
      },
    }),
  });
};
