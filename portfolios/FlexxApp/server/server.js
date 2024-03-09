const express = require('express')
const app = express()
const thoughtRoutes = require('./routes/thoughtRoutes')
const pfpRoutes = require('./routes/pfpRoutes')
const cors = require('cors')
app.use(express.json())
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//middleware
app.use(cors(corsOptions))

app.use('/api', thoughtRoutes)
//app.use('/api', pfpRoutes)

const PORT = process.env.PORT || 3002

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
