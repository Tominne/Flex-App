const express = require('express')
const router = express.Router()
const { addThought } = require('../api/logThoughts.js')
const Thought = require('../db/thoughts.js')

router.post('/thoughts', addThought)

router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find({})
    res.status(200).json(thoughts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = router
