

const baseUrl = "http://localhost:3000/";

function signUp(){
    
    event.preventDefault();
   const url = baseUrl + 'sign';
   const form  = document.getElementById('form');
   const email = form.elements.email.value;
   const conformEmail = form.elements.conformEmail.value;
   const password = form.elements.password.value;
   const conformPassword = form.elements.conformPassword.value;
   const phoneNumber=  form.elements.phoneNumber.value;
   const error = document.getElementById('error');
  
   if(email !== conformEmail){
        
        error.textContent = 'Emails do not match. Please try again';
        form.reset();
   }
   else{
      if(password !== conformPassword){
        error.textContent = 'Password do not match. Please try again';
        form.reset();
      }
      else{
          const formData = {
            email: email,
            password: password,
            phoneNumber: phoneNumber
          }
        const options = {
            method:'POST',
            headers:{
                'content-Type': 'applection/json'
            },
            body: JSON.stringify(formData)
         }
        fetch(url,options).then(respone => {
            if (!respone) {
                throw new Error("Network Error");
            }
            else return respone.json();
        })
        .catch(error=>{
            error.textContent = error.message;
        console.log(error);
    });
      }
   }


}