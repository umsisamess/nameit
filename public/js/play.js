const socket = io.connect('http://localhost:3000');

const answers = document.querySelector('.answers');
const randomWord = document.querySelector('.randomword');
const done = document.querySelector('#done');

const user = sessionStorage.getItem('users');

let totalMembers;

console.log('yes');
let Room = JSON.parse(sessionStorage.getItem('roomcode'));
if(Room){
    totalMembers = Room.members.length;
    socket.emit('iNeedDomains',Room.id);
}else{
    let rm = JSON.parse(sessionStorage.getItem('roomInfo'));
    totalMembers = rm.members.length;
    socket.emit('iNeedDomains',rm.id);
}

let domains = [];

socket.on('takeTheDomains',(data)=>{
    randomWord.innerHTML = `
    <h1>${data.ranChar}</h1>
    `;
    console.log(data.domains);
    let answersValue = ``;
    domains = [];
    for(let domain of data.domains){
        domains.push(domain);
        answersValue += `
        <div class="domains">
            <label for="domain">${domain}</label>
            <input type="text" id="${domain}">
        </div>
    `;
    }
    answers.innerHTML = answersValue;
    
})

done.addEventListener('click',doneClicked);


let values = [];
function doneClicked(){
    let a = 0;
    console.log(domains);
    for(let domain of domains){
        const value = document.querySelector(`#${domain}`).value;
        if(!value || value.trim()===''){
            a = 0;
            alert('fill all fields');
            break;
        }else{
            a += 1;
        }
    }
    console.log(a);
    if(a>=5){
        socket.emit('iSubmitted','submitted');
    }
}

socket.on('someoneSubmitted',(data)=>{
    console.log('someone really submitted');
    for(let domain of domains){
        const value = document.querySelector(`#${domain}`).value;
        if(!value || value.trim()===''){
            values.push('');
        }else{
            values.push(value);
        }
    }
    console.log(values);
    socket.emit('mySubmission',{
        noOfMembers : totalMembers,
        user : user,
        values : values,
    })

})

socket.on('allSubmissions',(domainValues)=>{
    sessionStorage.setItem('submissions',JSON.stringify(domainValues));
    console.log(JSON.parse(sessionStorage.getItem('submissions')));
    location.href = '/result';
})
