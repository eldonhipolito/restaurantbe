const config = require('../config.json');
const db = require('../_handlers/db');

const Item = db.Item;

module.exports = {
    create,
    update,
    getAll,
    getById,
    getByName,
    deleteItem
};


async function create(_item) {
    if(await Item.findOne({name : _item.name})) {
        throw `Item  ${_item.name} already exists`;
    }

    const item = new Item(_item);


    item.imagePath = config.storagePath + "/" + item.name;
    //TODO some call to store item
    if(_item.file) {
        
    }

    item.save();
}


async function update(id, _item) {
    const item = await Item.findById(id);
    if(!item) {
        throw `Item with ID : ${id} not found`;
    }

    if (item.name !== _item.name && await Item.findOne({ name: _item.name })) {
        throw 'Item "' + _item.name + '" is already defined';
    }

    
    if(_item.file) {
    //TODO replace image if exists
    }

    delete _item.creationDate;

    Object.assign(item, _item);

    item.save();

}

async function getAll(){
 return   await Item.find({});
}

async function getById(id) {
    return await Item.findById(id);
}

async function getByName(name){
    return await Item.findOne({name : name});
}

async function deleteItem(id){
    return await Item.findByIdAndDelete(id);
}