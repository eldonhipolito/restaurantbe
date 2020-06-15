const db = require('../_handlers/db');

const Table = db.Table;

module.exports = {
    create,
    update,
    getAll,
    getById,
};


async function create(_table) {
    if(await Table.findOne({code : _table.code})) {
        throw `Table  ${_table.code} already exists`;
    }

    const table = new Table(_table);

    table.save();
}


async function update(id, _table) {
    const table = await Table.findById(id);
    if(!table) {
        throw `Table with ID : ${id} not found`;
    }

    if (table.code !== table.code && await Table.findOne({ code: _table.code })) {
        throw `Table ${_table.code} is already defined`;
    }



    Object.assign(table, _table);

    table.save();

}

async function getAll(){
 return   await Table.find({});
}

async function getById(id) {
    return await Table.findById(id);
}