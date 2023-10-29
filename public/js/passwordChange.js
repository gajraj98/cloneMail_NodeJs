const baseUrl = "http://localhost:3000/";


function getOtp() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const url = baseUrl + `password-change?phoneNumber=${phoneNumber}`;
    const password = document.getElementById('digit1').value;
    const re_password = document.getElementById('digit2').value;
    if(password === re_password){
        const list = {
            password:password
        }
        const details = {
            method:'POST',
            headers:{
                'content-Type': 'applection/json'
            },
            body:JSON.stringify(list)
        }
    fetch(url,details)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response is not ok!");
            } else {
                return res.json();
            }
        })
        .then(data => {
                window.location.href = '/';
        })
        .catch(e => {
            console.error(e);
        })
    }


}

