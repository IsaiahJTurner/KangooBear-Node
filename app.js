var express = require('express');
var Patient = require("./models/Patient");
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();
var mongoURL = "mongodb://kangoobear:password@ds041934.mongolab.com:41934/kangoobear";
var mongoose = require('mongoose');
mongoose.connect(mongoURL);
app.set('port', (process.env.PORT || 6969));
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json({
  type: ['application/json', 'application/vnd.api+json']
}));

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("login");
});

app.get("/api", function(req, res) {
  res.json({
    goodCode: false
  })
});

app.get("/api/patients", function(req, res) {
  Patient.find(function(err, patients) {
    res.json({
      err: err,
      patients: patients
    })
  })
});

app.post("/api/patients", function(req, res) {
  var patient = new Patient(req.body.modelData);
  patient.save(function(err, patient) {
    res.json({
      err: err,
      patient: patient
    })
  })
});

app.get("/reset", function(req, res) {
  Patient.remove({}, function(err, updated) {
    res.json({
      err: err,
      updated: updated
    })
  })
})
app.listen(app.get('port'), function() {
  console.log('Started!')
});
