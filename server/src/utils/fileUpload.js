const fs = require('fs');
const path = require('path');
const multer = require('multer');
const env = process.env.NODE_ENV || 'development';
const { DEV_FILES_PATH, PROD_FILES_PATH } = require('../constants');

const devImagesPath = path.resolve(DEV_FILES_PATH, 'images');
const devContestsPath = path.resolve(DEV_FILES_PATH, 'contests');

const imagesPath =
  env === 'production' ? `${PROD_FILES_PATH}/images` : devImagesPath;

const contestsPath =
  env === 'production' ? `${PROD_FILES_PATH}/contests` : devContestsPath;

if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath, {
    recursive: true,
  });
}

if (!fs.existsSync(contestsPath)) {
  fs.mkdirSync(contestsPath, {
    recursive: true,
  });
}

const storageImageFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, imagesPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const storageContestFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, contestsPath);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const multerImagesInstanse = multer({ storage: storageImageFiles });
const multerContestsInstanse = multer({ storage: storageContestFiles });

module.exports.uploadAvatar = multerImagesInstanse.single('file');
module.exports.uploadContestFiles = multerContestsInstanse.array('files', 3);
module.exports.updateContestFile = multerContestsInstanse.single('file');
module.exports.uploadLogoFiles = multerContestsInstanse.single('offerData');
