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

export const add_task = (task, status) => {
    const insert_query = `
    INSERT INTO Tasks (Tasks, Status) values (?, ?)
    `;
    db.run(insert_query, [task, status], function(err) {
        if (err){
            console.error('Error inserting task:', err);
        }else{
            console.log(`Task '${task}' added with ID ${this.lastID}`);
        }
    });
};

export const list_task = (callback) => {
    const select_query = `
    SELECT * FROM Tasks
    `;
    db.all(select_query, [], callback); // Pass the callback to db.all
}


export const del_task = (taskId) =>{
    const del_query = `
    DELETE FROM Tasks WHERE id = ?
    `;

    db.run(del_query, [taskId], function (err){
        if (err){
            console.log('Error deleting task: ', err);
        }else{
            console.log(`Task with id ${taskId} deleted successfully`)
        }
    })
}


export const setUp = () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Tasks (
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