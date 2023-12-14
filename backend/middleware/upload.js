const fs = require('fs')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname )
    }
  })
  
  const deleteFile = (thumb) => {
    return fs.unlink(`./public/uploads/${thumb}`, (err) => {
        if (err) {
            return {status : 'error', err};
            //console.error(`Error deleting file: ${err}`);
        } else {
            return {status : 'success'};
           // console.log('File deleted successfully');
        }
    })
  }
  const upload = multer({ storage: storage })
module.exports = {upload, deleteFile };