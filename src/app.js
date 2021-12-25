const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./util/geocode')
const forecast = require('./util/forecast')

const app = express()
const port = process.env.PORT || 3000

const dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars express
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup up static function
app.use(express.static(dir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zahir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name: 'Zahir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact me',
        name: 'Zahir'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error:'You must provide an address'
        }) 
    }

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

            if(error) {
                return res.send({ error })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send({error})
                }
                
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                console.log(location)
                console.log(forecastData)
                
            })
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Zahir',
        error: 'Help article not found'
    })
})

app.get('/products', (req,res) => {
    
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search item'
        })
    } 

    console.log(req.query)
    res.send({
        products: [],
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Zahir',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})