const mongoose = require('mongoose')

const thoughtSchema = new mongoose.Schema({
  thoughtName: String,
})

const Thought = mongoose.model('Thought', thoughtSchema)

async function run() {
  if (mongoose.connection.readyState != 1) {
    await mongoose.connect(
      'mongodb+srv://minelliot48:TuX4wiyYSrcqsAMS@cluster0.90muosv.mongodb.net/Cluster0'
    )
  }
  const result = await Thought.find({}, 'thoughtName')
  console.log(result)
}

run().catch(console.error)

module.exports = Thought
