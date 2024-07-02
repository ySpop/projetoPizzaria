// const express = require("express");
// const bcrypt = require("bcrypt");
// const fetch = require("node-fetch");
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// let users = [];
// fetch("http://localhost:8181/users")
//   .then((res) => res.json())
//   .then((data) => {
//     users = data;
//   });

// app.get("/users", async (req, res) => {
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { name: req.body.name, password: hashedPassword };
//     users.push(user);

//     await fetch("http://localhost:8181/users", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });

//     res.status(201).send();
//   } catch {
//     res.status(500).send();
//   }
// });

// app.post("/users/login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find((user) => user.name === username);

//   if (user == null) {
//     return res.status(400).json({ message: "Não foi possível encontrar usuário" });
//   }

//   try {
//     if (await bcrypt.compare(password, user.password)) {
//       return res.status(200).json({ message: "Você logou com sucesso" });
//     } else {
//       return res.status(401).json({ message: "Senha incorreta" });
//     }
//   } catch {
//     res.status(500).send();
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
