const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  referringSources: [{
    source: String,
    count: Number
  }],
  deviceTypes: [{
    type: String,
    count: Number
  }],
  geoLocations: [{
    country: String,
    count: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);