// Accessing DOM elements
const weatherForm = document.querySelector('form'); // Selects the first <form> element found in the document
const search = document.querySelector('input'); // Selects the first <input> element
const messageOne = document.querySelector('#message-1'); // Selects the element with id="message-1"
const messageTwo = document.querySelector('#message-2'); // Selects the element with id="message-2"

// Initially setting the second message to empty as a reset or clear operation
messageTwo.textContent = '';

// Adding an event listener for the 'submit' event on the weatherForm element
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevents the default form submit action, stopping the page from reloading

    // Retrieving the user's input (location) from the search input field
    const location = search.value;

    // Indicating to the user that their request is being processed
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = ''; // Clears any previous value

    // Performing a fetch request to the server-side route `/weather` with the user's location as a query parameter
    fetch(`/weather?address=${location}`) // Template literal used for embedding the variable 'location'
        .then(response => response.text()) // Extracting the text from the fetch response
        .then(text => {
            console.log(text); // Logging the response text to the console for debugging
            try {
                const data = JSON.parse(text); // Attempting to parse the text as JSON

                // Checking for an error in the response data and updating DOM elements accordingly
                if (data.error) {
                    messageOne.textContent = data.error; // Displaying the error message
                } else {
                    // Displaying successful response data
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            } catch (error) {
                // Handling and logging JSON parsing errors
                console.error('Error parsing JSON:', error);
            }
        })
        .catch(error => {
            // Handling network errors (e.g., request failure)
            console.log('Network error:', error);
        });

    // Logging the searched location for debugging purposes
    console.log(`Location searched: ${location}`);
});

/* Try and Catch example
try {
    // Code that may throw an error
    let result = someFunctionThatMightFail();
    console.log(result);
} catch (error) {
    // Code to run if an error occurs
    console.log('An error occurred:', error.message);
}






*/