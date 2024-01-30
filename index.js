const express = require('express');
const passport = require('passport');
const ShopifyStrategy = require('passport-shopify').Strategy;
const { API_KEY, API_SECRET_KEY } = require("./constant");

const app = express();


passport.use(
  new ShopifyStrategy(
    {
      clientID: API_KEY, 
      clientSecret: API_SECRET_KEY,
      callbackURL: 'http://localhost:7000/auth/shopify/callback',
      // shop: 'e33638.myshopify.com',

      scope: ['read_products', 'write_products']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken,refreshToken,profile);
      return done(null, profile);
    }
  )  
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(require('express-session')({ secret: API_SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/shopify', (req, res, next) => { 
  console.log(req.url);
   passport.authenticate('shopify', {
    scope: [ 'read_products' ],

  })
});


app.get('/auth/shopify/callback', (req, res, next) => {
  console.log("Incoming Shopify callback request:", req.url);
  console.log("Request query:", req.query);
  console.log("Request body:", req.body);
  passport.authenticate('shopify', { failureRedirect: '/' })(req, res, next);
}, (req, res) => {
  console.log("User authenticated:", req.user);
  res.redirect('/');
});
 

app.get('/', (req, res) => {
  
    if (req.isAuthenticated()) {
      const accessToken = req.user.accessToken;
      // Perform actions with the access token
      console.log(accessToken);
      res.send(`Authenticated! Access Token: ${accessToken}`);
    } else {
      res.send('Not authenticated!');
    }
  });
  



app.listen(7000, () => {
  console.log('Server listening on port 7000');
});
