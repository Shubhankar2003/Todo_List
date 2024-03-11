const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    console.log('Here')
    res.send('Hi')
})


app.listen(port, ()=> {
    console.log(`Port: ${port}`)
})