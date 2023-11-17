const baseUrl = "http://localhost:3000/";
// const queryParam = new URLSearchParams(window.location.search);
// const id = queryParam.get('id');


function returnInbox() {
    const inboxMailId = document.getElementById('inboxMailId').value;
    url = baseUrl + "inboxMail/" + inboxMailId;
    const div = document.getElementById("inbox");
    fetch(url).then(
        res => {
            if (!res.ok) {
                throw new Error("Network response is not ok!");
            }
            else return res.json();
        }
    )
        .then(data => {
            const element = data;
            console.log(data);
            const targetDiv = document.getElementById('inbox');
            const div = document.createElement('div');
            div.className = "mailContentTemplate";
            const h2 = document.createElement('h2');
            h2.textContent = element.subject;
            div.appendChild(h2);

            const p = document.createElement('p');
            p.style.wordWrap = "break-word"; // Allow long words to wrap to the next line
            p.textContent = element.mailContent;
            p.style.textAlign = 'left';
            p.style.marginLeft = '40px';
            p.style.marginRight = '40px';

            div.appendChild(p);
            targetDiv.appendChild(div);

        })



        .catch(error => console.error("'Error fetching Data", error));
}

$(document).ready(returnInbox);