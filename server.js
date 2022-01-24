const express = require('express');
const bodyParser = require('body-parser');

const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http);

const PORT = 3000 
const messages = []

app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

io.on('connection', ()=>{
    console.log('user has connected');
})


const server = http.listen(PORT, ()=>{
    const { port } = server.address();
    console.log('listening on port '+String(PORT));
})

app.get('/messages', (req,res)=>{
    res.send(messages);
})

app.post('/message',(req,res)=>{
    messages.push(req.body)
    io.emit('message', req.body)
    console.log(req.body);
    res.sendStatus(200)
})