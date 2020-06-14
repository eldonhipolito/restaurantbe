const express = require('express');
const ItemService = require('./item.service');

const router = express.Router();

router.post('/create', create);
router.get('/:name', getByName);
router.get('/', list)
router.put('/:id', update);
router.delete('/:id', deleteItem);


module.exports = router;

function create(req, res, next){
    ItemService.create(req.body).then(() => res.json({message : "Item created successfully"}))
    .catch(err => next(err));
}



function getByName(req, res, next){
    ItemService.getByName(req.params.name).then(item => item ? res.json(item) : res.status(404).json({message : "Item not found"})).catch(err => next(err));
}

function update(req, res, next) {
    ItemService.update(req.body).then(() => res.json({message : "Item updated successfully"})).catch(err => next(err)); 
}

function list(req, res, next) {
    ItemService.getAll().then(items => items ? res.json(items) : res.status(404).json({message : "Items not found"})).catch(err => next(err));
}

function deleteItem(req, res, next){
    ItemService.deleteItem(req.params.id).then(() => res.json({message: "Item removed successfully"})).catch(err => next(err));
}

