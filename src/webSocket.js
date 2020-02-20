const socketio = require("socket.io");
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");

let io;
//Poderia ser uma tabela do mongoDB
const connections = [];


exports.setupWebSocket = (server) => {
    io = socketio(server);   

    io.on("connection", socket => {
        
        const {latitude, longitude, techs} = socket.handshake.query;
        
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude), 
                longitude: Number(longitude),
            },
            techs:parseStringAsArray(techs ), 
        });

    })

};

exports.findConnection = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connections.coordinates) < 10
        && connections.techs.some(item => techs.include(item))
    })
} 

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    })
};