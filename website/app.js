/* Global Variables */
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
let apiKey = 'f1c4714d2b90bea09c9301ca0985cd3e';
let tempr = 0;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//add EventListener when 'generate' button is clicked
document.getElementById('generate').addEventListener('click', performAction);

//this is a function to chain promises after clicking the generate button
function performAction(e) {
  e.preventDefault();
  const feeling = document.getElementById('feelings').value;
  getWeather()
    .then(function(){
      postData('/add', {date:newDate, feeling:feeling, temp:tempr});
    })
    .then(function(){
      updateUI();
    });
}

//function to get data from the server (end point) and put it in the website UI
const updateUI = async () => {
  const request = await fetch('/all'); //Fetching
  try {
    const data = await request.json()
    console.log(data);
    document.getElementById('date').innerHTML = `data Today is: ${data.date}`; //Adding date to UI
    document.getElementById('temp').innerHTML = `Temperatuer  in c: ${data.temp}`; //Adding Temprature to UI
    document.getElementById('content').innerHTML = `Feeling is : ${data.feeling}`; //Adding User feelings to UI
  }catch(error) { //discover errors
  console.log("error", error);
  }

};

//function to get weather data from the API
const getWeather = async () => {
  //use fecth methode to async
  const zipCode = document.getElementById('zip').value;
  const result = await fetch(`${baseUrl}?zip=${zipCode}&appid=${apiKey}&units=metric`); //fetch url
  try {
    const weather = await result.json();
    const temp = weather.main.temp;
    console.log(temp);
    tempr = temp;
    return temp;
  } catch (error) { //discover errors
    console.log('error', error);
  }
};

//function to post weather data to our app end point
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    return newData
  }catch(error) { //discover errors
  console.log("error", error);
  }
}
