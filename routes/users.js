var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var User_Schema = require('../model/users');
var Listing_Schema = require('../model/listing');
var async = require('async');

/* GET users login page. */
router.get('/login', function (req, res, next) {
    res.render('users-login', { title: 'Users | Puppies World' });
});
router.get('/register', function (req, res, next) {
    res.render('users-register', { title: 'Users | Puppies World' });
});

router.get('/dashboard', function (req, res) {
    //console.log(req.session);
    var Uemail = req.session.user_email;
    if (Uemail) {
        //console.log(Uemail);
        var UsersModel = mongoose.model('Users', User_Schema.Users);
        var ListingModel = mongoose.model('Listing', Listing_Schema.Listing);

        var userQuery = UsersModel.findOne({ 'email': Uemail });
        var listingQuery = ListingModel.find({ 'email': Uemail });

        var resources = {
            User: userQuery.exec.bind(userQuery),
            Listing: listingQuery.exec.bind(listingQuery)
        };

        async.parallel(resources, function (error, results) {
            if (error) {
                console.log('Error Fetching Data' + error);
                return;
            }
            //res.json(results.User.email);

            res.render('users-dashboard', { title: 'Dashboard | Puppies World', data: results });
        });
    } else {
        res.redirect('/users/login');
    }
});
router.post('/processLogin', function (req, res, next) {
    //res.send('processing Login Data');
    //  console.log(req.body.username);
    //  console.log(req.body.password);    
    var dta;
    var UsersModel = mongoose.model('Users', User_Schema.Users);
    var qry = UsersModel.findOne({ 'username': req.body.username, 'password': req.body.password });
    qry.exec(function (err, UserD) {
        console.log(UserD);
        if (err) console.log(err);

        if (UserD.email != '') {
            req.session.user_email = UserD.email;
            req.session.user_id = UserD._id;
            dta = UserD;
            res.redirect('/users/dashboard');
        } else {
            res.redirect('/users/login');
        }
    });



    // 


});

router.post('/processRegister', function (req, res, next) {
    //res.send('Under Development');



    var UsersModel = mongoose.model('Users', User_Schema.Users);
    var userN = new UsersModel({
        'username': req.body.username,
        'email': req.body.email,
        'password': req.body.password,
        'fname': req.body.fname,
        'lname': req.body.lname
    });
    userN.save(function (err) {
        if (err) return res.status(500).render('users-register', err);

        /************** Send Email  */
        nodemailer.createTestAccount((err, account) => {

            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'webmaster980s@gmail.com',
                    pass: 'option123@'
                }
            });


            let mailOptions = {
                from: '"webmaster" <webmaster980s@gmail.com>',
                to: 'chandanp619@gmail.com',
                subject: 'Registration Successfull',
                //text: 'Hello world?', // plain text body
                html: '<p><b>' + req.body.username + '</b> has just registered in the Pets World.</p>'
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        });



        /********************************* */
        return res.status(200).render('users-register', userN);
    });
});
router.get('/logout', function (req, res) {
    //    req.session.values(mysess);
    //    var index = mysess.indexOf('user');
    //    req.session.user.splice(index,1);
    console.log(req.session);
    delete (req.session.user_id);
    delete (req.session.user_email);
    console.log(req.session);
    res.redirect('/');
});

router.post('/updateProfile', function (req, res, next) {
    //res.send('Under Development');



    var UsersModel = mongoose.model('Users', User_Schema.Users);
    //  var userN = new UsersModel({
    //      'username':req.body.username,
    //      'email':req.body.email,
    //      'password':req.body.password,
    //      'fname':req.body.fname,
    //      'lname':req.body.lname
    //  });
    //  userN.save(function(err){
    //    if (err) return res.status(500).render('users-register', err);
    //    return res.status(200).render('users-register', userN); 
    //  });
    var options = { multi: false };

    var d = UsersModel.update({ 'email': req.body.email }, {
        'username': req.body.username,
        'password': req.body.password,
        'fname': req.body.fname,
        'lname': req.body.lname
    }, options, function (err) {
        console.log(d);
        if (err) return res.status(500).render('users-dashboard', err);
    });


    /*
    var status = UsersModel.findByIdAndUpdate(req.body._id,{$set:{
      'username':req.body.username,
      'email':req.body.email,
      'password':req.body.password,
      'fname':req.body.fname,
      'lname':req.body.lname
  }},function(err,data){
    console.log(data);
    if (err) return res.status(500).render('users-dashboard', err);    
    });
    */

    res.redirect('/users/dashboard');

});

module.exports = router;
