const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// diskstorage -> Disk storage engine gives us full control on storing files to disk.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/images/uploads')
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, name) {                                        // name is buffer.To convert it into hexa use name.toString("hex")
        const fn = name.toString("hex") + path.extname(file.originalname);
        cb(null, fn);
    })  
  }
})


// export upload variable 

const upload = multer({ storage: storage });

module.exports = upload;







