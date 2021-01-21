import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotinv from 'dotenv'
import postRoutes from './routes/posts.js'

const app = express()
dotinv.config()


app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes) 

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})
 
//const CONNECTION_URL = 'mongodb+srv://syskadev:syskadev123@cluster0.1bjxb.mongodb.net/<dbname>?retryWrites=true&w=majority'
const PORT = process.env.PORT || 80

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server Running in Port : ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)