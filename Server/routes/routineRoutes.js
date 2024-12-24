const express = require('express');
const router = express.Router();
const { 
  createRoutine, 
  getAllRoutines, 
  getRoutineById, 
  updateRoutine, 
  deleteRoutine 
} = require('../controllers/routineController');

router.post('/create', createRoutine);          
router.get('/all', getAllRoutines);            
router.get('/:routineId', getRoutineById);     
router.put('/:routineId', updateRoutine);       
router.delete('/:routineId', deleteRoutine);    

module.exports = router;
