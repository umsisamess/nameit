const socket = io.connect('https://startwith.herokuapp.com');

const roomcode = document.querySelector('.roomcode');
const activeusers = document.querySelector('.activeusers');
const start = document.querySelector('#start');

let infoRoom;
const code = JSON.parse(sessionStorage.getItem('roomcode'));
console.log(code);
if(!code){//after join room
    roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
    infoRoom = roomInfo;
    if(sessionStorage.getItem('users')!==roomInfo.host){
        start.disabled = true;
    }
    socket.emit('iJoined',roomInfo);
    console.log('right way');
}else{//after createroom
    infoRoom = code;
    console.log(code);
    socket.emit('iJoined',code);
    console.log('left way');
}

socket.on('someoneJoined',(data)=>{
    console.log(data);
    console.log('someone joined');
    if(infoRoom.id===data.id){
        if(code){
            let m = 0;
            for(member of code.members){
                if(member===data.members[data.members.length-1]){
                    m = 1;
                    break;
                }
            }
            if(m===0){
                code.members.push(data.members[data.members.length-1]);
                sessionStorage.setItem('roomcode',JSON.stringify(code));
            }
        }
        
        currentUrl = window.location.href;
        if(currentUrl===`https://startwith.herokuapp.com/lobby/${data.id}`){
            roomcode.innerHTML = `<h3> The room code is ${data.id}</h3>`;
            activeusers.innerHTML = '';
            for(let person of data.members){
                activeusers.innerHTML += `<h4 class="user">${person}</h4>`; 
            }
        }
    }
        
})

start.addEventListener('click',takeToSelectDomain);

function takeToSelectDomain(){
    socket.emit('domainSelect',infoRoom);
    // location.href = '/selectdomain';
}

socket.on('goToSelect',(data)=>{
    //if host
    if(infoRoom.id===data.id){
        location.href = `/selectdomain/${infoRoom.id}`;
    }
})
