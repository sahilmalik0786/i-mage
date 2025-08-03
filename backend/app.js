require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')

const {connectToDb} = require('./src/db/db')

const authroutes = require('./src/routes/auth.routes')
const postroutes = require('./src/routes/post.routes')

const app = express()

const config = {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your frontend URL
    credentials: true, // This allows cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
connectToDb()

app.use(cors(config))
app.use(cookieparser())
app.use(express.json())

app.use('/api/auth' , authroutes )
app.use('/api/generate' , postroutes )

app.listen(3000, ()=>{
    console.log('server is runnig on port no.3000')
})