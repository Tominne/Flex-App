const express = require('express')
const router = express.Router()
const { addThoughts } = require('../api/logThoughts.js')

router.post('/thoughts', addThoughts)

module.exports = router
