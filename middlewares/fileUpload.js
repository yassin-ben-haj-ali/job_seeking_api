const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')

const ensureFolderExists = (folderPath) => {
    const absolutePath = path.resolve(__dirname, '../', folderPath);
    if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath, { recursive: true });
    }
    return absolutePath;
};


//console.log(ensureFolderExists("uploads")) ======> C:\Users\yassine\Desktop\projects\job-api\uploads


const configureUpload = (destinationFolder) => {
    try {
        // Ensure the destination folder exists
        const absolutePath = ensureFolderExists(`${destinationFolder}`);

        const storage = multer.diskStorage({
            destination(req, file, cb) {
                cb(null, `${absolutePath}`);
            },
            filename(req, file, cb) {
                const extension = path.extname(file.originalname);
                const fileName = uuidv4() + extension;
                cb(null, fileName);
            },
        });

        const upload = multer({ storage });

        return upload;
    } catch (err) {
        throw new Error(err);
    }
};

const singleUpload = (folder, attribute) => configureUpload(folder).single(attribute);

module.exports = {
    singleUpload,
};