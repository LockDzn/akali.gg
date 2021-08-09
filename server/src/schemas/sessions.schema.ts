import { mongoose } from '../services/mongoose'

const session = new mongoose.Schema({
  list: [
    {
      ip: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

const Session = mongoose.model('sessions', session)

export default Session
