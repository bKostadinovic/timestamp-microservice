// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Define the /api/:date endpoint
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  // Check if the dateParam is a valid Unix timestamp (number)
  if (dateParam && !isNaN(dateParam)) {
    // If it's a valid Unix timestamp, convert it
    date = new Date(parseInt(dateParam));
  } else if (dateParam) {
    // If it's a valid date string, create a new Date object
    date = new Date(dateParam);
  } else {
    // If no date param is given, use the current date
    date = new Date();
  }

  // If the date is invalid, return error message
  if (date == "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the unix and utc time
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
