const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/routine/:routineId', userController.viewRoutine);
router.post('/start-routine', userController.startRoutine);
router.post('/update-progress', userController.updateProgress);
router.get('/routine-progress/:userId/:routineId', userController.getRoutineProgress);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/allusers', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.delete('/:userId', userController.deleteUser);
module.exports = router;
