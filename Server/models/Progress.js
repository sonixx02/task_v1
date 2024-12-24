const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  routine: { type: mongoose.Schema.Types.ObjectId, ref: 'Routine', required: true },
  completedWeeks: { type: [Number], default: [] }, 
  achievedBenefits: { type: [String], default: [] }, 
  remindersSent: { type: Boolean, default: false }, 
  lastUpdated: { type: Date, default: Date.now }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;
