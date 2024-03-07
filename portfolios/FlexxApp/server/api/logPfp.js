const Pfp = require('../db/pfp.js')

async function addPfp(req, res) {
  try {
    const { pfp, userId } = req.body
    const newPfp = new Pfp({ pfp, userId }) // include userId when creating a new Pfp
    const savedPfp = await newPfp.save()
    res.status(201).json(savedPfp)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
}

module.exports = { addPfp }
