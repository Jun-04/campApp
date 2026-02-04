const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds.js");
const catchAsync = require("../utils/catchAsync");
//image file upoad
const multer =require('multer');
const { storage } = require('../cloudinary/index.js');
const upload = multer({storage});
// stored middle wares in a file.
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware.js");

const ExpressError = require("../utils/ExpressError");
const Campground = require("../models/campground");

//route() organize the same prefix of path
router
  .route("/")
  .get(catchAsync(campgrounds.index))
  //.post(isLoggedIn,validateCampground,catchAsync(campgrounds.createCAmpground));
  .post(isLoggedIn, upload.array('image'),validateCampground, catchAsync (campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(isLoggedIn, catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image'),
        validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
