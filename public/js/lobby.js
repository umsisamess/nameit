const socket = io.connect('http://localhost:3000');

const roomcode = document.querySelector('.roomcode');
const activeusers = document.querySelector('.activeusers');

const code = JSON.parse(sessionStorage.getItem('roomcode'));
if(!code){
    roomInfo = JSON.parse(sessionStorage.getItem('roomInfo'));
    
    socket.emit('iJoined',roomInfo);
    console.log('right way');
}else{
    roomcode.innerHTML = `<h3> The room code is ${code.id}</h3>`;
}

socket.on('someoneJoined',(data)=>{
    currentUrl = window.location.href;
    if(currentUrl===`http://localhost:3000/lobby/${data.id}`){
        roomcode.innerHTML = `<h3> The room code is ${data.id}</h3>`;
        activeusers.innerHTML = '';
        for(let person of data.members){
            activeusers.innerHTML += `<h4 class="user">${person}</h4>`; 
        }
    }    
})

