const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
    name :{
        type: String,        
    },
    github_username: {
        type: String,
        required: true,
        unique : true, 
        dropDups: true  
    },
    bio : {
        type: String,
    },
    avatar_url:{
        type: String,
    },
    techs:{
        type: Array
    }

});

const Dev = mongoose.model('Dev', DevSchema);

module.exports = Dev; 