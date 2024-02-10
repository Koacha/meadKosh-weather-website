// Importing required modules and utility functions
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { error } = require('console');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Initialize the Express application
const app = express();
const port = process.env.PORT || 3000; // Use the environment's port if available or default to 3000

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public'); // Path to serve static files
const viewsPath =  path.join(__dirname, '../templates/views'); // Path to views directory for Handlebars
const partialsPath =  path.join(__dirname, '../templates/partials'); // Path to Handlebars partials

// Setup Handlebars engine and views location
app.set('view engine', 'hbs'); // Set Handlebars as the view engine
app.set('views', viewsPath); // Set custom directory for views
hbs.registerPartials(partialsPath); // Register Handlebars partials directory

// Setup middleware to serve static files from the public directory
app.use(express.static(publicDirectoryPath));

// Routes definitions
app.get('', (req, res) => {
    // Render the index view with title and name
    res.render('index', { title: 'Weather App', name: 'Musa' });
});

app.get('/about', (req, res) => {
    // Render the about page
    res.render('about', { title: 'About page', name: 'Ali' });
});

app.get('/help', (req, res) => {
    // Render the help page with a custom message
    res.render('help', { title: 'Weather App Help Page', name: 'The Team', helpText: 'Can you we help?' });
});

app.get('/object', (req, res) => {
    // Example route showing how to render dynamic content (e.g., a list of people)
    res.render('help', {
        people: [
            { name: "John Doe", age: 30, gender: "Male" },
            { name: "Jane Smith", age: 25, gender: "Female" },
            { name: "Alex Johnson", age: 28, gender: "Non-binary" }
        ]
    });
});

app.get('/weather', (req, res) => {
    // Route to fetch weather information based on an address query parameter
    if (!req.query.address) {
        return res.send({ error: 'Please provide an address' });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({ forecast: forecastData, location, address: req.query.address });
        });    
    });
});

app.get('/products', (req, res) => {
    // Example route for a product search feature
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' });
    }
    console.log(req.query.search);
    res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
    // Catch-all route for non-existent help articles
    res.render('404', { title: '404', name: 'Coach', errorMessage: 'No help article found' });
});

app.get("*", (req, res) => {
    // Catch-all route for all other non-existent pages
    res.render('404', { title: '404', name: 'Coach', errorMessage: 'No page found' });
});

// Start the Express server on the specified port
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

// Additional comments about running the application and using nodemon for development


// to run this we have to use node src/app.js instead of node app.js becausse the app is not in the root folder

// let's use nodemon to start the server
