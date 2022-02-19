const request = require('request')

// const forecast = (la , lo , callback) => {

//     const url = 'http://api.weatherstack.com/current?access_key=2a9f9fea702b21e54a1abe95373a06da&query='+ la +','+ lo +'&units=f'

//     request({url : url , json: true} , (error , response) => {
//         if (error) {
//             callback('Unable to connect to the Network..!!' , undefined)
//         } else if (response.body.error) {
//             callback('Unable to find the location..!!', undefined)
//         } else {
//             callback( undefined,response.body.current)
//         }
//     })
// }

const forecast = (longitude, latitude , callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=2a9f9fea702b21e54a1abe95373a06da&query='+latitude+','+longitude

    request({url , json: true} , (error , {body}) => {  //ES6 object short-hand syntax - request({url: url , json: true} , (error ,response) => {}

        if (error) {
            callback('Unable to connect to the Network..!!' , undefined)
        } else if (body.error) {
            callback('Unable to find the location..!!', undefined)
        } else {
            callback(undefined,'Current Temperature is: ' + body.current.temperature + ' degree. It fells like ' + body.current.feelslike + ' degree outside. Sky view: ' + body.current.weather_descriptions )
        }
    })
}

module.exports = forecast