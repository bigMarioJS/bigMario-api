const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/sensorData.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');


const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
// router.param('userId', controller.load);


router
  .route('/')
  .post(authorize(), controller.create);

router
  .route('/getpast24hours')
  .get(authorize(), controller.getPast24Hours);router

router
  .route('/last')
  .get(authorize(), controller.last);


module.exports = router;
