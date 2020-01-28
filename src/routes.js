const {Router} = require("express");
const axios = require('axios');


const routes = Router();

routes.post("/devs", async (req, res) => {
    const {github_username} = req.body;

    const apiRes = await axios.get(`http://api.github.com/users/${github_username}`);

    console.log(apiRes.data);

    return res.json({message: 'hello brener'});


});


module.exports = routes;