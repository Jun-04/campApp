const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

//routes import
const campgrounds = require('./routes/campgrounds.js');
const reviews = require('./routes/reviews.js')

// ecrypte URL
require('dotenv').config()
const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

//validation middlewear
const validateCampground = (req, res, next) => {
const {error} = campgroundSchema.validate(req.body);
if(error){
    const msg = error.details.map(el => el.message).join(', ')
    throw new ExpressError(msg, 400)
} else {
    next();
}
}
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.valid(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//imported routes
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home')
});

//for 404 page
app.all(/(.*)/, (req, res, next) => {
next(new ExpressError('page not found', 404))});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'smth went wrong!'
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
console.log('serving on port 3000')
})