const bcrypt = require('bcryptjs');
let salt = 10;

function hashing(password){
    return bcrypt.hashSync(password, salt)
};

module.exports = hashing;