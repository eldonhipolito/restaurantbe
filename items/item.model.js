const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const schema = new Schema({
    name: {type : String, required : true, unique : true},
    description:{type: String, required : true},
    price: {type : Schema.Types.Number, required : true},
    available: {type:Boolean, default: true},
    imageName : {type:String, required:false},
    creationDate: {type : Date, default : Date.now},
});


schema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret) {
        delete ret._id;
        delete ret.imageName;

    }
});

module.exports = mongoose.model('Item', schema);