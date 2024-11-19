// Adiciona o ouvinte de evento para o formulário
document.addEventListener('submit', function (event) {
    event.preventDefault();

    if (event.target.id === "cadastroForm") {
        // Obter valores dos campos do formulário de cadastro
        const nome = event.target.querySelector('input[placeholder="Nome"]').value;
        const dataNascimento = event.target.querySelector('input[placeholder="Data de Nascimento"]').value;
        const cpf = event.target.querySelector('input[placeholder="CPF"]').value;
        const telefone = event.target.querySelector('input[placeholder="Número de Telefone (DDD)"]').value;
        const endereco = event.target.querySelector('input[placeholder="Endereço"]').value;
        const login = event.target.querySelector('input[placeholder="Login"]').value;
        const confirmarSenha = event.target.querySelector('input[placeholder=confirmarSenha]').value;
        const senha = event.target.querySelector('input[placeholder="Senha"]').value;
        const timeSelecionado = document.getElementById('teamSelect').value;
       
        if (!nome || !dataNascimento || !cpf || !telefone || !endereco || !login || !senha || !confirmarSenha || !timeSelecionado) {
            alert("Todos os campos devem ser preenchidos.");
            return;
        }
        // Validação de senha mínima de 6 caracteres
        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Validação de CPF simples
        if (!/^\d{11}$/.test(cpf)) {
            alert("O CPF deve conter 11 dígitos.");
            return;
        }

        const telefoneRegex = /^\(\+55\) \d{2}-\d{8,9}$/;
        if (!telefoneRegex.test(telefone)) {
            alert("O telefone deve estar no formato (+55) XX-XXXXXXXX ou (+55) XX-XXXXXXXXX.");
            return;
        }

         // Verificar se as senhas coincidem
         if (senha !== confirmarSenha) {
            alert("As senhas não conferem.");
            return;
        }

        if (!timeSelecionado) {
            alert("Por favor, selecione o seu time.");
            return;
        }

        // Cria um objeto de usuário para armazenar no Local Storage
        const usuario = {
            nome,
            dataNascimento,
            cpf,
            telefone,
            endereco,
            login,
            senha,
            time: timeSelecionado,
        };

        // Armazena o usuário no Local Storage
        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Cadastro realizado com sucesso! Agora você pode fazer o login.");
        window.location.href = "login.html"; // Redireciona para a página de login
    }
});

// Função para alterar a cor de fundo com base no time selecionado
const selectTime = document.getElementById("teamSelect"); // Seu elemento de seleção de time

selectTime.addEventListener("change", function () {
    const timeSelecionado = selectTime.value;

    let corDoTime;
    let gradienteDoTime;

    switch (timeSelecionado) {
        case "Flamengo":
            corDoTime = "#c22a1e"; // Vermelho
            gradienteDoTime = "linear-gradient(0deg, rgba(194 42 30) 0%, rgba(0,0,0,1) 100%)"; // Gradiente para Flamengo
            break;
        case "Vasco":
            corDoTime = "#000000"; // Preto
            gradienteDoTime = "linear-gradient(0deg, rgba(0,0,0) 50%, rgba(255,255,255) 100%)"; // Gradiente para Vasco
            break;
        case "Botafogo":
            corDoTime = "#000000"; // Preto
            gradienteDoTime = "linear-gradient(0deg, rgba(0,0,0) 0%, rgba(0,0,0) 100%)"; // Gradiente para Botafogo
            break;
        case "Fluminense":
            corDoTime = "#00613c"; // Verde
            gradienteDoTime = "linear-gradient(0deg, rgba(0 97 60) 0%, rgba(135 10 40) 100%)"; // Gradiente para Fluminense
            break;
        default:
            corDoTime = "#FFFFFF"; // Cor padrão (branco)
            gradienteDoTime = "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)"; // Gradiente padrão
    }

    // Aplica a cor de fundo suavemente para o body
    document.body.style.transition = "background-color 0.5s ease"; // Transição suave
    document.body.style.backgroundColor = corDoTime;

    // Aplica a cor de fundo suavemente para o header
    const header = document.querySelector('.header');
    header.style.transition = "background-color 0.5s ease, background 0.5s ease"; // Transição suave
    header.style.backgroundColor = corDoTime;
    header.style.background = gradienteDoTime; // Aplica o gradiente para o time selecionado
});
