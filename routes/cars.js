const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/cars');

router.post('/appointments', carCtrl.createApp);
router.get('/appointments', carCtrl.getAllApp);
router.get('/appointments/:id', carCtrl.getAppById);
router.put('/appointments/:id', carCtrl.updateApp);
router.delete('/appointments/:id', carCtrl.deleteApp);

module.exports = router;


