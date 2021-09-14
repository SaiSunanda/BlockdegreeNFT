const router = require('express').Router()
const token =require('../controllers/nftnodes.js')

//for getting token symbol
router.post('/mintnft',token.mintnft)

//get account balance for particular address
router.post('/transfernft',token.transfernft)

//transfer token to another account
router.post('/setTokenURI',token.setTokenURI)

module.exports = router