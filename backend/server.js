const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const taskRoutes = require('./routes/task')
const userRoutes = require('./routes/user')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())


PORT = 7000

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Mongodb connected!')
}).catch((error)=>{
    console.log(error)
})

app.use('/tasks', taskRoutes)
app.use('/user', userRoutes)

app.get('/', (req,res)=>{
    res.send('Hello Khushi')
})

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
})