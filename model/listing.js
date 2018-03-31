var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Listing = new Schema({
    email:String,
    title:String,
    name:String,
    description:{type : String , unique : true, required : true, dropDups: true},
    add_date:String,
    image:String,
    status:String
});
var ListingModel = mongoose.model('Listing',Listing);  
return {'Listing':Listing};
