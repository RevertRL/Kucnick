const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/cars');

router.post('/new', carCtrl.createApp);
router.get('/:id', carCtrl.getAllApp);
router.get('/:id/show', carCtrl.getAppById);
router.put('/:id/show', carCtrl.updateApp);
router.delete('/:id', carCtrl.deleteApp);

module.exports = router;


