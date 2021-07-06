const socket = io.connect(`https://startwith.herokuapp.com`);

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
        console.log(sessionStorage);
        socket.emit('canIJoin',{
            roomId: roomId,
            user: sessionStorage.getItem('users'),
            sid : socket.id,   
        });
        console.log(roomId);
        alert('yo');

        socket.on('youCanJoin',(data)=>{
            console.log(data);
            sessionStorage.setItem('roomInfo',JSON.stringify(data));
            location.href = `/lobby/${roomId}`;
            
        })

        socket.on('youCantJoin',(data)=>{
            alert('your name coincides with someone else in the room');
        })

        // socket.on('success',(data)=>{
        //     alert(data);
        // })

    }
}


