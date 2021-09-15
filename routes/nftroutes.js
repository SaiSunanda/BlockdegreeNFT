const router = require('express').Router()
const token =require('../controllers/nftnodes.js')

//for getting token symbol
router.post('/mintnft',token.mintnft)

module.exports = router