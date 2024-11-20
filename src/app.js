const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
// serves everything in the public dir - static assets
app.use(express.static(publicDirectoryPath)); 

const weatherForecast = (request, response) => {
    geocode(request.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return response.send({ error });
        }
        forecast(latitude, longitude, (error, { description, temperature, feels_like, humidity } = {}) => {
            if (error) {
                return response.send({ error });
            } 
            response.send({
                location, // shorthand of location: location
                forecast: `${description}. Temperature is currently ${ temperature } degrees. 
                            It feels like ${feels_like} degrees outside and humdity is ${humidity}%.`,
                address: request.query.address
            });
        });
    });
}

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Courage Ugwuanyi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Courage Ugwuanyi'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help is coming your way!',
        title: 'Help',
        name: 'Courage Ugwuanyi'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    weatherForecast(req, res);
    
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Courage Ugwuanyi',
        message: 'Help article not found!',
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Courage Ugwuanyi',
        message: 'Page not found!',
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});