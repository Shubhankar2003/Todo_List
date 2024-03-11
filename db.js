import sqlite3 from 'sqlite3'
import 'dotenv/config'

const DBSOURCE = (process.env.NODE_ENV === 'production' ? ':memory:' : './database.sqlite')

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error('Database connection error:', err.message)
    } else {
        console.log('Connected to the SQLite database.')
    }
})

export const setUp = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY,
        Tasks TEXT NOT NULL,
        Status TEXT NOT NULL
    )`
    
    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err)
        } else {
            console.log('Table created successfully')
        }
    })
}

export const shutDown = () => db.close()