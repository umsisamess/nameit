const socket = io.connect('http://localhost:3000');

const roomcode = document.querySelector('#roomcode');
const submit = document.querySelector('#submit');

submit.addEventListener('click',joinRoom);

function joinRoom(){
    const roomId = roomcode.value;
    console.log(roomId);
    if(!roomId){
        console.log("Enter the code ");
    }
    else{
        socket.emit('canIJoin',{
            roomId: roomId,
            user: sessionStorage.getItem('users'),   
        });
        console.log(roomId);
        alert('yo');

        socket.on('youCanJoin',(data)=>{
            sessionStorage.setItem('roomInfo',JSON.stringify(data));
            location.href = `/lobby/${roomId}`;
        })

    }
}


