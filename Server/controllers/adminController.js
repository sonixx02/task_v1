const Routine = require('../models/Routine');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = {
  signup: async (req, res) => {
    try {
      const { email, password } = req.body;

      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      
      if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

    
      if (password.length < 4) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
      }

      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

     
      const hashedPassword = await bcrypt.hash(password, 12);

      const newAdmin = new Admin({
        email,
        password: hashedPassword,
        createdAt: new Date()
      });

      await newAdmin.save();
      
      res.status(201).json({ 
        message: "Admin registered successfully", 
        adminId: newAdmin._id,
        email: newAdmin.email
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: "Internal server error during signup" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

     
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

     
      if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined');
        return res.status(500).json({ message: "Server configuration error" });
      }

      const token = jwt.sign(
        { 
          id: admin._id, 
          email: admin.email 
        },
        process.env.JWT_SECRET,
        { 
          expiresIn: "1h",  
        }
      );

      res.status(200).json({ 
        message: "Login successful", 
        token,
        adminId: admin._id
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Internal server error during login" });
    }
  },

  logout: async (req, res) => {
    try {
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find()
        .select("-password -__v")  
        .lean();  
      res.status(200).json(admins);
    } catch (error) {
      console.error('Get all admins error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  createRoutine: async (req, res) => {
    try {
      const { name, duration, steps, milestones, benefits } = req.body;

      
      if (!name || !steps || !Array.isArray(steps) || steps.length === 0) {
        return res.status(400).json({ message: "Invalid routine data" });
      }

      const newRoutine = new Routine({
        name,
        duration: duration || null,
        steps,
        milestones: milestones || [],
        benefits: benefits || [],
        createdBy: req.admin._id, 
        createdAt: new Date()
      });

      await newRoutine.save();
      res.status(201).json({ 
        message: "Routine created successfully", 
        routine: newRoutine 
      });
    } catch (error) {
      console.error('Create routine error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getAllRoutines: async (req, res) => {
    try {
      const routines = await Routine.find()
        .populate('createdBy', 'email')
        .lean();
      res.status(200).json(routines);
    } catch (error) {
      console.error('Get all routines error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  updateRoutine: async (req, res) => {
    try {
      const { routineId } = req.params;
      const { name, duration, steps, milestones, benefits } = req.body;

      
      if (!routineId) {
        return res.status(400).json({ message: "Routine ID is required" });
      }

      const updatedRoutine = await Routine.findByIdAndUpdate(
        routineId,
        { 
          name, 
          duration, 
          steps, 
          milestones, 
          benefits,
          updatedAt: new Date()
        },
        { 
          new: true,  
          runValidators: true  
        }
      );
      
      if (!updatedRoutine) {
        return res.status(404).json({ message: "Routine not found" });
      }

      res.status(200).json({ 
        message: "Routine updated successfully", 
        routine: updatedRoutine 
      });
    } catch (error) {
      console.error('Update routine error:', error);
      res.status(500).json({ error: error.message });
    }
  },

  deleteRoutine: async (req, res) => {
    try {
      const { routineId } = req.params;

      if (!routineId) {
        return res.status(400).json({ message: "Routine ID is required" });
      }

      const deletedRoutine = await Routine.findByIdAndDelete(routineId);
      
      if (!deletedRoutine) {
        return res.status(404).json({ message: "Routine not found" });
      }

      res.status(200).json({ message: "Routine deleted successfully" });
    } catch (error) {
      console.error('Delete routine error:', error);
      res.status(500).json({ error: error.message });
    }
  }
};