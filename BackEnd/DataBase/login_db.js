const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt')

//***********PC da empresa utilizar esse caminho de database!************
// const db = new sqlite3.Database('/home/gabriel/Atendentes.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Conectado ao banco de dados SQLite.');
// });


//***********Notbook utilizar esse caminho de database!**************
const db = new sqlite3.Database('/home/gabriel/Desktop/Clientes', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

function verificarDados(login,password, callback){
    db.all(`SELECT * FROM Atendentes where email = ?`, [login], (err, usuarios) => {
        if (err) {
            return callback(err, null);
        } if(!usuarios) {
            return callback(null, null);
        }
        let usuario = usuarios[0]
        if(password == usuario.senha){
            return callback(null,usuarios)
        }
    });
}


const getUserLogin = (login,password,callback) => {
    return verificarDados(login,password,callback)
};


module.exports = { getUserLogin };
