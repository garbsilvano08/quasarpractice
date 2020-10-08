const AccountClass  = require('../classess/AccountClass');
const jwt           = require('jsonwebtoken');
const bcrypt        = require('bcryptjs');
const dotenv        = require('dotenv').config();
const MBD_USER_LOGS = require('../models//MDB_USER_LOGS');

module.exports =
{
    async login(req, res)
    {  
        let email       = req.body.email;
        let password    = req.body.password;
        let response    = await new AccountClass().authenticate(email, password);
        let token_mixer = process.env.TOKEN_MIXER;
        let data = {}
        if(response.status == "success")
        {
            response.data.token = jwt.sign(response.data, token_mixer ? token_mixer : 'water123');
            delete response.data.password;

            res.json(response.data).status(200);
            data = {
                full_name:      response.data.full_name,
                email:          response.data.email,
                username:       response.data.username,
                user_type:      response.data.user_type,
                company:        response.data.company,
                company_id:     response.data.company_id,
                user_picture:   response.data.user_picture,
                date_created:   response.data.date_created,
                device:         response.data.device,
                __v:            response.data.__v,
                is_active:      true,
                time_log_in:    new Date(),
                // time_log_out:   ''
            }
            await new MBD_USER_LOGS().add(data)
        }
        else
        {
            res.status(400).send({ message: `The account you entered doesn't exist.`});
        }
    },
    async createAdmin(req, res)
    {
        let account_information =
        {
            full_name: 'Guillermo Tabligan',
            email: 'guillermotabligan@gmail.com',
            username: 'jr',
            password: 'water123',
            user_type:     'Super Admin',
            user_picture:  'none',
            company:        {},
            date_created:    new Date(),
        };

        let response = await new AccountClass().create(account_information);
        
        setTimeout(async () => { res.send(true); }, 1000);
    },
    async register(req, res)
    {
        res.send("registration");
    },
}