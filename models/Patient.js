var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PatientSchema = new Schema({
  access_token: {
    type: String
  },
  scope: {
    type: String
  },
  name: {
    type: String
  },
  dosage: {
    type: String,
    default: "100IU"
  },
  phone: {
    type: String
  },
  notes: {
    type: String
  },
  address: {
    type: String
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});

PatientSchema.pre('save', function(next) {
  now = new Date();
  this.updatedAt = now;
  if (this.phone && this.phone.length === 10) {
    var first = this.phone.substring(0, 3);
    var second = this.phone.substring(3, 6);
    var third = this.phone.substring(6, 10);
    this.phone = first + "-" + second + "-" + third;
  }
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('Patient', PatientSchema);
