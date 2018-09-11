const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const app = express();

// Routes
const accountRoutes = require('./routes/account');
const collectionRoutes = require('./routes/collection');

app.set('view engine', 'ejs');
app.set('views', './dist/views');
app.use(express.static('/dist'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('express-session')({
  secret: 'my name is heman',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb://localhost/vinyl_collection', { useNewUrlParser: true });

// Express Router routes
app.use(accountRoutes);
app.use('/collection', collectionRoutes);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('Listening on port 3000'));
