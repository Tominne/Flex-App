const Thought = require('../db/thoughts.js')

async function addThought(req, res) {
  try {
    const { thoughtName } = req.body
    const newThought = new Thought({ thoughtName })
    const savedThought = await newThought.save()
    res.status(201).json(savedThought)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

module.exports = { addThought }
