var express = require('express');
var Patient = require("./models/Patient");
var bodyParser = require('body-parser');

var app = express();
var mongoURL = " mongodb://kangoobear:password@ds041934.mongolab.com:41934/kangoobear";

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json({
  type: ['application/json', 'application/vnd.api+json']
}))

app.get("/patients", function(req, res) {
  Patient.find(function(err, patients) {
    res.json({
      err: err,
      patients: patients
    })
  })
});

app.post("/patients", function(req, res) {
  res.send(req.body);
  var patient = new Patient(req.body.modelData);
  patient.save(function(err, patient) {
    res.json({
      err: err,
      patient: patient
    })
  })
});