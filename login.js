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
// Adiciona o ouvinte de evento para o formulário de login
document.addEventListener('submit', function (event) {
    event.preventDefault();

    if (event.target.id === "loginForm") {
        const login = event.target.querySelector('input[placeholder="Usuário"]').value;
        const senha = event.target.querySelector('input[placeholder="Senha"]').value;

        const usuario = JSON.parse(localStorage.getItem("usuario"));

        // Verifica se o usuário existe no localStorage e se a senha confere
        if (usuario && usuario.login === login && usuario.senha === senha) {
            // Armazena o time escolhido do usuário no sessionStorage ou localStorage
            sessionStorage.setItem("timeSelecionado", usuario.time);

            alert("Login realizado com sucesso!");
            window.location.href = "Index.html"; // Redireciona para a página principal

        } else {
            alert("Login ou senha incorretos.");
        }
    }
});

