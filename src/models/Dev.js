const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');


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
        type: Array,
        required: true
    },
    location:{
        type: PointSchema,
        index: '2dsphere'
    }

});

const Dev = mongoose.model('Dev', DevSchema);

module.exports = Dev; 