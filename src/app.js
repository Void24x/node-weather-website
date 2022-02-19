const path = require('path')
const express =  require('express')
const hbs = require('hbs') //working with partials sec7 vid49
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))  //--> to acess the files(here index.html) we want to send to the browser from the root directory of our machine


const app = express()

//define path for express config
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')// -- section-7, video -48
const partialPath = path.join(__dirname, '../templates/partials')  //working with partials sec7 vid49

//Setup handlebars and view location
app.set('view engine','hbs')
app.set('views', viewsPath) // -- section-7, video -48
hbs.registerPartials(partialPath)

// setup static directiory to serve
app.use(express.static(publicPathDirectory))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Bibhu'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Bibhu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help page for your help..!',
        title: 'Help',
        name: 'Bibhu'
    })
})



app.get('/weather' , (req,res) => {
    if(!req.query.address){
       return res.send({
            error:"Please provide an address!!"
        })
    }

    const address = req.query.address
    
    geocode(address, (error,{longitude,latitude,location} = {}) => {   //ES6 object short-hand syntax
        if (error) {
          return res.send({error})
        }

        // console.log('Error ' , error)
        // console.log('Data ', data)
        
        forecast(longitude, latitude, (error, forecastdata) => {
          if (error){
            return res.send({error})
          }
      
          res.send({
              Temperature:forecastdata,
              location,
              address:req.query.address
          })
        })
      })

    
})





app.get('/help/*',(req, res) => {
    res.render('error',{
        title: '404',
        errorMessage: 'Help Article not found !',
        name: 'Bibhu'
    })
})

app.get('*' , (req,res) => {
    res.render('error',{
        title: '404',
        errorMessage: 'Page Not found',
        name: 'Bibhu'
    })
})

app.listen(3000 , () => {
    console.log("Server is up at port 3000.")
})


// app.get('/products',(req,res) => {

//     if(!req.query.search){
//         return res.send({
//             error: "Please provide a search term!!"
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })




//app.com --> route default
//app.com/help
//app.com/about

// -------------------------------route handler-------------------

// app.get('/help' , (req,res) => {
//     res.send([{name:'Bibhu'},
//         {name:'Soumya'}])
// })
// app.get('/about' , (req,res) => {
//     res.send("<h1>About</h1>")
// })

//----------------------------------------------------------------
