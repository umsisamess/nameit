const express = require('express');
const socket = require('socket.io');
let rooms;
if(!rooms){
    rooms = [];
}

//app setup
const app = express();
const server = app.listen(3000,()=>{
    console.log('listening to requests on port 3000');
});

//socket setup
const io = socket(server);

io.on('connection',(socket)=>{
    console.log('connection made with socket ', socket.id);

    socket.on('roommade',(data)=>{
        rooms.push(data);
        console.log(rooms);
    })

    socket.on('canIJoin',(data)=>{
        for(let room of rooms){
            if(room.id===data.roomId){
                console.log('you can');
                room.members.push(data.user);
                console.log(room);
                io.sockets.emit('youCanJoin', room);
                break;
            }
        }
    })

    socket.on('iJoined',(data)=>{
        io.sockets.emit('someoneJoined',data);
    })
})

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.redirect('/index');
})

app.get('/index',(req,res)=>{
    res.render('index');
})

app.get('/room',(req,res)=>{
    res.render('room');
})

app.get('/lobby/:id',(req,res)=>{
    const id = req.params.id;
    for(let room of rooms){
        if(room.id===id){
            res.render('lobby',room);
        }
    }
})

app.get('/joinroom',(req,res)=>{
    res.render('joinroom');
})


