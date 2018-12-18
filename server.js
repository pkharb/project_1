require('dotenv').config();

const
    express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    ejsLayouts = require('express-ejs-layouts'),
    flash = require('connect-flash'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoDBStore = require('connect-mongodb-session')(session),
    passport = require('passport'),
    passportConfig = require('./services/auth'),
    methodOverride = require('method-override'),
    mongoConnectionString = process.env.MONGOD_URI,
    usersRouter = require('./routers/users.js'),
    goalsRouter = require('./routers/goalsRouter.js');

// database connection
mongoose.connect(mongoConnectionString, { useNewUrlParser: true }, err => {
    console.log(err || `Connected to MLab (Project_1)`);
});

// store session information as a 'sessions' collection in Mongo
const store = new MongoDBStore({
    uri: mongoConnectionString,
    collection: 'sessions'
});

// middleware
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(methodOverride('_method'));

// ejs configuration
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use(session({
    secret: 'abcde',
    cookie: { maxAge: 60000000},
    resave: true,
    saveUninitialized: false,
    store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.currentUser = req.user;
    app.locals.loggedIn = !!req.user;

    next();
});

// root route
app.get('/', (req,res) => {
    res.render('index');
});

app.use('/users', usersRouter);
app.use('/users/profile', goalsRouter)
// app.use('/user/goals', goalsRouter);


// listen to port
app.listen(PORT, err => {
    console.log(err || `Connected to PORT: ${PORT}`);
});




