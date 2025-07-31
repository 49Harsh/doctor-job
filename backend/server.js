const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// API Routes
app.get('/api/doctors', (req, res) => {
  try {
    const doctorsData = fs.readFileSync(path.join(__dirname, 'data', 'doctors.json'), 'utf8')
    const doctors = JSON.parse(doctorsData)
    res.json(doctors)
  } catch (error) {
    console.error('Error reading doctors data:', error)
    res.status(500).json({ error: 'Failed to fetch doctors data' })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
