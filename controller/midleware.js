const ShopifyStrategy = require('passport-shopify').Strategy;
const { API_KEY, API_SECRET_KEY } = require("../constant");

const passportStrategy = new ShopifyStrategy(
    {
      clientID: API_KEY, 
      clientSecret: API_SECRET_KEY,
      callbackURL: 'http://localhost:7000/auth/shopify/callback',
      shop: '5052e1-4.myshopify.com',
      scope: ['read_products','write_orders' , 'read_all_orders'] 
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken,refreshToken,profile);
      return done(null, profile); 
    }
  );




  module.exports = passportStrategy