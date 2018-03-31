var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var async = require('async');
const Schema = mongoose.Schema;
var Category_Schemas = require('../model/category'); 
var Listing_Schemas = require('../model/listing'); 
/* GET home page. */
router.get('/', function(req, res, next) {  
var CategoryModel = mongoose.model('Category',Category_Schemas.Category);  
    CategoryModel.find({},function(err,data){
        if(err) return res.render('error');
        console.log(data);
        
        return res.render('categories', { title: 'Categories Archive' ,category:data});
    });
  
});

router.get('/:catname', function(req, res, next) {
    var catdata = {};
    var Items = {};
    var catname = req.params.catname;
      
    var CategoryModel = mongoose.model('Category',Category_Schemas.Category);  
    
    CategoryModel.find({'name':catname},function(err,catdata){
        if(err) return res.render('error');
        var ListingModel = mongoose.model('Listing',Listing_Schemas.Listing);  
        var listingQuery = ListingModel.find({category:catname});
        
        var resources = {
        Listing: listingQuery.exec.bind(listingQuery)
        };

        async.parallel(resources, function (error, results2) {
        console.log(results2.Listing);
        return res.render('single-category', { title: 'Single Category' ,category:catdata[0], catItems:results2.Listing});
        //return res.render('categories', { title: 'Categories Archive' ,category:data});
        });
    
    
    
    });
    
});


module.exports = router;
