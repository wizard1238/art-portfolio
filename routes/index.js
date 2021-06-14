var express = require('express');
var router = express.Router();
let fs = require('fs')

let multer = require('multer')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/art/')
  },
  filename: function (req, file, cb) {
    fs.readdir("./public/images/art", (dirErr, files) => {
      if (dirErr) console.log(dirErr)

      let lastName = (files.length == 0) ? -1 : parseInt(files[files.length - 1])
      cb(null, `${lastName + 1}`)
    })
  }
})

let mult = multer({storage: storage})

let upload = require('../controllers/upload')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Joshua\'s Portfolio!' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Admin site'})
})

router.get('/getImages', upload.get)
router.post('/upload', mult.array('img'), upload.upload)
router.post('/reorder', upload.reorder)
router.post('/delete', upload.delete)
module.exports = router;