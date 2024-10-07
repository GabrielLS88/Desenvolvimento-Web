const sqlite3 = require('sqlite3').verbose();

//***********PC da empresa utilizar esse caminho de database!************
// const db = new sqlite3.Database('/home/gabriel/Clientes.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Conectado ao banco de dados SQLite.');
// });

//***********Notbook utilizar esse caminho de database!**************
const db = new sqlite3.Database('/home/gabriel/Desktop/Clientes.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});



const getUsers = (callback,login,password) => {
    db.all(`SELECT * FROM users where `, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};


module.exports = { getUsers };
