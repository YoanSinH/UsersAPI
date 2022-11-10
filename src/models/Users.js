const { createHash } = require('../controllers/bcrypt');

class Users {
    constructor({code, name, email, password, document, role}) {
        this.code = code;
        this.name = name;
        this.email = email;
        this.password = password;
        this.document = document;
        this.role = role;
    }

    initUser() {
        const password = createHash(this.password); // Hash password
        return {
            code: this.code,
            name: this.name,
            email: this.email,
            document: this.document,
            role: this.role,
            password,
        }
    }

    static removePassword(users) {
        return users.map(user => {
            delete user.password;
            return user;
        })
    }
}

module.exports = Users;