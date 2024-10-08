const sqlite3 = require('sqlite3').verbose();

//PC da empresa utilizar esse caminho de database!
// const db = new sqlite3.Database('/home/gabriel/node.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Conectado ao banco de dados SQLite.');
// });

//Notbook utilizar esse caminho de database!
const db = new sqlite3.Database('/home/gabriel/Desktop/Clientes.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});



const createTable = () => {
    db.run(`CREATE TABLE IF NOT EXISTS Atendentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL	
)`, (err) => {
        if (err) {
            console.error('Erro ao criar tabela:', err.message);
        }
    });
};

const insertUser = (name, idade, telefone) => {
    const stmt = db.prepare(`INSERT INTO Atendentes (name, idade, telefone) VALUES (?, ?, ?)`);
    stmt.run(name, idade, telefone, (err) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err.message);
        }
    });
    stmt.finalize();
};

const getUsers = (callback) => {
    db.all(`SELECT * FROM Atendentes`, [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

const deletUser = (id) => {
    db.run(`DELETE FROM Atendentes WHERE name = ?`, [id], function(err) {
        if (err) {
            console.error('Erro ao deletar usuário:', err.message);
        } else if (this.changes === 0) {
            console.log(`Nenhum usuário encontrado com ID ${id}.`);
        } else {
            console.log(`Usuário com ID ${id} deletado.`);
        }
    });
};


const closeDatabase = () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
    });
};

module.exports = { createTable, insertUser, getUsers, closeDatabase, deletUser };
