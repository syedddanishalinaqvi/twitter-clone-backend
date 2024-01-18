import multer from "multer";
import fs from 'fs';

const destinationDirectory='./image';
if(!fs.existsSync(destinationDirectory)){
    fs.mkdirSync(destinationDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, destinationDirectory)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage, })