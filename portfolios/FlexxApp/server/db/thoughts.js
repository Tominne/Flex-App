const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
  title: String,
})

const Thought = mongoose.model('Thought', thoughtSchema)
