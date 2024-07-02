
function Cadastro() {
  window.location.href = "cadastro.html";
}

// cadastro.js

document.addEventListener("DOMContentLoaded", () => {
  const botaoCadastro = document.getElementById("botaoCadastro");
  botaoCadastro.addEventListener("click", createUser);
});

function termsCheckbox() {
  const checkbox = document.getElementById("policy");
  return checkbox.checked;
}

function createUser(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const checkboxChecked = termsCheckbox(); // Verifica se os termos estão aceitos

  if (name && username && password && checkboxChecked) {
    const user = {
      name: name,
      username: username,
      password: password,
    };

    const userConverted = JSON.stringify(user);

    fetch("http://localhost:8181/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: userConverted,
    })
      .then(() => {
        // Limpa os campos após o cadastro
        document.getElementById("name").value = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      })
      .catch((err) => console.log(err));
      window.location.href = "login.html";
  } else {
    alert(
      "Preencha todos os dados e aceite os termos para realizar o cadastro."
    );
  }
}
