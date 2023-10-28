const baseUrl = "http://localhost:3000/";


function getOtp() {
    const phoneNumber = document.getElementById('phoneNumber').value;
    const url = baseUrl + `otp-verifection?phoneNumber=${phoneNumber}`;
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response is not ok!");
            } else {
                return res.json();
            }
        })
        .then(data => {
            const otp = data;
            const digit1 = document.getElementById('digit1').value;
            const digit2 = document.getElementById('digit2').value;
            const digit3 = document.getElementById('digit3').value;
            const digit4 = document.getElementById('digit4').value;
            const inputOTP = digit1 * 1000 + digit2 * 100 + digit3 * 10 + digit4 * 1;
            console.log(inputOTP);
            if (inputOTP === otp) {
                window.location.href = '/home';
            }
            else {
                const p = document.createElement('p');
                p.textContent = "Enter Correct OTP";
                p.style.color = "red";
                const div = document.getElementById('error');
                div.innerHTML = ''; // Clear the existing content of the div
                div.appendChild(p); // Append the p element to the div

            }
        })
        .catch(e => {
            console.error(e);
        })


}

