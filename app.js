const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require('./src/config/connectDB');

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}


const homeRouter = require('./src/routes/home-route');
const aboutRouter = require('./src/routes/about-route');
const contactRouter = require('./src/routes/contact-route');
const serviceRouter = require('./src/routes/service-route');
const projectRouter = require('./src/routes/project-route');
const teamsRoute = require('./src/routes/teams-route');

const app = express();
connectDB();


app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/images', express.static('/public/images'));



app.use('/home', homeRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/service', serviceRouter);
app.use("/project", projectRouter);
app.use('/teams', teamsRoute);

module.exports = app;
