const AccountClass  = require('../classess/AccountClass');

module.exports =
{
    async userList(req, res)
    {
        res.send("user_list");
    },
    async addPerson(req, res)
    {
        console.log(JSON.stringify(req.headers));
        const form = new formidable.IncomingForm();
        // Parse `req` and upload all associated files
        form.parse(req, function(err, fields, files) {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          const [firstFileName] = Object.keys(files);
      
          res.json({ filename: firstFileName });
        });
        
    }
}