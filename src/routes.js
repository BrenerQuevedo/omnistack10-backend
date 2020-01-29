const {Router} = require("express");
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post("/devs", async (req, res) => {
    const {github_username, techs} = req.body;

    const apiRes = await axios.get(`http://api.github.com/users/${github_username}`);

    //caso o nome não exista (n é obrigatório), o login é atribuído a ele "name = login"
    const {name = login, avatar_url, bio} = apiRes.data;

    const techsArray = techs.split(",").map(tech => tech.trim());

    const dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        techs: techsArray
    });


    return res.json(dev);


});


module.exports = routes;