const sqlite3 = require('sqlite3').verbose();

//PC da empresa utilizar esse caminho de database!
// const db = new sqlite3.Database('/home/gabriel/Atendentes.db', (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Conectado ao banco de dados SQLite.');
// });

//Notbook utilizar esse caminho de database!
const db = new sqlite3.Database('/home/gabriel/Desktop/Clientes', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});


function consutarCliente(email){
    return new Promise((resolve,reject) => {
        db.all(`SELECT * FROM Atendentes WHERE email = ?`, [email], (err, rows) => {
            if (err) {
                reject(err);
            } else {
               return resolve(rows.length)
            }
        });
    })
}



const insertUser = async (nome, email, password) => {
    try {
        const verificarCliente = await consutarCliente(email);
        if (verificarCliente > 0) {
            return "Cliente já existe";
        }

        const stmt = db.prepare(`INSERT INTO Atendentes(nome, email, senha) VALUES (?, ?, ?);`);
        return new Promise((resolve, reject) => {
            stmt.run(nome, email, password, (err) => {
                if (err) {
                    console.error('Erro ao inserir usuário:', err.message);
                    return reject("Opss... Tivemos um problema ao registrar o seu cadastro, pedimos que tente novamente.");
                }
                resolve("Cadastro realizado com sucesso");
            });
        }).finally(() => {
            stmt.finalize();
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        return "Opss... Tivemos um problema ao registrar o seu cadastro, pedimos que tente novamente.";
    }
};




module.exports = { insertUser };
