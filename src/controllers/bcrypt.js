const bcrypt = require('bcrypt');
const SALT = 12;

const createHash = (password) => {
    return bcrypt.hashSync(password, SALT);
}

const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}
module.exports = { createHash, compareHash }