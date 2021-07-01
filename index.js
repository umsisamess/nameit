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
                let flag = 0;
                for(let member of room.members){
                    console.log(member);
                    console.log(data.user);
                    if(member===data.user){
                        flag = 1;
                    }
                }
                if(flag===0){
                    room.members.push(data.user);
                    console.log(room);
                    io.to(data.sid).emit('youCanJoin', room);
                    break;
                }else{
                    io.to(data.sid).emit('youCantJoin', room);
                    break;
                }
                
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

app.get('/joinroom',(req,res)=>{
    res.render('joinroom');
})


app.get('/lobby/:id',(req,res)=>{
    const id = req.params.id;
    for(let room of rooms){
        if(room.id===id){
            res.render('lobby',room);
        }
    }
})

app.get('/selectdomain',(req,res)=>{
    res.render('selectdomain');
})



