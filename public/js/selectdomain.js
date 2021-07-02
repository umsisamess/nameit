const socket = io.connect('http://localhost:3000');

const code = JSON.parse(sessionStorage.getItem('roomInfo'));

if(code){// not host
    document.body.innerHTML = '<p id="wait"><h1>Host is selecting domains. Please Wait..</h1></p>';
}
else{
    const buttons = document.querySelectorAll('#p-domain');
    const selected = document.querySelector('.selected');
    const custom = document.querySelector('#custom');
    const addCustom = document.querySelector('#add');
    const done = document.querySelector('#done');

    console.log(buttons);

    let selectedDomains = [];

    for(button of buttons){
        button.addEventListener('click',(e)=>{
            if(selectedDomains.length<5){
                e.srcElement.disabled = true;
                let clicked = e.srcElement.innerHTML;
                selectedDomains.push(clicked);
                selected.innerHTML += `<p>${clicked}</p>`;
                console.log(clicked);
            }else{
                alert('you have already selected 5 domains');
            }
    })
    }

    addCustom.addEventListener('click',addCustomDomain);
    done.addEventListener('click',domainsSelected);

    function addCustomDomain(){
        let entered = custom.value;
        console.log(entered);
        if(entered!=null){
            if(entered.trim()!=''){
                if(selectedDomains.length<5){
                    selectedDomains.push(entered.trim());
                    selected.innerHTML += `<p>${entered}</p>`;
                }else{
                    alert('you have already selected 5 domains');
                }  
            }
            
        }
        custom.value = '';
    }

    function domainsSelected(){
        if(selectedDomains.length<5){
            alert("Please select 5 domains");
        }else{
            const roomcode = JSON.parse(sessionStorage.getItem('roomcode'));
            console.log(selectedDomains);
            const dataToBeSent = {
                code: roomcode.id,
                domains : selectedDomains,
            }
            socket.emit('domainSelectionCompleted',dataToBeSent);
            
        }
    }
}

socket.on('goToPlay',(data)=>{
    let Room = JSON.parse(sessionStorage.getItem('roomcode'));
    if(Room){
        location.href = `/play/${Room.id}`;
    }else{
        let rm = JSON.parse(sessionStorage.getItem('roomInfo'));
        location.href = `/play/${rm.id}`;
    }
})
