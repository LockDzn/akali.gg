import mongoose from 'mongoose'
mongoose instanceof mongoose.Mongoose

const mongodb_url = process.env.MONGO_DATABASE_URL as string

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const database = mongoose.connection

export { database, mongoose }
