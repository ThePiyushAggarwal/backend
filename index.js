require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/noteModel')

app.use(cors())

app.use(express.static('build'))

// json-parser
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Notes App backend</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

// app.delete('/api/notes/:id', (request, response) => {
//   Note.findById(request.params.id).then((note) => {
//     response.json(note)
//   })
// })

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note.save().then((savedNote) => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
