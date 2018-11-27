var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Cart = new Schema({
    item_id:ObjectId,
    item_name:String,
    item_image:String,
    item_quantity:String,
    item_rate:String,
    dateAdded:Date,
    user:ObjectId
});
var CartModel = mongoose.model('Cart',Cart);  
return {'Cart':Cart};
