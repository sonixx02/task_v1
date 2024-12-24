const Progress = require('../models/Progress');
const Routine = require('../models/Routine');
const User = require('../models/User');


module.exports.startRoutine = async (req, res) => {
  try {
    const { userId, routineId } = req.body;

    
    const routine = await Routine.findById(routineId);
    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    
    const existingProgress = await Progress.findOne({ user: userId, routine: routineId });
    if (existingProgress) {
      return res.status(400).json({ message: "Routine already started" });
    }

    
    const progress = new Progress({
      user: userId,
      routine: routineId,
      completedWeeks: [],
      achievedBenefits: [],
      remindersSent: false,
    });

    await progress.save();
    res.status(201).json({ message: "Routine started successfully", progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.updateProgress = async (req, res) => {
  try {
    const { userId, routineId, weekNumber } = req.body;

   
    const progress = await Progress.findOne({ user: userId, routine: routineId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

  
    if (progress.completedWeeks.includes(weekNumber)) {
      return res.status(400).json({ message: `Week ${weekNumber} already completed` });
    }


    progress.completedWeeks.push(weekNumber);

    
    const routine = await Routine.findById(routineId);
    const benefit = routine.benefits.find(benefit => benefit.weekNumber === weekNumber);
    if (benefit) {
      progress.achievedBenefits.push(benefit.benefitDescription);
    }

   
    progress.lastUpdated = Date.now();
    await progress.save();

    res.status(200).json({
      message: `Progress updated for Week ${weekNumber}`,
      progress
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getRoutineProgress = async (req, res) => {
  try {
    const { userId, routineId } = req.params;

    const progress = await Progress.findOne({ user: userId, routine: routineId });

    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getAllProgressByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const progress = await Progress.find({ user: userId }).populate('routine', 'name duration');

    if (progress.length === 0) {
      return res.status(404).json({ message: "No progress found for this user" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
