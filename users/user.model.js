const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const schema = new Schema({
    username: {type : String, unique : true, required : true},
    passwordHash: {type : String, required : true},
    firstName: {type : String, required : true},
    lastName: {type : String, required : true},
    email : {type: String, required : false},
    role : {type : String, enum : ['customer', 'admin', 'server'], default : 'user'},
    creationDate: {type : Date, default : Date.now},
});


schema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret) {
        delete ret._id;
        delete ret.passwordHash;
    }
});

module.exports = mongoose.model('User', schema);