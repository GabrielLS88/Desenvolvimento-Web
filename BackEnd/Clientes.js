require('dotenv').config();
const db = require('./DataBase/consultaClientes_db');
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

app.get('/users', async (req,res) => {
    const { id } = req.params;
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// db.createTable();

// db.insertUser('Anderson');
// db.insertUser('Bianca');

// db.deletUser('Anderson')