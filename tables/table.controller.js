const express = require('express');
const TableService = require('./table.service');

const router = express.Router();

router.post('/create', create);
router.get('/', list);
router.put('/:id', update);
router.delete('/:id', deleteItem);


module.exports = router;

function create(req, res, next){
    TableService.create(req.body).then(() => res.json({message : "Table created successfully"}))
    .catch(err => next(err));
}

function update(req, res, next) {
    TableService.update(req.body).then(() => res.json({message : "Table updated successfully"})).catch(err => next(err)); 
}

function list(req, res, next) {
    TableService.getAll().then(items => items ? res.json(items) : res.status(404).json({message : "Tables not found"})).catch(err => next(err));
}


