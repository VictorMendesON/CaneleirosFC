// Função para alternar entre os formulários de login e cadastro
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('cadastroForm');
    const toggleButton = document.getElementById('toggleButton');
    
    if (registerForm.style.display === "none") {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        toggleButton.textContent = "Voltar";
    } else {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        toggleButton.textContent = "Criar conta";
    }
}

// Lógica para validar o formulário de login
document.addEventListener('submit', function (event) {
    event.preventDefault();

    if (event.target.id === "loginForm") {
        // Obter valores dos campos de login
        const usuario = event.target.querySelector('input[placeholder="Usuário"]').value;
        const senha = event.target.querySelector('input[placeholder="Senha"]').value;

        // Obter o usuário cadastrado do Local Storage
        const usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));

        // Validação de login
        if (usuarioCadastrado && usuarioCadastrado.login === usuario && usuarioCadastrado.senha === senha) {
            alert("Login realizado com sucesso!");
            window.location.href = "index.html"; // Redireciona para a página principal
        } else {
            alert("Usuário ou senha incorretos.");
        }
    }
});
