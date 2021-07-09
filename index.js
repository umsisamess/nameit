const PORT = process.env.PORT||3000;
const express = require('express');
const socket = require('socket.io');

let rooms;
if(!rooms){
    rooms = [];
}

let domainValues;
if(!domainValues){
    domainValues = [];
}

let ranchar = 'A';

//app setup
const app = express();
const server = app.listen(PORT,()=>{
    console.log('listening to requests on port 3000');
});

//socket setup
const io = socket(server);

io.on('connection',(socket)=>{
    console.log('connection made with socket ', socket.id);

    socket.on('roommade',(room)=>{
        console.log(room.id);
        rooms.push(room);
        socket.join(room.id.toString());
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
                    // io.of(io).to(data.roomId).emit('success','success');
                    // io.to(data.roomId).emit('success','success');
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

    socket.on('domainSelectionCompleted',(data)=>{
        console.log(data.domains);
        for(let room of rooms){
            console.log(data.code);
            console.log(room.id);
            if(room.id===data.code){
                room.domains = data.domains;
                console.log(room);
                break;
            }
        }
        io.sockets.emit('goToPlay',data);
    })

    socket.on('domainSelect',(data)=>{
        io.sockets.emit('goToSelect',data);
    })

    socket.on('iNeedDomains',(data)=>{
        let charac = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // ranchar = charac.charAt(Math.floor(Math.random()*charac.length));
        for(let room of rooms){
            if(room.id===data.room.id){
                if(room.host===data.user){
                    ranchar = charac.charAt(Math.floor(Math.random()*charac.length));
                    let toBeSent = {
                        id : data.room.id,
                        domains : room.domains,
                        ranChar : ranchar,
                    }
                    io.sockets.emit('takeTheDomains',toBeSent);
                    break;
                } 
                
            }
        }
    })

    socket.on('iNeedHostData',(data)=>{
        io.sockets.emit('hostDataNeeded',data);
    })

    socket.on('takeIt',(data)=>{
        socket.emit('takeTheDomains',data);
    })

    socket.on('iSubmitted',(data)=>{
        domainValues = [];
        io.sockets.emit('someoneSubmitted',data);
    })

    socket.on('mySubmission',(data)=>{
        domainValues. push(data.sub);
        if(domainValues.length===data.sub.noOfMembers){
            console.log('it is equal');
            io.sockets.emit('allSubmissions',{
                inf : data.rom,
                domainValues : domainValues
            });
        }
    })

    socket.on('weWannaPlayAgain',(data)=>{
        io.sockets.emit('thenPlay',data);
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
            break;
        }
    }
})

app.get('/selectdomain/:id',(req,res)=>{
    const id = req.params.id;
    for(let room of rooms){
        if(room.id===id){
            res.render('selectdomain',room);
            break;
        }
    }
})

app.get('/play/:id',(req,res)=>{
    const id = req.params.id;
    for(let room of rooms){
        if(room.id===id){
            res.render('play',room);
            break;
        }
    }
})

app.get('/result/:id',(req,res)=>{
    const id = req.params.id;
    for(let room of rooms){
        if(room.id===id){
            res.render('result',room);
            break;
        }
    }
})



