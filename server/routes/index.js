const express = require('express')
const router = new express.Router()

const dataRoutes = require('./data')
router.use('/data', dataRoutes)

module.exports = router
