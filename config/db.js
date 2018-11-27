var mongoose = require('mongoose');
/* Database Intraction */
//mongoose.connect('mongodb://localhost:27017/nodeapp');
mongoose.connect('mongodb://dbacp:dboptions@clusternode-shard-00-00-brgfz.mongodb.net:27017,clusternode-shard-00-01-brgfz.mongodb.net:27017,clusternode-shard-00-02-brgfz.mongodb.net:27017/nodeapp?ssl=true&replicaSet=ClusterNode-shard-0&authSource=admin');
