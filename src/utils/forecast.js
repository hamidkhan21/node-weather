const request = require('request');

const forecast = (latitude , logitude, callback) =>{

    const url ='https://api.darksky.net/forecast/00c68062a9f0a77385f4ec4d3bf96fa9/'+latitude + ',' + logitude + '?units=si';

    // request({url: url ,json : true} , (error, response)
    request({url ,json : true} , (error, {body})=>{
            //  const data =JSON.parse(response.body);
        
             if (error){
                 callback('error in connection to server ', undefined);
             }else if(body.error){
                 callback('cannnot get any reponse body from server ',undefined)
             }else{
                 callback(undefined, {
                     temperature: body.currently.temperature,
                     rainprob : body.currently.precipProbability,
                     summary : body.daily.data[0].summary
                 })
             }
            //  console.log(data.currently);
            // console.log(response.body.currently);
            // console.log(response.body.daily.data[0].summary + "its currently "+response.body.currently.temperature + "degree out . There is a " + response.body.currently.precipProbability+ "% chance of rain");
        })
}

module.exports = forecast


















// const url = 'https://api.darksky.net/forecast/00c68062a9f0a77385f4ec4d3bf96fa9/33.538509,71.437294?units=si';

// request({url: url ,json : true} , (error, response)=>{
//     //  const data =JSON.parse(response.body);
//     //  console.log(data.currently);
//     // console.log(response.body.currently);
//     console.log(response.body.daily.data[0].summary + "its currently "+response.body.currently.temperature + "degree out . There is a " + response.body.currently.precipProbability+ "% chance of rain");
// })

// 33.538509,71.437294