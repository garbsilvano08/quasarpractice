const MDB_USER = require('../models/MDB_USER');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const bcrypt            = require('bcrypt');
const saltRounds        = 10;

module.exports = class AccountClass
{
    constructor()
    {
        this.mdb_user = new MDB_USER();
    }

    /**
     * authenticate account for login
     * 
     * @param {string} email        email input by user
     * @param {string} password     password input by user
     * 
     * @return {string}             returns token 
     *                              if return is null, it means the account doesn't exist)
     */
    async authenticate(email, password)
    {
        console.log(email, password);
        let res             = {};
        let check_account   = await this.mdb_user.findByEmail(email);

        if(check_account)
        {
            let check_password = await bcrypt.compare(password, check_account.password);

            if(check_password)
            {
                res.status = "success";
                res.data = check_account;
            }
            else 
            {
                res.status = "error";
                res.message = "The account you are trying to find doesn't exist.";  
            }
        }
        else
        {
            res.status = "error";
            res.message = "The account you are trying to find doesn't exist.";
        }

        return res;
    }

    /**
     * authenticate account for login
     * 
     * @param {object} account_information
     * @param {string} account_information.full_name    full name of the user
     * @param {string} account_information.email        email of the user
     * @param {string} account_information.password     password of the user
     * 
     * @return {object}                                 returns .status "error" if fail 
     *                                                  returns .status "success" if success     
     *                                                  returns .data (object) if successful                
     *                                                  returns .message if error
     */
    async create(account_information)
    {
        bcrypt.hash(account_information.password, saltRounds,async function(err, hash) {
        account_information.date_created = new Date();
        account_information.password = hash;
        // await new MDB_USER().add(req.body)
        // res.send(true);
        
        let res = {};

        let check_email = await new MDB_USER().findByEmail(account_information.email);

        if(check_email)
        {
            res.message = "The e-mail that you provided already exist.";
            res.status = "error";
        }
        else
        {
            let add_user_respose = await new MDB_USER().add(account_information);
            res.data = add_user_respose;
            res.status = "success";
        }

        return res;
        });
    }
    async addingPerson(data){
        
        // console.log("wew");  
    }
}