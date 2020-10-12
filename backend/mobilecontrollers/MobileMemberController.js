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
const MDB_USER_LOGS     = require('../models/MDB_USER_LOGS');
const MDB_PERSON_LOGS   = require('../models/MDB_PERSON_LOGS');
const MDB_COMPANIES     = require('../models/MDB_COMPANIES');
const MDB_DEVICE        = require('../models/MDB_DEVICE');

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
    },
    async getLogsCount(req, res)
    {
        let count = {}
        count.count = await new MDB_PERSON_LOGS().collection.countDocuments(req.body.find_logs)
        res.send(count)
    },
    async getMobileFeverLogs(req, res)
    {
        if(req.body.find_logs) return res.send(await new MDB_PERSON_LOGS().collection.find(req.body.find_logs).sort({date_saved: -1}).limit(5));
        else return res.send(await new MDB_PERSON_LOGS().collection.find({has_fever : true}).sort({date_saved: -1}).limit(5));
    },
    async getMobileCompanies(req, res)
    {
        // return res.send(await new MDB_COMPANIES().doc(req.body.id));
        res.send(await new MDB_COMPANIES().docs());
    },
    async getMobileDevice(req, res)
    {
        // return res.send(await new MDB_COMPANIES().doc(req.body.id));
        return res.send(await new MDB_DEVICE().docs());
    }, 
}