// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send(
    `<h1> Welcome to Amanuel's Quote Server!<h1>  
    <p> To get all quotes  use: /quotes </p>  
    <p> To get random quotes  use: /quotes/random</p>  
    <p> To search any term in the  quotes or author use /quotes/search?term=search-term </p>  
    `
  );
});

//START OF YOUR CODE...
app.get("/quotes", function (request, response) {
  response.json(quotes);
});

app.get("/quotes/random", function (request, response) {
  response.json(pickFromArray(quotes));
});

app.get("/quotes/search", function (request, response) {
  let term = request.query.term.toLowerCase();
  let filteredQuotes = quotes.filter(
    (words) =>
      words.quote.toLowerCase().includes(term) ||
      words.author.toLowerCase().includes(term)
  );
  response.json(filteredQuotes);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
