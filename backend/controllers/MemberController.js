const AccountClass  = require('../classess/AccountClass');
const multer        = require('multer');
const path          = require('path');
const MDB_RAW_VISITOR = require('../models/MDB_RAW_VISITOR');
const MDB_RAW_PASS_LOG = require('../models/MDB_RAW_PASS_LOG');

const storage = multer.diskStorage({
  destination: './uploads/images/',
  filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() +
      path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function(req, file, cb) {
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
    async userList(req, res)
    {
        res.send("user_list");
    },
    async addPerson(req, res)
    { 
      upload(req, res, async (err) => {
        if (err) {
            return res.send({
                status: 'error',
                message: err.message
            });
        } else {
            if (req.file === undefined) {
                return res.send({
                    status: 'error',
                    message: 'Error: No File Selected!'
                });
            } else {
                return res.send(req.file);
            }
        }
    })
        // let response = await new AccountClass().addingPerson();
    },
    async addVisitor(req, res)
    {
        await new MDB_RAW_VISITOR().add(
        {
            personal_information: req.body.personal_information,
            visitor_purpose: req.body.visitor_purpose,
            name: req.body.personal_information.first_name + " " + req.body.personal_information.middle_name + " " + req.body.personal_information.last_name
        });

        return res.send(true);
    },
    async addPassLog(req, res)
    {
        await new MDB_RAW_PASS_LOG().add(
        {
            data: req.body.data
        });

        return res.send(true);
    }
}