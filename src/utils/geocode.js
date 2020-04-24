const request = require('request')

const geocode = (cityname,callback) =>{
    const mapBoxApiKey = 'pk.eyJ1IjoiYm9veXNlbm1pY2hhZWwiLCJhIjoiY2s4c2d2OHBoMGJ0bjNrcnNsMGd5ZjdlNiJ9.vl2uT6sZBhIMy7xT34fKYA'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(cityname)+'.json?limit=1&access_token='+mapBoxApiKey
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.features.length==0){
            callback('No Results',undefined)
        }else{
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            data ={
                longitude, 
                latitude,
                location 
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode