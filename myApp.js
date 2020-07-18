
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/', function(req, res, next){
  console.log(req.method+" "+req.path+" "+" - "+req.ip);
  next();
});


app.use("/", 
      bodyParser.urlencoded({extended:false}) 
);

app.use(bodyParser.json());


console.log("Hello World");

// app.get("/", function(req, res) {
//   res.send('Hello Express');
// });


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/", express.static(__dirname + "/public"));

app.get('/json', function(req, res) {
  let message = "Hello json"
  if (process.env.MESSAGE_STYLE === 'uppercase' ) {
    message = "HELLO JSON"
  } 
  res.json({
    "message": message
  });
});

app.get("/now", function(req, res, next) {
  req.time = new Date().toString();
  next();
  },
  function(req, res){
     res.json({"time":req.time}); 
  }
);


app.get("/:word/:echo", function(req, res) {
  res.json({"echo":req.params.word})
  }
);


app.get("/name", function(req, res) {
  res.json({"name":req.query.first+" "+req.query.last})
  }
);

  
app.post("/name", function(req, res) {
  res.json({"name":req.body.first+" "+req.body.last})
  }
);

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

