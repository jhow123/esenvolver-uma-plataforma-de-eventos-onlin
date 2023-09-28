require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const User = require('./models/user'); 

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à API!" });
});

app.get("/user/:id",checkToken, async (req, res) => {
    const id = req.params.id;
  
    try {
        const user = await User.findById(id, "-password");
  
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Erro ao buscar usuário" });
    }
});
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }
  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
 
}

app.post("/auth/register", async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
        return res.status(422).json({ msg: "Nome, email e senha são obrigatórios!" });
    }
    
    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "A senha e a confirmação precisam ser iguais!" }); 
    }

    try {
        const userExists = await User.findOne({ email: email });
        if (userExists){
            return res.status(422).json({msg: 'Por favor, utilize outro e-mail!'});
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: passwordHash,
        });

        await newUser.save();
    
        return res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
    }
});

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ msg: "Email e senha são obrigatórios!" });
    }
    
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
        }

        const secret = process.env.SECRET;

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            { expiresIn: "1h" } 
        );

        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Aconteceu um erro no servidor, tente novamente mais tarde!" });
    }
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.habjhvd.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Conectou ao banco!");
        app.listen(3000, () => {
            console.log("Servidor rodando na porta 3000");
        });
    })
    .catch((err) => console.error(err));
