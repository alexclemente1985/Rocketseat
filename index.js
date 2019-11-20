const express = require("express");

const server = express();

server.use(express.json());

const users = ["Alexandre", "Caio", "Jonas", "Priscilla"];

//middleware
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  //return
  next(); //retorna o próximo middleware (get, post, put, delete)

  console.timeEnd("Request");
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name found on request body" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  /*  if (!users[req.params.index]) {
    return res.status(400).json({ error: "User doesn't exists" });
  }*/
  if (!user) {
    return res.status(400).json({ error: "User doesn't exists" });
  }

  req.user = user;

  return next();
}

server.get("/teste", (req, res) => {
  //return res.send("Hello world!");
  const nome = req.query.nome;

  return res.json({ message: `Hello ${nome}` });
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  //const id = req.params.id;
  //const { id } = req.params;
  //const { index } = req.params;
  //return res.json({ message: `Buscando o usuário ${id}` });
  //return res.json(users[index]);
  return res.json(req.user);
});

server.get("/users", (req, res) => {
  return res.json(users);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  //return res.json(users);

  return res.send();
});

server.listen(3000);
