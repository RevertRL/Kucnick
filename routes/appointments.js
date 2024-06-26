const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/appointments');

router.get('/', carCtrl.index);
router.get('/about', carCtrl.about);
router.post('/', carCtrl.createApp);
router.get('/new', (req, res) => res.render('appointments/new'));
router.get('/:id', carCtrl.show);
router.put('/:id', carCtrl.updateApp);
router.delete('/:id', carCtrl.deleteApp);
router.post('/:id', carCtrl.deleteApp);

module.exports = router;

