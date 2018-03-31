var mongoose = require('mongoose'); 

//MongoDB schemas

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
 author: ObjectId,
 title: String,
 body: String,
 date: Date,
 meta_description:String,
 meta_keywords:String
});
module.exports = function(){
    return {'BlogPost':BlogPost};
    };