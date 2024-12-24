const Routine = require('../models/Routine');
const Progress = require('../models/Progress');


module.exports.createRoutine = async (req, res) => {
  try {
    const { name, duration, steps, milestones, benefits } = req.body;

    const newRoutine = new Routine({
      name,
      duration,
      steps,
      milestones,
      benefits,
      createdBy: req.admin.id, 
    });

    await newRoutine.save();
    res.status(201).json({
      message: "Routine created successfully",
      routine: newRoutine
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getAllRoutines = async (req, res) => {
  try {
    const routines = await Routine.find()
      .populate('createdBy', 'email');
    res.status(200).json(routines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.getRoutineById = async (req, res) => {
  try {
    const { routineId } = req.params;
    const routine = await Routine.findById(routineId);

    if (!routine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(200).json(routine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports.updateRoutine = async (req, res) => {
  try {
    const { routineId } = req.params;
    const { name, duration, steps, milestones, benefits } = req.body;

    const updatedRoutine = await Routine.findByIdAndUpdate(
      routineId,
      { name, duration, steps, milestones, benefits },
      { new: true } 
    );

    if (!updatedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(200).json({
      message: "Routine updated successfully",
      routine: updatedRoutine
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteRoutine = async (req, res) => {
  try {
    const { routineId } = req.params;

    const deletedRoutine = await Routine.findByIdAndDelete(routineId);

    if (!deletedRoutine) {
      return res.status(404).json({ message: "Routine not found" });
    }

    res.status(200).json({ message: "Routine deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
