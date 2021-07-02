const socket = io.connect('http://localhost:3000');

const answers = document.querySelector('.answers');
const randomWord = document.querySelector('.randomword');

console.log('yes');
let Room = JSON.parse(sessionStorage.getItem('roomcode'));
if(Room){
    socket.emit('iNeedDomains',Room.id);
}else{
    let rm = JSON.parse(sessionStorage.getItem('roomInfo'));
    socket.emit('iNeedDomains',rm.id);
}

socket.on('takeTheDomains',(data)=>{
    randomWord.innerHTML = `
    <h1>${data.ranChar}</h1>
    `;
    console.log(data.domains);
    let answersValue = ``;
    for(let domain of data.domains){
        answersValue += `
        <div class="domains">
            <label for="domain">${domain}</label>
            <input type="text" id="${domain}">
        </div>
    `;
    }
    answers.innerHTML = answersValue;
})