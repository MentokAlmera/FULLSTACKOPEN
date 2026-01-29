const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'"],
    },
  })
)

app.use(express.static(path.join(__dirname, 'dist')))

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" }
]

const generateId = () => Math.floor(Math.random() * 1000000).toString()

app.get('/api/persons', (req, res) => res.json(persons))

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(p => p.id === req.params.id)
  if (person) res.json(person)
  else res.status(404).json({ error: 'Person not found' })
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name) return res.status(400).json({ error: 'name is missing' })
  if (!number) return res.status(400).json({ error: 'number is missing' })
  if (persons.some(p => p.name === name))
    return res.status(400).json({ error: 'name must be unique' })

  const newPerson = { id: generateId(), name, number }
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
    <div>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
    </div>
  `)
})
app.use((req, res) => res.status(404).json({ error: 'unknown endpoint' }))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
