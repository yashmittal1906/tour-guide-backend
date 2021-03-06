const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const hotelController = require('../controller/hotelController');

router
  .route('/hotels-within/:distance/center/:latlng')
  .get(hotelController.getHotelsWithin);

router.get('/getHotelDetails/:id', hotelController.getHotelDetails)
router.get('/getHotelCurrentBooking/:id', authController.protect, hotelController.getHotelCurrentBooking)
router.get('/getHotelPastBooking/:id', authController.protect, hotelController.getHotelPastBooking)
router.get('/getAllHotels', hotelController.getAllHotels)
router.get('/getHotelReviews/:id', hotelController.getHotelReviews)
module.exports = router;
