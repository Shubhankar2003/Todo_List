import express from 'express'
import cors from 'cors'
import { setUp } from './db.js'

const app = express()
app.use(cors())
const port = 3000

setUp()

app.get('/', (req, res) => {
    console.log('Here')
    res.send('Hi')
})

app.listen(port, ()=> {
    console.log(`Port: ${port}`)
})