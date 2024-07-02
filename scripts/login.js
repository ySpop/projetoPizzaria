// function Login () {
//     window.location.href = "login.html"
// }

// // login.js

// let users = [];

// document.addEventListener("DOMContentLoaded", () => {
//   const botaoLogin = document.getElementById("botaoLogin");
//   botaoLogin.addEventListener("click", loginUser);
// });

// function getUsers() {
//   fetch("http://localhost:8181/users")
//     .then((response) => response.json())
//     .then((data) => {
//       users = data; // Armazena os dados recebidos na variável users
//     })
//     .catch((err) => console.log(err));
// }

// function loginUser() {
//   // event.preventDefault(); // Evita o comportamento padrão do formulário

//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   if (username && password) {
//     const credentials = {
//       username: username,
//       password: password,
//     };

//     const credentialsConverted = JSON.stringify(credentials);

//     fetch("http://localhost:8181/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: credentialsConverted,
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Credenciais inválidas.");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Trata a resposta do login conforme necessário
//         console.log("Usuário logado:", data);
//         // Redireciona ou executa outras ações após o login
//       window.location.href = "index.html"

//       })
//       .catch((err) => {
//         console.error("Erro:", err);
//         alert("Credenciais inválidas. Por favor, tente novamente.");
//       });
//   } else {
//     alert("Preencha todos os campos para realizar o login.");
//   }
// }



// function Login() {
//   window.location.href = "login.html";
// }

// let users = [];

// document.addEventListener("DOMContentLoaded", () => {
//   const botaoLogin = document.getElementById("botaoLogin");
//   if (botaoLogin) {
//     botaoLogin.addEventListener("click", loginUser);
//   } else {
//     console.error("Elemento com ID 'botaoLogin' não encontrado.");
//   }
// });

// function loginUser(event) {
//   event.preventDefault(); // Evita o comportamento padrão do formulário

//   const usernameInput = document.getElementById("username").value;
//   const passwordInput = document.getElementById("password").value;

//   if (usernameInput && passwordInput) {
//     const credentials = {
//       username: usernameInput,
//       password: passwordInput,
//     };

//     const searchUser = users.forEach((usuario) => {
//       const usuarioEncontrado = usuario.usarname === usernameInput;

//       if (usuarioEncontrado) {
//         const credentialsConverted = JSON.stringify(credentials);

//         fetch("http://localhost:8181/users", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: credentialsConverted,
//         })
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error("Credenciais inválidas.");
//             }
//             return response.json();
//           })
//           .then((data) => {
//             // Trata a resposta do login conforme necessário
//             console.log("Usuário logado:", data);
//             // Redireciona ou executa outras ações após o login
//             window.location.href = "index.html";
//           })
//           .catch((err) => {
//             console.error("Erro:", err);
//             alert("Credenciais inválidas. Por favor, tente novamente.");
//           });
//       } else {
//         alert("Usuário ou senha incorretos.");
//       }
//     });
//   }
// }




function Login() {
  window.location.href = "login.html";
}

let users = [];

document.addEventListener("DOMContentLoaded", () => {
  const botaoLogin = document.getElementById("botaoLogin");
  if (botaoLogin) {
    botaoLogin.addEventListener("click", loginUser);
  } else {
    console.error("Elemento com ID 'botaoLogin' não encontrado.");
  }
});
function getUsers() {
  fetch("http://localhost:8181/users")
   .then((response) => response.json())
   .then((data) => {
      users = data; // Armazena os dados recebidos na variável users
    })
   .catch((err) => console.log(err));
}

function loginUser(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  if (usernameInput && passwordInput) {
    // Verifica se o usuário existe no array users
    const user = users.find((usuario) => usuario.username === usernameInput);

    if (user) {
      if (user.password === passwordInput) {
        // Credenciais válidas, redireciona para página principal
        console.log("Usuário logado:", user);
        window.location.href = "index.html";
      } else {
        // Senha incorreta
        alert("Senha incorreta. Por favor, tente novamente.");
      }
    } else {
      // Usuário não encontrado
      alert("Usuário não encontrado. Por favor, verifique suas credenciais.");
    }
  } else {
    alert("Preencha todos os campos para realizar o login.");
  }
}
getUsers();
