const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=9caa84dea42c8da8df5caf5604430301&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}) => {

        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error) {
            callback('Unable to find the location', undefined)
        } else {
            const weather = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
    
            callback(undefined, weather +'. It is currently ' + temperature + ' degrees out. It feels like ' + feelsLike + ' degrees out.' )
        }

    })
}

module.exports = forecast