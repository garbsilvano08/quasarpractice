const MDB_USER = require('../models/MDB_USER');

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
        let res             = {};
        let check_account   = await this.mdb_user.findByEmailPassword(email, password);

        if(check_account)
        {
            res.status = "success";
            res.data = check_account;
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
        let res = {};

        let check_email = await this.mdb_user.findByEmail(account_information.email);

        if(check_email)
        {
            res.message = "The e-mail that you provided already exist.";
            res.status = "error";
        }
        else
        {
            let add_user_respose = await this.mdb_user.add(account_information);
            res.data = add_user_respose;
            res.status = "success";
        }

        return res;
    }
    async addingPersonOnTablet(data){
        
        


        
    }
}