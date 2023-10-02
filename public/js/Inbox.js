const baseUrl = "http://localhost:3000/";


function returnInbox() {
    url = baseUrl + "inbox"
    const div = document.getElementById("inbox")
    fetch(url).then(
        res => {
            if (!res.ok) {
                throw new Error("Network response is not ok!");
            }
            else return res.json();
        }
    )
        .then(data => {
            const elements = data;
            console.log(data);
            const div = document.getElementById('inbox');
            for (const element of elements) {
                const gmail = element.user.split('@')[0];
                const subject = element.subject;
                const id = element._id;
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');
                const tr = document.createElement('tr');
                tr.setAttribute('data-href', '/inboxMailHtml/' + id);
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                const td3 = document.createElement('td');
                tr.style.height = '50px';
                td1.style.width = '30%';
                td2.style.width = '62%';
                td3.style.width = '20%';

                td1.textContent = gmail;
                td2.textContent = subject;
                const currentTime = new Date();
                const formattedTime = currentTime.toLocaleTimeString();
                td3.textContent = formattedTime;

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tbody.appendChild(tr);
                table.appendChild(tbody);
                div.appendChild(table);
            }



        })

        .catch(error => console.error("'Error fetching Data", error));
}
document.addEventListener('click', function (e) {
    const targetRow = e.target.closest('tr[data-href]');
    if (targetRow) {
        const destination = targetRow.getAttribute('data-href');
        if (destination) {
            window.location.href = destination;
        }
    }
});
$(document).ready(returnInbox);