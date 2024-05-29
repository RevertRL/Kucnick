const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/cars');

router.post('/appointments', carCtrl.createAppointment);
router.get('/appointments', carCtrl.getAppointments);
router.get('/appointments/:id', carCtrl.getAppointmentById);
router.put('/appointments/:id', carCtrl.updateAppointment);
router.delete('/appointments/:id', carCtrl.deleteAppointment);

module.exports = router;


