const socket = io.connect('http://localhost:3000');

const resultTable = document.querySelector('#resultTable');
const submissions = JSON.parse(sessionStorage.getItem('submissions'));
const nextBtn = document.querySelector('#next');

let rm;
let Room = JSON.parse(sessionStorage.getItem('roomcode'));
if(Room){
    nextBtn.disabled = false;
}else{
    rm = JSON.parse(sessionStorage.getItem('roomInfo'));
    nextBtn.disabled = true;
}

resultTable.innerHTML = '';

for(let i=0;i<submissions.length;i++){
    let m;
    submissions[i].score = 0;
    for(k=0;k<5;k++){
        for(j=0;j<submissions.length;j++){
            m = 0;
            if(i!=j){
                if(submissions[i].values[k]===submissions[j].values[k] || submissions[i].values[k]===''){
                    m = 1;
                    break;
                }
            }
        }
        if(m===0){
            submissions[i].score += 1;
        }
    }
    
}

sessionStorage.setItem('submissions',JSON.stringify(submissions));

dm = submissions[0].domains;

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

for(let i=0;i<submissions.length;i++){
    let data = submissions[i].values;
    resultTable.innerHTML += `
    <tr>
        <td>${submissions[i].user}</td>
        <td>${data[0]}</td>
        <td>${data[1]}</td>
        <td>${data[2]}</td>
        <td>${data[3]}</td>
        <td>${data[4]}</td>
        <td>${submissions[i].score}</td>
    </tr>
    `
}

nextBtn.addEventListener('click',backToGame);

function backToGame(){
    socket.emit('weWannaPlayAgain','lets play');
}

socket.on('thenPlay',(data)=>{
    if(Room){
        location.href = `/play/${Room.id}`;
    }else{
        location.href = `/play/${rm.id}`;
    }
})