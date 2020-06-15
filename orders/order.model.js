const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const schema = new Schema({
   occupants : {type : Number, required : true},
   server:{type: String},
   orderDetails : [
       {
        itemID : {type : Schema.Types.ObjectId, required : true, ref: 'Item'},
        quantity : {type : Number, required : true},
        details : {type : String}
       }
   ],
   reservationID : {type : Schema.Types.ObjectId, required : false, ref : 'Reservation'},
   settled : {type : Boolean, default : false},
   pickup : {type : Boolean, default : false},
    orderDate: {type : Date, default : Date.now},
});


module.exports = mongoose.model('Order', schema);