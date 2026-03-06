const userName = document.getElementById('username');
const userPass = document.getElementById('userpass');
const signInBtn = document.getElementById('sign-in-btn');

signInBtn.addEventListener('click', function () {
    event.preventDefault();
    // console.log('Ype')
    if (userName.value == 'admin' && userPass.value == 'admin123') {
        console.log('yes we did it');
        window.location.href = 'home.html';
    }
    else {
        alert('Please Enter The Right username and password');
    }
})