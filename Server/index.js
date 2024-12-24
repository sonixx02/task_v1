const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();


const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const routineRoutes = require('./routes/routineRoutes'); 
const progressRoutes = require('./routes/progressRoutes'); 

const app = express();


app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://soni02:soni02@cluster0.jhiuwtl.mongodb.net", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/admin', adminRoutes);         
app.use('/user', userRoutes);           
app.use('/routines', routineRoutes);    
app.use('/progress', progressRoutes);  

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
