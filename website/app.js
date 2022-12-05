/* Global Variables */
console.log('Hello! This is my weather journal app enjoy your stay!');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=baf2cd29d901e45ce92952c3c9ec7623&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();

const generate = document.querySelector('#generate');

generate.addEventListener('click', () => {
  const zipCode = document.querySelector('#zip').value;
  const content = document.querySelector('#feelings').value;

  getInfo(`${baseURL}${zipCode}${apiKey}`)
  .then(function (userInfo) {

    postData('/post', { date: newDate,
                        temperature:userInfo.main.temperature,
                        feelings:content })
  }).then(function (newData) {
    console.log('This is the user data',newData);
    renewUI()
  })

})

/* GET API Data */
const getInfo = async (baseURL, zipCode, apiKey) => {

  const result = `${baseURL}${zipCode}${apiKey}`;
  console.log(result);
  const req = await fetch(result);
  try {
    const userInfo = await req.json();
    console.log("the user info is: ", userInfo);
    return userInfo;
  }
  catch (error) {
    console.log("error", error);
  }
};

// async function for post data
const postData = async (baseURL = "https://api.openweathermap.org/data/2.5/weather?zip= ", data = {}) => {
  const req = await fetch(baseURL, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });
  try {
    const newData = await req.json();
    const temperature = newData.main.temperature;
    console.log("We got the data now", newData);
    return ({ temperature: temperature.newData.temperature });
  } catch (error) {
    console.log("error", error);
  }
};

// Updating UI Dynamically
const renewUI = async () => {
  const req = await fetch('/get');

  try {
   const renewedData = await req.json();
   console.log('This is the current data', renewedData);
   document.querySelector('#date').innerHTML = renewedData.date;
   document.querySelector('#temp').innerHTML = renewedData.temperature;
   document.querySelector('#content').innerHTML = renewedData.feelings;


  } catch (error) {
    console.log("error", error);
  }
};


