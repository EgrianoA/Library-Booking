var express = require('express');
var router = express.Router();
const bookingController = require('../controllers/booking/booking')
const checkRequest = require("../helpers/check-request")

/* GET users listing. */
router.post('/set-schedule', bookingController.scheduleBook);
router.post('/schedule-list', checkRequest.headers, bookingController.getBookScheduleList);
router.get('/find/:bookingId', bookingController.getBookScheduleByBookingID);

module.exports = router;
