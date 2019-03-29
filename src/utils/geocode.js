const request = require('request');


const geocode =(address, callback) =>{
  
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoia2huMzIxIiwiYSI6ImNqdHI2N3puOTBreXU0NGxsYmNudHJpNnUifQ.alw03QQc6h_WycuFAR9lrw';
     
    //  request({url : geocodeURL, json : true} , ( error , response)
    request({url : geocodeURL, json : true} , ( error , {body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }else if(body.features.length === 0) {
            callback('unable to find location try another search ', undefined)
        }else{
              callback(undefined,{
                 latitude : body.features[0].center[0],
                 lagitude : body.features[0].center[1] ,
                 location : body.features[0] .place_name
              })
        }
    })
}


module.exports = geocode







// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Peshawar.json?access_token=pk.eyJ1Ijoia2huMzIxIiwiYSI6ImNqdHI2N3puOTBreXU0NGxsYmNudHJpNnUifQ.alw03QQc6h_WycuFAR9lrw';

// request({url : geocodeURL, json : true}, (error,response) => {
//    if(error){
//        console.log("unable to connect to location services")
//    }else if (response.body.features.length === 0) {
//        console.log('unable to get the weather for that location')
//    }else {
//             const latitude = response.body.features[0].center[0];
//             const lagitude = response.body.features[0].center[1];
//              console.log(latitude , lagitude);
//    }

// })
