import express from 'express'
import cors from 'cors'
import { setUp } from './db.js'
import linkRoute from './link.js'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use('/task', linkRoute) 

setUp()

app.get('/', (req, res) => {
    console.log('Here')
    res.send('Hi')
})

app.listen(port, ()=> {
    console.log(`Port: ${port}`)
})