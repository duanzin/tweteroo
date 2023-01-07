import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json())

const usuarios = [];
const tweets = [];

server.post("/sign-up", (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  const novousuario = req.body;

  if (!novousuario.username || !novousuario.avatar) {
    return res.status(422).send("Todos os campos são obrigatórios");
  }
  usuarios.push(novousuario);
  res.status(201).send("OK");
});

server.post("/tweets", (req, res) => {
  if (!req.body) {
    return res.sendStatus(400);
  }
  let users = usuarios.map((user) => user.username);
  if (!users.includes(req.body.username)) {
    return res.status(401).send("UNAUTHORIZED");
  }

  const novotweet = req.body;

  if (!novotweet.username || !novotweet.tweet) {
    return res.status(422).send("Todos os campos são obrigatórios");
  }
  
  tweets.unshift({
    "username": novotweet.username,
    "avatar": usuarios.find(e => e.username === novotweet.username).avatar,
    "tweet": novotweet.tweet
});
  res.status(201).send("OK");
});

server.get("/tweets", (req, res) => {
  res.send(tweets.slice(0,10));
});

server.listen(5000);
