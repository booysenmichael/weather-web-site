const request = require('request')

const forecast = (lat,lon,callback)=>{
    const apiKey = '49e82bf5704dc6f7702a96bb6f74a8c7'
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apiKey+'&units=metric'
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Could Not Connect',undefined)
        }else if (body.cod!='200'){
            callback('An error Occurded:',undefined)
        }else{
            const temp = body.main.temp 
            const humidity = body.main.humidity
            data = {
                temp,
                humidity
            }
            callback(undefined,data)
        }
    })
}

module.exports = forecast