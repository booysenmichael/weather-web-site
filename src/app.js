const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Defin paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Marius'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Marius'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        helptext:'This is the help message text',
        name: 'Marius'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    const address = req.query.address
    geocode(address,(error,{latitude,longitude,location}={})=>{
       if(error){
        return res.send({
            error
        })
       }
        forecast(latitude,longitude, (error,{temp,humidity})=>{
            if(error){
                return res.send({
                    error
                })
            }else{
                res.send({
                    latitude,
                    longitude,
                    location,
                    address,
                    temp,
                    humidity
                })
            } 
        })
    })
   
    // res.send({
    //     forecast: "Let it rain!",
    //     location: "Pretoria",
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'No search parameter provided'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Marius',
        message:'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Marius',
        message:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})