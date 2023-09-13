const express = require('express');
const app = express();

// Middleware to log the request body for a specific route and HTTP method
app.use('/data', (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    let wholeData = '';

    req.on('data', (dataChunk) => {
      wholeData += dataChunk;
    });

    req.on('end', () => {
      console.log(wholeData);
      res.send('Data received successfully!');
      next(); // Continue processing the request

    });
  } else {
    next(); // For other HTTP methods, continue processing the request without logging
  }
});

// Define a GET route
app.get('/', (req, res) => {
  res.send('Hello, World! this server check load how much can sustain on a perticular time hits');
});
app.get('/detail', (req, res) => {
  res.send({ "name": { title: "Mr.", fName: "Pankaj", lName: "Kumar" }, "email": "pankaj@gmail.com", "phoneNumber": "8802345667" });
});
app.get('/more', (req, res) => {
  res.send({ "Company": { Type: "Information Technology", Work: "Backend Developer", Skill: "Nodejs , Express , Mongodb" }, "Address": "Noida Utter Pradesh", "tier": "Middleware" });
});

module.exports = app;
