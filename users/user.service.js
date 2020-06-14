const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_handlers/db');

const User = db.User;

module.exports = {
    authenticate,
    getByUsername,
    create,
    update,
    getById,
};



async function authenticate({username, password}) {
    const user = await User.findOne({username});

    if(user && bcrypt.compareSync(password, user.passwordHash)){
        const token = jwt.sign({sub : user.id}, config.secret);

        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getByUsername(username) {
    return await User.findOne({username});
}

async function getById(id) {
    return await User.findById(id);
}

async function create(_user){
    if(await User.findOne({username : _user.username})) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(_user);

    if(!_user.password) {
        console.log(_user.password);
        throw "Password is empty";
    }

    user.passwordHash = bcrypt.hashSync(_user.password, 10);

    await user.save();
}



async function update(_user) {

    const user = User.findOne(_user.username);

    if(!user) throw "User not found";

     // hash password if it was entered
     if (_user.password) {
        _user.passwordHash = bcrypt.hashSync(userParam.password, 10);
    }

    delete _user.creationDate;

    Object.assign(user, _user);

    await user.save();
}

