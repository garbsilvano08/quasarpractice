const AccountClass  = require('../classess/AccountClass');
const jwt           = require('jsonwebtoken');
const bcrypt        = require('bcryptjs');
const dotenv        = require('dotenv').config();

module.exports =
{
    async login(req, res)
    {  
        let email       = req.body.email;
        let password    = req.body.password;
        let response    = await new AccountClass().authenticate(email, password);
        let token_mixer = process.env.TOKEN_MIXER;

        if(response.status == "success")
        {
            response.data.token = jwt.sign(response.data, token_mixer ? token_mixer : 'water123');
            delete response.data.password;

            res.json(response.data).status(200);
        }
        else
        {
            setTimeout(async () => { res.status(400).send({ message: `The account you entered doesn't exist.`}) }, 1000);
        }
    },
    async createAdmin(req, res)
    {
        let account_information =
        {
            full_name: 'Guillermo Tabligan',
            email: 'guillermotabligan@gmail.com',
            password: 'water123'
        };

        let response = await new AccountClass().create(account_information);
        
        setTimeout(async () => { res.send(true); }, 1000);
    },
    async register(req, res)
    {
        res.send("registration");
    }
}