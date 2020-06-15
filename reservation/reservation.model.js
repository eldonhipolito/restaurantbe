const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const schema = new Schema({
    customerName : {type : String, required : true},
    contactDetails : {type : String, required : true},
   customers : {type : Number, required : true},
   reservationDate : {type : Date, required : true},
   orderDetails : {
    itemID : {type: Schema.Types.ObjectId, required : true, ref : 'Item'},
    qty : {type:Number, required : true},
    specialRequest : {type : String}
   },
   creationDate : {type : Date, default : Date.now}
});


module.exports = mongoose.model('Reservation', schema);