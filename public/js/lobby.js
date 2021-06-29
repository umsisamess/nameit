const roomcode = document.querySelector('.roomcode');
const code = JSON.parse(sessionStorage.getItem('roomcode'));
roomcode.innerHTML = `<h3> The room code is ${code.id}</h3>`;
