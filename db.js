var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err)=>{
    if (err){
        console.error(err.message)
    }else{
        console.log('Connected to Database')
        db.run(`
        CREATE TABLE Todo(
            id INTEGER PRIMARY KEY,
            TASKS TEXT NOT NULL,
            STATUS TEXT NOT NULL
        )`)
    }
})

module.exports = db