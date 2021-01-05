// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 7000;
const server = app.listen(port, listening);
function listening(){
  // console.log(server);
  console.log(`running on localhost: ${port}`);
};


// GET route
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
  console.log(projectData);
};

// POST route
app.post('/add', callBack);

function callBack(req,res){
  newEntry = {
    date: req.body.date,
    feeling: req.body.feeling,
    temp: req.body.temp
  }
  projectData = newEntry;
  res.send(projectData);
  console.log(projectData);
};
