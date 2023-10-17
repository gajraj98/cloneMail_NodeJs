
function composeMail(event) {
    event.preventDefault();
    url = baseUrl + 'composeMail';
    console.log(url);
    const form = document.getElementById('compose');
    const formData = {
        to: form.to.value,
        subject: form.subject.value,
        mailContent: form.mailContent.value
    };
    console.log(form.to.value);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData)
    }

    fetch(url, options) 
        .then(respone => {
            if (!respone) {
                throw new Error("Network Error");
            }
            else return respone.json();
        })
        .catch(error=>{
        console.log(error);
    });
    $('#exampleModal').modal('hide');
}