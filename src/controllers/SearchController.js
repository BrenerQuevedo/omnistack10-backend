const Dev = require('../models/Dev');
const parseString = require('../utils/parseStringAsArray'); 



module.exports = {
    async index(req,res) {
        const {latitude, longitude, techs} = req.query;
        
        const techsArray = parseString(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type:  'Point',
                        coordinates: [longitude, latitude],
                    },
                $maxDistance: 10000, //10km
                },
            },
        });

    return res.json({devs})
    }    
}