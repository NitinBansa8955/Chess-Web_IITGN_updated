

const scriptURL = "https://script.google.com/macros/s/AKfycbxrq1nw1KtES93OsLCJfGpvBTT4GsRiH2-wTvkhmjIJofoMTgOhjidgMQ3QCGYdFZf5vQ/exec"

const form = document.forms['google-sheet'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const phoneInput = form['Phone Number'].value;
  const emailInput = form['Email Address'].value;

  // Validate phone number length
  if (phoneInput.length !== 10 || !/^\d{10}$/.test(phoneInput)) {
    alert("Please enter a valid 10-digit phone number.");
    return;  
  }

  const duplicateEmail = await checkDuplicateEmail(emailInput);
  if (duplicateEmail) {
    alert("This email is already registered.");
    return;  
  }


  document.getElementById('loadingModal').style.display = 'block';

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => response.json())
    .then(json => {
      
      document.getElementById('loadingModal').style.display = 'none';

      if (json.result === 'success') {
        
        form.reset();
        window.location.href = 'submit.html';
      } else {
       
        alert(json.error || "There was an error submitting the form.");
      }
    })
    .catch(error => {
      document.getElementById('loadingModal').style.display = 'none'; 
      console.error('Error!', error.message);
      alert('There was an error submitting the form.');
    });
});


async function checkDuplicateEmail(email) {
  
  const registeredEmails = ["test@example.com", "user@example.com"]; 
  return registeredEmails.includes(email);
}


// https://script.google.com/macros/s/AKfycbxrq1nw1KtES93OsLCJfGpvBTT4GsRiH2-wTvkhmjIJofoMTgOhjidgMQ3QCGYdFZf5vQ/exec