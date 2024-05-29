const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/appointments');

router.post('/', carCtrl.createApp);
router.get('/about', carCtrl.about);
router.get('/', carCtrl.getAllApp);
router.get('/new', carCtrl.renderNewAppointmentForm);
router.get('/:id', carCtrl.getAppById);
router.put('/:id', carCtrl.updateApp);
router.delete('/:id', carCtrl.deleteApp);

module.exports = router;
