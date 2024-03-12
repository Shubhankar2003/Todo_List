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

export const list_task = () => {
    const select_query = `
    SELECT * FROM Tasks
    `;
    db.all(select_query, [], function (err, rows){
        if (err){
            console.error('Error listing tasks:', err);
        }else {
            rows.forEach(row => {
                console.log(`Task ID: ${row.id}, Task: ${row.Tasks}, Status: ${row.Status}`);
            });
        }
    })
}


// export const del_task = (taskId) =>{
//     const del_query = `
//     DELETE FROM Tasks WHERE id = ?
//     `;

//     db.run(del_query, [taskId], function (err){
//         if (err){
//             console.log('Error deleting task: ', err);
//         }else{
//             console.log(`Task with id ${taskId} deleted successfully`)
//         }
//     })
// }

export const del_task = (taskId) => {
    const del_query = `
        DELETE FROM Tasks WHERE id = ?
    `;

    db.run(del_query, [taskId], function (err) {
        if (err) {
            console.log('Error deleting task: ', err);
        } else {
            console.log(`Task with id ${taskId} deleted successfully`);

            // After deletion, update the IDs of subsequent tasks
            const update_query = `
                UPDATE Tasks SET id = id - 1 WHERE id > ?
            `;
            db.run(update_query, [taskId], function (err) {
                if (err) {
                    console.log('Error updating IDs:', err);
                } else {
                    console.log('IDs updated successfully');
                }
            });
            
            // Reset auto-increment value of the ID column
            const reset_query = `
                DELETE FROM sqlite_sequence WHERE name = 'Tasks'
            `;
            db.run(reset_query, function (err) {
                if (err) {
                    console.log('Error resetting auto-increment:', err);
                } else {
                    console.log('Auto-increment reset successfully');
                }
            });
        }
    });
};


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