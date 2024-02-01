const express = require('express');
const passport = require('passport');
const { API_SECRET_KEY } = require("./constant");
const passportStrategy = require("./controller/midleware");



const app = express();

passport.use(passportStrategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(require('express-session')({ secret: API_SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
 

app.use(require("./router/route"));


app.listen(7000, () => {
  console.log('Server listening on port 7000');
});
