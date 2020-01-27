const express =  require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-sm6zk.mongodb.net/test?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    return res.send({'message': 'hello mundo'})
});


app.listen(3333);