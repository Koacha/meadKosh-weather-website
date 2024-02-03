const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { error } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000



// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath =  path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')


// Setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Musa'

     
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Ali'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App Help Page',
        name: 'The Team',
        helpText: 'Can you we help?'
    })
})


app.get('/object', (req, res) => {
    res.render('help', {
        people: [
            { name: "John Doe", age: 30, gender: "Male" },
            { name: "Jane Smith", age: 25, gender: "Female" },
            { name: "Alex Johnson", age: 28, gender: "Non-binary" }
        ]
    });
});


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }); // Add return here to stop function execution
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }); // Add return here as well
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });    
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search)
        return res.send({
        error: 'You must provie search term'
    })
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Coach',
        errorMessage: 'No help article found'
    })
})
      


app.get("*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Coach',
        errorMessage: 'No page found'
    })

})
    
      

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// to run this we have to use node src/app.js instead of node app.js becausse the app is not in the root folder

// let's use nodemon to start the server
