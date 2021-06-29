const express = require('express');

//app setup
const app = express();
const server = app.listen(3000,()=>{
    console.log('listening to requests on port 3000');
});

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

app.get('/lobby',(req,res)=>{
    res.render('lobby');
})

