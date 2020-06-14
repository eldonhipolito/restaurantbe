const express = require('express');
const UserService = require('./user.service');




const router = express.Router();

router.post('/authenticate', authenticate);
router.get('/:username', getByUsername);
router.post('/register', register);
router.put('/:username', update);


module.exports = router;

function authenticate(req, res, next){
    UserService.authenticate(req.body).then(user => user ? res.json(user) : res.status(400).json({message : "Username or password incorrect"}))
    .catch(err => next(err));
}

function register(req, res, next){
    console.log(req.body);
    UserService.create(req.body).then(() => res.json({message : "User registered successfully"})).catch(err => next(err));
}

function getByUsername(req, res, next){
    UserService.getByUsername(req.params.username).then(user => user ? res.json(user) : res.status(404).json({message : "User not found"})).catch(err => next(err));
}

function update(req, res, next) {
    UserService.update(req.body).then(() => res.json({message : "User updated successfully"})).catch(err => next(err)); 
}

