const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { adminAuthMiddleware } = require('../middlewares/authMiddleware'); 

router.post('/create-routine', adminAuthMiddleware, adminController.createRoutine);
router.get('/routines', adminAuthMiddleware, adminController.getAllRoutines);
router.put('/update-routine/:routineId', adminAuthMiddleware, adminController.updateRoutine);
router.delete('/delete-routine/:routineId', adminAuthMiddleware, adminController.deleteRoutine);
router.post('/signup', adminController.signup);
router.post('/logout', adminController.logout);
router.post('/login', adminController.login);
router.get('/alladmin', adminController.getAllAdmins);

module.exports = router;
