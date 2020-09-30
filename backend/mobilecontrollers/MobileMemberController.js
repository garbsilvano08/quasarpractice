// Classes
const CounterClass      = require('../classess/CounterClass');
const PersonClass       = require('../classess/PersonClass');
const PersonLogsClass   = require('../classess/PersonLogsClass');
const AccountClass      = require('../classess/AccountClass');

const Client            = require("@googlemaps/google-maps-services-js").Client;
const client            = new Client({});

const axios             = require('axios');
const multer            = require('multer');
const path              = require('path');
const excel             = require('exceljs');

// Models
const MDB_USER_LOGS   = require('../models/MDB_USER_LOGS');

const parseJson         = require('parse-json');

const storage = multer.diskStorage({
  destination: './uploads/images/',
  filename: function (req, file, cb) {
    //   cb(null, file.originalname + '-' + Date.now() +
    //   path.extname(file.originalname));
      cb(null, file.originalname);

  }
});

const upload = multer(
{
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: function(req, file, cb)
    {
        checkFileType(file, cb)
    }
}).single('image');


function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
      return cb(null, true);
  } else {
      cb('Error: Images Only!');
  }
}
module.exports =
{
    async getMobileUserLogs(req, res)
    {  
        return res.send(await new MDB_USER_LOGS().collection.find({is_active : false}).sort({time_log_in: -1}));
    }
}