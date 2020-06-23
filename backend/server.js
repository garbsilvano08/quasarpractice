const express       = require('express');
const app           = express();
const cors          = require('cors')

const registerUser      = require('./controllers/AccountController/registerUser');
const getUsers          = require('./controllers/AccountController/getUsers');
const updateUser        = require('./controllers/AccountController/UpdateUser');
const loginUser 	 	= require('./controllers/AccountController/loginUser');
const registerWallet    = require('./controllers/WalletController/registerWallet');

app.use(cors());

app.use('/api/account/register', registerUser);
app.use('/api/account/update', updateUser);
app.use('/api/account/login', loginUser);

app.use('/api/account/users', getUsers);
app.use('/api/wallet/register', registerWallet);

app.listen({port: 4001}, (err) => {
    if(err) {
        console.log(err);
        process.exit(1);
    }else {
        console.log('Server is up and running on port 4001...');
    }
});