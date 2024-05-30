const express = require('express');
const router = express.Router();
const carCtrl = require('../controllers/appointments');

router.get('/', carCtrl.index);
router.get('/about', carCtrl.about);
router.post('/', carCtrl.createApp); // POST to /appointments to create new
router.get('/new', (req, res) => res.render('appointments/new')); // Render form to create new
router.get('/:id', carCtrl.show);
router.put('/:id/update', carCtrl.updateApp);
router.post('/:id', carCtrl.deleteApp);

module.exports = router;

