const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const MongoClient = require('mongodb').MongoClient;
const jwt = require('express-jwt');
const auth = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

const {LiveGames} = require('./utils/liveGames');
const {Players} = require('./utils/players');

const cors = require('cors');
const app = express();
const uri = "";
const server = http.createServer(app);
const io = socketIO(server);
const games = new LiveGames();
const players = new Players();
const secret = "figrnhiujguiydgfyueagfuyrag786erywavfg7ug vf67w4e 76tfr3g4 f67gf74wge6fgew7fg76w7wgf6w3gf763gf67gf76g6f74g74"

const client = new MongoClient(uri, { useNewUrlParser: true });
const dbName = 'quiz';
let db;
let users;
let quiz;

client.connect(() => {
    console.log('Connected to Cluster.');
    db = client.db(dbName);
    users = db.collection('users');
    quiz = db.collection('quiz');
});

app.use(jwt({
    secret: secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    }
}));


app.use(express.json());
app.use(cors());

app.post('/api/users/new', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    users.insertOne({email: email, password: password, name: name}, (err, result) => {
        const data = result.ops[0]._id;
        const token = auth.sign({id: data}, secret);
        res.send({token: token});
    });
});

app.post('/api/users/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    users.findOne({email: email}, (err, result) => {
        const data = result;
        if (result) {
            if (password == data.password) {
                const token = auth.sign({id: data._id}, secret);
                res.send({token: token, success: true});
            } else {
                res.send({success: false});
            };
        } else {
            res.send({success: false});
        };
    });
});

app.post('/api/quiz/new', (req, res) => {
    const quizData = req.body.quizData;
    if (req.user) {
        quiz.insertOne({quizData, owner: req.user.id}, (err, result) => {
            res.send({_id: result.ops[0]._id, quizData, owner: req.user.id});
        });
    } else {
        res.sendStatus(400);
    };
});

app.post('/api/quiz/delete', (req, res) => {
    const id = req.body.id;
    if (req.user) {
        quiz.findOne({_id: id}, (err, result) => {
            const data = result;
            if (result) {
                if (req.user.id == data.owner) {
                    quiz.deleteOne({_id: id});
                    res.send({success: true});
                } else {
                    res.send({success: false});
                };
            } else {
                res.send({success: false});
            };
        });
    } else {
        res.sendStatus(400);
    };
});

app.get('/api/quiz', (req, res) => {
    if (req.user) {
        quiz.find({owner: req.user.id}).toArray((err, result) => {
            res.send(result);
        });
    } else {
        res.sendStatus(400);
    };
});


server.listen(3002, () => {
    console.log("Server started on port 3000");
});

io.on('connection', (socket) => {
    socket.on('host-join', (data) => {
        const gameCode = Math.floor(Math.random()*90000) + 10000;
        quiz.findOne({_id: new ObjectId(data)}, (err, result) => {
            const gameData = result;
            games.addGame(gameCode, socket.id, true, gameData);

            const game = games.getGame(socket.id);
            socket.join(game.code);

            socket.emit('gameData', game);
        });
    });

    socket.on('startGame', () => {
        const game = games.getGame(socket.id);
        game.lobby = false;
        io.to(game.code).emit('gameStarted', game.gameData.quizData.questions);
    });

    socket.on('endGame', () => {
        const game = games.getGame(socket.id);
        io.to(game.code).emit('endGame');
    });

    socket.on('getScore', () => {
        const player = players.getPlayer(socket.id);
        socket.emit('newScore', player.gameData.score); 
    });

    socket.on('player-join-game', (data) => {
        const player = players.getPlayer(data.id);
        if (player) {
            const game = games.getGame(player.hostId);
            socket.join(game.code);
            player.playerId = socket.id;
            
            const playerData = players.getPlayers(game.hostId);
            socket.emit('playerGameData', playerData, game.questions);
        } else {
            socket.emit('noGameFound');
        };
    });

    socket.on('player-join', (params) => {
        let gameFound = false;
        
        for (let i = 0; i < games.games.length; i++) {
            if (params.code == games.games[i].code) {
                const hostId = games.games[i].hostId;
                
                
                players.addPlayer(hostId, socket.id, params.name, {score: 0});
                
                socket.join(params.code);
                
                const playersInGame = players.getPlayers(hostId);
                
                io.to(params.code).emit('updatePlayerLobby', playersInGame);
                gameFound = true;
            };
        };
    
        if (gameFound == false) {
            socket.emit('noGameFound');
        };
    });

    socket.on('updateScore', (data) => {
        players.getPlayer(socket.id).gameData.score = data;
        const player = players.getPlayer(socket.id);
        const game = games.getGame(player.hostId);
        const player_data = players.getPlayers(player.hostId);
        io.to(game.code).emit('updateScores', player_data);
    });
});
