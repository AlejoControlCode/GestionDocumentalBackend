const multer = require('multer');
const path = require('path');
const fs = require('fs'); // <-- IMPORTANTE


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../tmp')), // carpeta temporal
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const tmpDir = path.join(__dirname, '../tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
}

const upload = multer({ storage });
module.exports = upload;
