require('dotenv').config();
const db = require('./DataBase/consultaDadosCliente_db');
const login = require('./DataBase/login_db')
const registro = require('./DataBase/register_db')
const express = require("express")
const app = express();
const port = 2505;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function verificarToken(req, res, next) {
    const token = req.header("Token");
    if (!token || token !== process.env.AUTH_TOKEN) {
      return res.status(401).json({ message: "Token não fornecido ou inválido." });
    }
    next();
}

app.use(verificarToken);

app.use((req, res, next) => {
  next();
});

app.get('/users', async (req,res) => {
    try{
        db.getUsers((err, users) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.json(users)
        });
    } catch(error){
        res.status(500).json({error:error.message})
    }
})

app.post('/login', async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){ return res.status(400).json({message: 'E necessario email e senha para consulta'})}
    try{
        login.getUserLogin(email,password, (err,login)=>{
            if(err){
                console.error(err);
                return res.status(500).json({error:err.message});
            }
            if(!login){
                return res.json({message: 'Credenciais invalidas', login})
            }
            res.json({message:'Login sucedido',login})
        })
    }catch{
        res.status(500).json({error:error.message})
    }
})


app.post('/register', async (req, res) => {
    const { nome, email, password } = req.body;

    // Verifica se os campos obrigatórios foram fornecidos
    if (!nome || !email || !password) {
        return res.status(400).json({ message: 'É necessário um nome, email e senha para registrar' });
    }

    try {
        // Aguarda a inserção do usuário e captura o resultado
        const retorno = await registro.insertUser(nome, email, password);
        res.status(200).json({ message: retorno });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/blipconection', (req,res) => {
    const dados = req.body
    try{
        console.log(dados);
    }catch{
        res.status(500).json({error:error.message});
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// db.createTable();

// db.insertUser('Anderson');
// db.insertUser('Bianca');

// db.deletUser('Anderson')