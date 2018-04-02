# petsworld
====================== Test Nodejs Application ===================

Note: Please create a "config" folder in the root and a db.js inside "config" folder.
add the following lines in db.js

var mongoose = require('mongoose');

/* Database Intraction */

mongoose.connect('mongodb://localhost:27017/nodeapp');