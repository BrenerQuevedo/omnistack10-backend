const axios = require('axios');
const Dev = require('../models/Dev');
const parseString = require('../utils/parseStringAsArray'); 
const { findConnection, sendMessage} = require("../webSocket")

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
                coordinates: [longitude, latitude],
            };
        
            const techsArray = parseString(techs);
        
            //constante
            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location
            });
        
            const sendSocketMessageTo = findConnection(
                {latitude, longitude},
                techsArray,
                )
        
                sendMessage(sendSocketMessageTo, "new-dev", dev)
        }

        return res.json(dev);
    },
    
    async index(req, res) {
        const devs = await Dev.find();
        return res.json(devs);
    },


    //atualiza um dev, exceto seu github_username
    async update(req, res){
        const {id} = req.params;
        const data = req.body;

        if(data.techs){
            data.techs = parseString(data.techs);
        }

        //deleta o campo de username impossibilitando a mudança do mesmo
        if(data.github_username) {
            delete data.github_username;
        }

        const dev = await Dev.findByIdAndUpdate(id, data, {new:true});

        return res.json(dev);
    },
    
    //deleta um dev
    async destroy(req, res){
        const {id} = req.params;
        
        await Dev.findByIdAndDelete(id);

        return res.json({message: "user removed"});
    }


};

