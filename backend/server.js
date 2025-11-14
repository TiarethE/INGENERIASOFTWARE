
const express = require('express')
const colors = require('colors')
const dotenv = require ('dotenv').config()
const port = process.env.PORT || 5000
const connectDB = require ('./config/db')
const app = express()
const cors = require('cors')

connectDB()

app.use(cors())

app.use(express.json())
app.use (express.urlencoded({extended: false}))

app.use('/api/tareas', require('./routes/tareasRoutes'))
app.use('/api/users', require('./routes/usersRoutes'))

app.listen(port, ()=> console.log(`Servidor iniciado en el puerto ${port}`))