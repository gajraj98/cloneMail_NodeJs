const baseUrl = "http://localhost:3000/";
// const queryParam = new URLSearchParams(window.location.search);
// const id = queryParam.get('id');


function returnInbox(){
    const inboxMailId = document.getElementById('inboxMailId').value;
    url = baseUrl + "inboxMail/" + inboxMailId;
    const div = document.getElementById("inbox");
    fetch(url).then(
        res=>{
            if(!res.ok){
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
        div.className = "mail_class";
        const h2 = document.createElement('h2');
        h2.textContent = element.subject;
    // imporant! content learn this 
        const p = document.createElement('p');
        p.style.whiteSpace = "pre-line"; // Preserve line breaks
        p.textContent = element.mailContent;
    
        div.appendChild(h2);
        div.appendChild(p);
        targetDiv.appendChild(div);
    })
    

    
    .catch(error=>console.error("'Error fetching Data",error));
}

$(document).ready(returnInbox);