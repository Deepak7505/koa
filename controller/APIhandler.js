const passport = require('passport');


const authHandler = (req, res, next) => {
    console.log('came to the authhandler');
    passport.authenticate('shopify', {
      callbackURL: 'http://localhost:7000/auth/shopify/callback',
      scope: ['read_products','write_orders' , 'read_all_orders'] 
    })(req, res, next);
  };



  const callbackHandler = (req, res, next) => {
    console.log('came to the callback handler')
    passport.authenticate('shopify', { failureRedirect: '/' })(req, res, next);
  };



  const finalHandler = (req, res) => {
    console.log("User authenticated:", req.user);
  
    if (req.query.error) {
      console.error('Authentication error:', req.query.error);
      return res.redirect('/');
    }
  
    res.redirect('/');
  };


const homeRootHandler = (req, res) => {
  
    if (req.isAuthenticated()) {
      const accessToken = req.user.accessToken;
      // Perform actions with the access token
      console.log(accessToken);
      res.send(`Authenticated! Access Token: ${accessToken}`);
    } else {
      res.send('Not authenticated!');
    }
  }


module.exports = {
    authHandler,
    callbackHandler,
    finalHandler,
    homeRootHandler
}