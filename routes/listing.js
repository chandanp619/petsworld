var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var ListingSchema = require('../model/listing');
var Category_Schemas = require('../model/category'); 

/* GET home page. */
router.get('/addNew',function(req,res){

  var CategoryModel = mongoose.model('Category',Category_Schemas.Category);  
    CategoryModel.find({},function(err,data){
        if(err) return res.render('error');
        console.log(data);
        
        //return res.render('categories', { title: 'Categories Archive' ,category:data});
        //console.log(data);
        res.render('listing-add-new', { title: 'Add New Listing',category:data });
    });

  
});

router.post('/processNewListing',function(req,res){
  
 //console.log(req.session);
 var ListingModel = mongoose.model('Listing',ListingSchema.listing);
 var dt = new Date();
 var NewListing = new ListingModel({
    email:req.session.user,
    title:req.body.title,
    name:title_to_name(req.body.title),
    description:req.body.description,
    add_date:dt.toISOString(),
    image:req.body.image,
    category: req.body.category,
    status:'publish'
 });

 NewListing.save(function(err,success){
    if (err) return res.status(500).render('listing-add-new', err);
    return res.status(200).render('users-dashboard', NewListing);
 });

 function title_to_name(Text)
 {
     return Text
         .toLowerCase()
         .replace(/[^\w ]+/g,'')
         .replace(/ +/g,'-')
         ;
 }



});


module.exports = router;
