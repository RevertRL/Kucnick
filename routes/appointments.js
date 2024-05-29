const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/appointments');

router.post('/new', carCtrl.createApp);
router.get('/:id', carCtrl.getAppById);
router.get('/about', carCtrl.about);
router.get('/', carCtrl.getAllApp);
router.put('/:id', carCtrl.updateApp);
router.delete('/:id', carCtrl.deleteApp);

module.exports = router;
