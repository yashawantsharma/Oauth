require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors')

const passport = require('./config/passport');
const userRoute = require('./routes/userRoute');

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log("error connecting to database", err);
    });

app.use('/User', userRoute);

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});