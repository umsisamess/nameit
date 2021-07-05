const socket = io.connect('http://localhost:3000');

const resultTable = document.querySelector('#resultTable');
const submissions = JSON.parse(sessionStorage.getItem('submissions'));
const nextBtn = document.querySelector('#next');

let infoRoom;
let rm;
let Room = JSON.parse(sessionStorage.getItem('roomcode'));
if(Room){
    infoRoom = Room;
    nextBtn.disabled = false;
}else{
    rm = JSON.parse(sessionStorage.getItem('roomInfo'));
    infoRoom = rm;
    nextBtn.disabled = true;
}

resultTable.innerHTML = '';

for(let i=0;i<submissions.dv.length;i++){
    let m;
    submissions.dv[i].score = 0;
    for(k=0;k<5;k++){
        for(j=0;j<submissions.dv.length;j++){
            m = 0;
            console.log(submissions.dv[i].values[k]==='' || submissions.dv[i].values[k].charAt(0).toUpperCase());
            console.log(submissions.rw);
            if(submissions.dv[i].values[k].charAt(0).toUpperCase()!==submissions.rw){
                m = 1;
                break;
            }
            if(i!=j){
                if(submissions.dv[i].values[k]===submissions.dv[j].values[k] || submissions.dv[i].values[k]===''){
                    console.log("score wont rise");
                    m = 1;
                    break;
                }
            }
        }
        if(m===0){
            submissions.dv[i].score += 1;
        }
    }
    
}

sessionStorage.setItem('submissions',JSON.stringify(submissions));

dm = submissions.dv[0].domains;

resultTable.innerHTML +=`
    <tr>
        <th>Player</th>
        <th>${dm[0]}</th>
        <th>${dm[1]}</th>
        <th>${dm[2]}</th>
        <th>${dm[3]}</th>
        <th>${dm[4]}</th>
        <th>Score</th>
    </tr>
`

for(let i=0;i<submissions.dv.length;i++){
    let data = submissions.dv[i].values;
    resultTable.innerHTML += `
    <tr>
        <td>${submissions.dv[i].user}</td>
        <td>${data[0]}</td>
        <td>${data[1]}</td>
        <td>${data[2]}</td>
        <td>${data[3]}</td>
        <td>${data[4]}</td>
        <td>${submissions.dv[i].score}</td>
    </tr>
    `
}

nextBtn.addEventListener('click',backToGame);

function backToGame(){
    socket.emit('weWannaPlayAgain',infoRoom);
}

socket.on('thenPlay',(data)=>{
    if(infoRoom.id===data.id){
        sessionStorage.removeItem('submissions');
        location.href = `/play/${infoRoom.id}`;
    }
})