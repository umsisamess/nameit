const username = document.querySelector('#username');
const submit = document.querySelector('#submit');
var user='';

submit.addEventListener('click',addUsername);

function addUsername(e){
    e.preventDefault();
    user = username.value;
    if(user==''){
        console.log('enter username');
    }else{
        console.log(user);
        sessionStorage.setItem('users',user);
        location.href = '/room';
    }
}
