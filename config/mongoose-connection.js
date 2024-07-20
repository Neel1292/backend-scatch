const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/stash`)
.then(function(){
    debug('Connected');
})
.catch(function(err){
    console.log(err);
});

module.exports = mongoose.connection;