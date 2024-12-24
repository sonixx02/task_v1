const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number },
  steps: [
    {
      week: { type: Number, required: true },
      description: { type: String, required: true },
      _id: false // Disable auto-generated _id for steps
    }
  ],
  benefits: [
    {
      week: { type: Number, required: true },
      benefit: { type: String, required: true },
      _id: false // Disable auto-generated _id for benefits
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;
