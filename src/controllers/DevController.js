const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const {github_username, techs, latitude, longitude} = req.body;
    
        //já faço a verificação no próprio schema
        let dev = await Dev.findOne({github_username});

        if(!dev) {
                
            const apiRes = await axios.get(`http://api.github.com/users/${github_username}`);
        
            //caso o nome não exista (n é obrigatório), o login é atribuído a ele "name = login"
            const {name = login, avatar_url, bio} = apiRes.data;
        
            const location = {
                type: 'Point',
                coordinates: [latitude, longitude],
            };
        
            const techsArray = techs.split(",").map(tech => tech.trim());
        
            //constante
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        }

        return res.json(dev);
    }     
};
