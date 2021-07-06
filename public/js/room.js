// const { Socket } = require("socket.io");
const socket = io.connect('https://startwith.herokuapp.com');

const create = document.querySelector('#create');
const join = document.querySelector('#join');

create.addEventListener('click',createClick);
join.addEventListener('click',joinClick);

function createClick(){
    if(sessionStorage.getItem('users')===null){
        location.href = '/index';
        return;
    }
    roomId = makeId(5);
    let room = {
        id : roomId,
        host : sessionStorage.getItem('users'),
        members : [sessionStorage.getItem('users')],
    };
    sessionStorage.setItem('roomcode',JSON.stringify(room));

    //emit events
    socket.emit('roommade', room);

    location.href = `/lobby/${roomId}`;
}

function joinClick(){
    if(sessionStorage.getItem('users')===null){
        location.href = '/index';
        return;
    }
    location.href = '/joinroom';
}

function makeId(length){
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    for(i=0;i<length;i++){
        result += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}
