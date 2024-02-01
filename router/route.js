const express = require('express');
const router = express.Router();
const { authHandler,  callbackHandler,  finalHandler,  homeRootHandler } = require("../controller/APIhandler"); 




router.get('/auth/shopify', authHandler);


router.get('/auth/shopify/callback', callbackHandler, finalHandler );
 

router.get('/', homeRootHandler);


module.exports = router