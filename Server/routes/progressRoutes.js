const express = require('express');
const router = express.Router();

const { 
  startRoutine,         
  updateProgress,       
  getRoutineProgress    
} = require('../controllers/progressController');


router.post('/routines/:routineId/progress/start', startRoutine);

router.put('/routines/:routineId/progress', updateProgress);


router.get('/routines/:routineId/progress', getRoutineProgress);

module.exports = router;
