require('dotenv').config({ path: __dirname + '/../.env' });
const cities = require('./cities');
const mongoose = require('mongoose');
const { places, descriptors } = require('./seedHelper'); 
const Campground= require('../models/campground');

const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI);

const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title:` ${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur',
            price
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})