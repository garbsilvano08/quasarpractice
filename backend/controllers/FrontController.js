const AccountClass = require('../classess/AccountClass');

module.exports =
{
    async login(req, res)
    {  
        let email       = req.body.email;
        let password    = req.body.password;
        let response    = await new AccountClass().authenticate(email, password);

        if(response)
        {
            res.json(response).status(200);
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

        console.log(response);
        
        setTimeout(async () => { res.send(true); }, 1000);
    },
    async register(req, res)
    {
        res.send("registration");
    }
}