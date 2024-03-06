const express = require('express')
const app = express()
const thoughRoutes = require('./routes/thoughtRoutes')

const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())
app.use('/api', thoughRoutes) // Parse JSON requests

// Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!')
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
