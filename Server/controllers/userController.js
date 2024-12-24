const Routine = require('../models/Routine');
const Progress = require('../models/Progress');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  signup: async (req, res) => {
    try {
      const { username, email, password, gender, age, preferences } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        gender,
        age,
        preferences
      });

      await newUser.save();
      res.status(201).json({ 
        message: "User registered successfully", 
        user: { 
          id: newUser._id, 
          username: newUser.username 
        } 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || "fallback_secret", 
        { expiresIn: "1h" }
      );

      res.status(200).json({ 
        message: "Login successful", 
        token,
        user: { 
          id: user._id, 
          username: user.username 
        } 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId).select("-password");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      await User.findByIdAndDelete(userId);
      
      
      await Progress.deleteMany({ user: userId });
      
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewRoutine: async (req, res) => {
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
  },

  startRoutine: async (req, res) => {
    try {
      const { userId, routineId } = req.body;

      const progress = new Progress({
        user: userId,
        routine: routineId,
        completedWeeks: [],
        achievedBenefits: []
      });

      await progress.save();
      res.status(201).json({ 
        message: "Routine started successfully", 
        progress 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProgress: async (req, res) => {
    try {
      const { userId, routineId, weekNumber } = req.body;
      const progress = await Progress.findOne({ user: userId, routine: routineId });

      if (!progress) {
        return res.status(400).json({ message: "Progress not found" });
      }

      progress.completedWeeks.push(weekNumber);
      progress.achievedBenefits.push(`Week ${weekNumber} benefits achieved`);
      progress.lastUpdated = Date.now();

      await progress.save();
      res.status(200).json({ 
        message: "Progress updated", 
        progress 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRoutineProgress: async (req, res) => {
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
  }
};