const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = 'From JavaScript'.
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`) // could have used (--- + location) instead of ${location}`) 
        .then(response => response.text())  // Get the response text
        .then(text => {
            console.log(text);  // Log it to the console
            try {
                const data = JSON.parse(text);  // Parse it as JSON
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                    
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => {
            console.log('Network error:', error);
        });

    console.log(`Location searched: ${location}`);
});

