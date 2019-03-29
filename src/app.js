 const path = require('path');
 const express = require('express');
 const geocode = require('./utils/geocode');
 const forecast = require('./utils/forecast');

//  for partials working with hbs
const hbs = require('hbs')

 // console.log(__dirname);
 // console.log(path.join(__dirname,'../public'));

 const app = express();
// Define path for express config
 const viewpath = path.join(__dirname, '../templates/views')
 const partialspath = path.join(__dirname,'../templates/partials')
 //  setting handlebars and views location
 app.set('view engine', 'hbs');
 app.set('views', viewpath);
 hbs.registerPartials(partialspath)

// setup setup directory to serve static file
 app.use(express.static(path.join(__dirname, '../public')))


 // app.use('/help', express.static(path.join(__dirname,'../public/help.html')))
 // app.use('/about',express.static(path.join(__dirname, '../public/about.html')))
 app.get('', (req, res) => {
     res.render('index', {
         title: 'weather',
         name: 'khn'
     });
 })

 app.get('/help', (req, res) => {
     res.render('help', {
         message: 'any thing i can help u with ...',
         title : 'help',
         name: 'hamid'
     })
 })

 app.get('/about', (req, res) => {
     res.render('about', {
         title: 'About Me',
         name: 'hamid'
     })
 })

 app.get('/weather', (req, res) => {
     console.log(req.query.address)
     if(!req.query.address){
        return res.send({
            error: 'you provide a address term'       
          })
     }

     geocode(req.query.address, (error, {latitude ,lagitude ,location}= {})=>{
        if(error){
            return res.send({
               error: error
            })
        }
    //  console.log("data is ",  data)
    // forecast(data.latitude,data.lagitude ,(error,forcastdata)
    
         forecast(latitude,lagitude ,(error,{temperature, rainprob ,summary} ={})=>{
             if(error){
                 return res.send({
                     error: error
                 })
             }
            // console.log("error", error)
         
            return res.send({
                location: location,
                summary: summary ,
                temperature : temperature,
                rainprob : rainprob
            })
        })

    })
 })

app.get('/products' ,(req,res)=>{
    console.log(req.query.search)
    if(!req.query.search){
       return res.send({
         error: 'you provide a search term'       
       })
    }

    res.send({
         products : []
    })
})


 app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name: 'khn',
        errorMessage : 'Help article not found'
    })
 })


app.get('*',(req,res)=>{
  res.render('404',{
      title: '404',
      name: 'khn',
      errorMessage: 'Page not found'
  })
})

 app.listen(3000, () => {
     console.log('server is up on port 3000')
 })