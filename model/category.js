var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Category = new Schema({
    name:{type : String , unique : true, required : true, dropDups: true},
    title:String,
    image:String
});
var CategoryModel = mongoose.model('Category',Category);  
return {'Category':Category};
