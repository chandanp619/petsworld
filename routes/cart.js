var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CartSchema = require('../model/cart');
var listingSchema = require('../model/listing');
/* GET home page. */
router.get('/', function(req, res, next) {

  var CartModel = mongoose.model('Cart',CartSchema.Cart,'cart');
  CartModel.find({'user':req.session.user_id},function(err,data){
    //{'user':req.session.user_id}
    console.log(req.session.user_id);
    res.render('cart', { title: 'User Cart',cart:data });
  });
  
});

router.post('/add/:id', function(req, res, next) {
var quantity = req.body.quantity;
var ListingModel = mongoose.model('Listing',listingSchema.listing,'listings');
var CartModel = mongoose.model('Cart',CartSchema.Cart,'cart');
console.log(req.params.id);
ListingModel.findOne({'_id':req.params.id},function(err,dataListing){
  console.log(dataListing);
var dataNew = {
    item_id:dataListing._id,
    item_name:dataListing.title,
    item_image:dataListing.image,
    item_quantity:quantity,
    item_rate:dataListing.price,
    dateAdded:new Date(),
    user:mongoose.Types.ObjectId(req.session.user_id)
};
CartModel.create(dataNew,function(){
    console.log("Item added to Cart");
    res.redirect(req.headers.referer);
  });
});
});


router.get('/remove/:id', function(req, res, next) {
  
  var CartModel = mongoose.model('Cart',CartSchema.Cart,'cart');
  CartModel.deleteOne({'_id':req.params.id},function(err,cartD){
      console.log(cartD);
      res.redirect(req.headers.referer);

  });

});
module.exports = router;
