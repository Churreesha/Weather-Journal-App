// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


//// Setup Server
const port = 2025;

const server = app.listen(port, () => {
    console.log(`server successfully runs on port: ${port}`)
})



////get
app.get('/get', dataSending);

function dataSending(req, res) {
    console.log(projectData);
    res.send(projectData);

}

/////post
app.post('/post', dataPost);

function dataPost(req, res) {
    projectData.date = req.body.date;
    projectData.temperature = req.body.temperature;
    projectData.feelings = req.body.feelings;

    console.log(projectData);
    res.send(projectData);

}
