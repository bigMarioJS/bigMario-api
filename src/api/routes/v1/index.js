const express = require('express');
const sensorData = require('./sensorData');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */

router.use('/sensorData', sensorData);
router.use('/getLast', sensorData);

module.exports = router;
