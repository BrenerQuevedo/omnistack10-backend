const mongoose = require('mongoose');

const DevSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,        
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

module.exports = mongoose.model('Dev', DevSchema)