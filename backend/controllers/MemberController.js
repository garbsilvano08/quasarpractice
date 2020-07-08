const AccountClass      = require('../classess/AccountClass');
const multer            = require('multer');
const path              = require('path');
const MDB_RAW_VISITOR   = require('../models/MDB_RAW_VISITOR');
const MDB_RAW_PASS_LOG  = require('../models/MDB_RAW_PASS_LOG');
const MDB_STAFF         = require('../models/MDB_STAFF');
const MDB_USER         = require('../models/MDB_USER');
const MDB_BLACKLIST     = require('../models/MDB_BLACKLIST');
const MDB_COMPANIES     = require('../models/MDB_COMPANIES');
const MDB_DEVICE        = require('../models/MDB_DEVICE');
const Client            = require("@googlemaps/google-maps-services-js").Client;
const client            = new Client({});
const axios             = require('axios');
const bcrypt            = require('bcrypt');
const saltRounds        = 10;

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
    async userList(req, res)
    {
        res.send("user_list");
    },
    async addPerson(req, res)
    { 
        upload(req, res, async (err) =>
        {
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
    },
    async getNearbyPlaces(req, res)
    {
        let locations = null;

        try
        {
            locations = await client.placeQueryAutocomplete(
            {
                params: 
                { 
                    input: req.body.location, 
                    key: "AIzaSyCgcEQ_l0HwTMhh68eDDqQfiWUSijYqJBc"
                }
            })
        }
        catch(e)
        {
            throw new Error(e.message);
        }
            
        if (locations.data.hasOwnProperty("error_message")) res.status(400).send(locations.data.error_message);
        
        return res.send(locations.data.predictions);
    },
    async getCoordinates(req, res)
    {
        let geocode = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=${ req.body.place_id }&key=AIzaSyCgcEQ_l0HwTMhh68eDDqQfiWUSijYqJBc`);
        if (!geocode.data.result) res.status(400).send("Location doesn't exist.");

        return res.send(
        { 
            lat: geocode.data.result.geometry.location.lat,
            lon: geocode.data.result.geometry.location.lng
        });
    },
    async getVisitors(req, res)
    {
        return res.send(await new MDB_RAW_VISITOR().docs());
    },
    async addCompany(req, res)
    {
        
        req.body.subcompanies = [];
        // console.log(req.body.company_info)
        let companies = await new MDB_COMPANIES().docs();
        let parentCompany= {};
        // console.log(companies);
        let createdCompany = await new MDB_COMPANIES().add(req.body);

        if (req.body.parent_id == "No Parent")
        {


        }
        else
        {
            companies.forEach((com) => {
                if (com._id == req.body.parent_id)
                {
                    parentCompany=com;
                    parentCompany.subcompanies.push(createdCompany._id);
                }
            })
            await new MDB_COMPANIES().update( parentCompany._id, parentCompany);

        }
        
    
            return res.send(true);
    },

    async addNewStaff(req, res)
    {
        try
        {
            await new MDB_STAFF().add(
            {
                id_type: req.body.id_type,
                company_details: req.body.company_details,
                account_img: req.body.account_img,
                id_img: req.body.id_img,
                id_num: req.body.id_num,
                last_name: req.body.last_name,
                middle_name: req.body.middle_name,
                given_name: req.body.given_name,
                gender: req.body.gender,
                birthday: new Date(req.body.birthday),
                nationality: req.body.nationality,
                home_address: req.body.home_address,
                contact_number: req.body.contact_number,
                emergency_contact: req.body.emergency_contact,
                company_name: req.body.company_name,
                position: req.body.position,
                date_created: new Date(),
                is_active: true
            });
    
            return res.send(true);
        }
        catch(e)
        {

        }
    },

    async addNewBlacklist(req, res)
    {
        await new MDB_BLACKLIST().add(
        {
            account_img: req.body.account_img,
            last_name: req.body.last_name,
            middle_name: req.body.middle_name,
            given_name: req.body.given_name,
            gender: req.body.gender,
            birthday: new Date(req.body.birthday),
            nationality: req.body.nationality,
            home_address: req.body.home_address,
            contact_number: req.body.contact_number,
            emergency_contact: req.body.emergency_contact,
            company_name: req.body.company_name,
            reason_blacklist: req.body.reason_blacklist,
            date_blacklisted: new Date(),
            is_active: true
        });

        return res.send(true);
    },
    async getCompanies(req, res)
    {
        return res.send(await new MDB_COMPANIES().docs());
    },
    async deleteCompany(req, res)
    {
        await new MDB_COMPANIES().delete(req.body.id);
    },
    async getStaffs(req, res)
    {
        return res.send(await new MDB_STAFF().docs({is_active: true}));
    },

    async getBlacklists(req, res)
    {
        return res.send(await new MDB_BLACKLIST().docs({is_active: true}));
    },
    
    async removeAccount(req, res)
    {
        if (req.body.type == 'Staff') return res.send(await new MDB_STAFF().update(req.body.id, {is_active: false}));
        else if (req.body.type == 'Blacklist') return res.send(await new MDB_BLACKLIST().update(req.body.id, {is_active: false}));
    },
    
    async getCompany(req, res)
    {
        return res.send(await new MDB_COMPANIES().docs({'company_info.company_name': req.body.name}));
    },   

    async updateStaff(req, res)
    {
        return res.send(await new MDB_STAFF().update(req.body.id, req.body.update_staff));
    },    
    async updateVisitor(req, res)
    {
        return res.send(await new MDB_RAW_VISITOR().update(req.body.id, req.body.update_visitor));
    },  
    async updateBlacklist(req, res)
    {
        return res.send(await new MDB_BLACKLIST().update(req.body.id, req.body.update_blacklist));
    },  
    async addDevice(req, res)
    {
        await new MDB_DEVICE().add(req.body.device_info)
        return res.send(true);
    },

    async getDevices(req, res)
    {
        return res.send(await new MDB_DEVICE().docs(req.body.find_device));
    }, 
    async deleteDevices(req, res)
    {
        return res.send(await new MDB_DEVICE().delete(req.body.id));
    }, 
    async editCompany(req, res)
    {
        console.log(req.body);
        // let updateDet = { _id:  ,company_info : req.body};
        await new MDB_COMPANIES().update( req.body._id, req.body);
        res.send(true);

    },
    async addUser(req, res)
    {
        bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
            req.body.date_created = new Date();
            req.body.password = hash;
            await new MDB_USER().add(req.body)
            res.send(true);
        });
        
    },
    async getUsers(req, res)
    {
        return res.send(await new MDB_USER().docs());
    },
    async deleteUsers(req, res)
    {
        await new MDB_USER().delete(req.body._id);
        res.send(true);
    },
    async updateUser(res, req)
    {

    }
}