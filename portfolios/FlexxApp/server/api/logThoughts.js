const Thought = require('../db/thoughts.js')

async function addThought(req, res) {
  try {
    const { title, description, user } = req.body
    const newThought = new Thought({ title, description, user })
    await newThought.save()
    res.status(201).json(newThought)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

module.export = { addThought }
