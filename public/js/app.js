console.log('client side javascript loaded');

// fetch('http://localhost:3000/weather?address=islamabad').then((response)=>{
//     response.json().then((data)=>{
//          console.log(data);
//     })
// })


const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2');
  
//    messageOne.textContent = 'from javescript';

 weatherform.addEventListener('submit',(e)=>{
     e.preventDefault(); 
     const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';


    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        //  console.log(data);
        if(data.error){
            messageOne.textContent = data.error
        }else{
            // console.log(data);
            messageOne.textContent = data.location
            messageTwo.textContent = data.summary + 'current tempreture ::'+data.temperature + '\t rainProb\t' +data.rainprob
        }

    })
})
 })