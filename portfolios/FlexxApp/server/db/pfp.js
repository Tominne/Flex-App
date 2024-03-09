/*const mongoose = require('mongoose')

const pfpSchema = new mongoose.Schema({
  pfp: String,
})

const Pfp = mongoose.model('Pfp', pfpSchema)

async function run() {
  if (mongoose.connection.readyState != 1) {
    await mongoose.connect(
      'mongodb+srv://minelliot48:TuX4wiyYSrcqsAMS@cluster0.90muosv.mongodb.net/Cluster0'
    )
  }
  const result = await Pfp.find({}, userId)
  console.log(result)
}

run().catch(console.error)

module.exports = Pfp
*/
