var mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Users = new Schema({
    username:String,
    password:String,
    email:{type : String , unique : true, required : true, dropDups: true},
    fname:String,
    lname:String,
    dob:Date
});
var UsersModel = mongoose.model('Users',Users);  
return {'Users':Users};
