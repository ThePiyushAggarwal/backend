const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to the database')

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

// formatting the returned object by database
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Even though the _id property of Mongoose objects looks like a string, it is in fact an object.
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Note', noteSchema)
