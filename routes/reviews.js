const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campground");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');
const reveiws = require('../controllers/reviews.js');

const ExpressError = require("../utils/ExpressError.js");
const catchAsync = require("../utils/catchAsync");


router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(reveiws.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reveiws.deleteReview)
);

module.exports = router;
