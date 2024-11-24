const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const port = process.env.PORT

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
   res.send('Hello World!')
})

const userController = require('./user/user.controller')
const taskController = require('./task/task.controller')

app.use('/api', userController)
app.use('/api', taskController)



app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})