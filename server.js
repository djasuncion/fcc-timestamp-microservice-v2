// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp", (req, res) => {
  const unix = new Date().getTime();
  const utc = new Date().toUTCString();
  res.json({
    unix,
    utc
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  const data = req.params.date_string;
  const date = new Date(data);
  const isUnix = /\d{5,}/.test(req.params.date_string) ? true : false;
  const isValid = date.toString() === "Invalid Date" ? false : true;

  if (isUnix) {
    const unixDate = parseInt(data);

    res.json({
      unix: unixDate,
      utc: new Date(unixDate).toUTCString()
    });
  } else if (isValid) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    res.json({
      error: 'Invalid Date'
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
