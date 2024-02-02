const express = require('express');
const router = express.Router();
const { authHandler,  callbackHandler,  finalHandler,  homeRootHandler } = require("../controller/APIhandler"); 




router.get('/auth/shopify', authHandler);

// auth/shopifys [ this route will hit first and log the user ] => shopify will take the user to the install page => after sucssfull installation we will have user data in our console and  shopify will redirect to the given URL [/auth/shopify/callback] when it will follow this whole process i have redirected the user to '/' in the finalHandler redirect user to the home root.

router.get('/auth/shopify/callback', callbackHandler, finalHandler );


router.get('/', homeRootHandler);


module.exports = router