const ShopifyStrategy = require('passport-shopify').Strategy;
const { API_KEY, API_SECRET_KEY } = require("../constant");

const passportStrategy = new ShopifyStrategy(
    {
      clientID: API_KEY, 
      clientSecret: API_SECRET_KEY, 
      callbackURL: 'http://localhost:7000/auth/shopify/callback',
      shop: 'neerajstore123123.myshopify.com',
      scope: ['read_products', 'read_all_orders']
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('accesstoken is ', accessToken , ' refresh token is  ' , refreshToken, ' profiile is ', profile);
      return done(null, profile); 
    }
  );

// login with shopify => shop name => auth/shopify


  module.exports = passportStrategy