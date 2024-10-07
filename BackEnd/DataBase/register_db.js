const sqlite3 = require('sqlite3').verbose();

//PC da empresa utilizar esse caminho de database!
// const db = new sqlite3.Database('/home/gabriel/Clientes.db', (err) => {
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


function consutarCliente(email){
    return new Promise((resolve,reject) => {
        db.all(`SELECT * FROM users WHERE email = ?`, [email], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if(rows.length > 1){
                    resolve(false)
                } else if(rows.length == 0){
                    resolve(true)
                }
            }
        });
    })
}



const insertUser = async (nome, email, password) => {
    try{
        const verificarCliente = await consutarCliente(email)
        if(verificarCliente == true){
        const stmt = db.prepare(`INSERT TABLE Clientes(nome,email,password) values(?,?,?);`);
        stmt.run(nome, email, password, (err) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err.message);
            }
        });
        stmt.finalize();
    } else{
        return "Cliente ja existe"
    }
    } catch (error){
        return "Opss... Tivemos um problema ao resgistrar o seu cadastro, pedimos que tente novamente."
    }  
};


const deletUser = (id) => {
    db.run(`DELETE FROM users WHERE name = ?`, [id], function(err) {
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

module.exports = { insertUser, deletUser };
