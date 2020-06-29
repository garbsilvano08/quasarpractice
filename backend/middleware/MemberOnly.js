const jwt           = require('jsonwebtoken');

module.exports = (req, res, next) =>
{
    let token       = req.headers.authorization;
    let token_mixer = process.env.TOKEN_MIXER;

    jwt.verify(token, token_mixer ? token_mixer : 'water123', function(err, decoded)
    {
        if (err)
        {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        } 
        else
        {
            next();
        }
    });
}