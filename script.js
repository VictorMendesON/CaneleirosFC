const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const closeBtn = document.getElementById('close-btn');
const escudo = document.getElementById('escudo');
const dropdown = document.getElementById('dropdown');
const header = document.querySelector('header');
const searchIcon = document.getElementById('searchIcon');

// Adiciona o evento de clique no escudo
escudo.addEventListener('click', () => {
    // Alterna entre mostrar ou esconder o dropdown
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Esconde o dropdown se clicar fora
window.addEventListener('click', (event) => {
    if (!escudo.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// Cores dos clubes
const clubColors = {
    club1: '#A80000', // Vermelho para Clube 1
    club2: '#177D49', // Verde para Clube 2
    club3: '#000000', // Preto para Clube 3
    club4: '#000000', // Preto para Clube 4
    club5: '#177D49', // Verde para Clube 5
    club6: '#A80000', // Vermelho para Clube 6
    club7: '#000000', // Preto para Clube 7
    club8: '#A80000', // Vermelho para Clube 8
    club9: '#11114E'  // Azul para Clube 9
};

// Seleciona todos os ícones dos times
const teamIcons = document.querySelectorAll('.team-icon');

// Adiciona evento de clique em cada escudo
teamIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        // Pega o valor do atributo data-club
        const club = this.getAttribute('data-club');
        
        // Verifica se a cor do clube existe no objeto clubColors
        if (clubColors[club]) {
            // Muda a cor da header
            header.style.backgroundColor = clubColors[club];

            // Remove a classe Bootstrap para não interferir (estava inferindo e eu não percebi rs)
            header.classList.remove('bg-success');

            // Log para verificar se está funcionando 
            console.log(`Mudou a cor para: ${clubColors[club]}`); 
        } else {
            console.error('Clube não encontrado nas cores');
        }
    });
});

// Verifica se o usuário está cadastrado e atualiza o ícone de usuário na header
document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.querySelector("#userIcon svg");
    const loginMessage = document.getElementById("loginMessage");
    const logoutButton = document.getElementById("logoutButton");

    // Verifique se há um usuário cadastrado no localStorage
    const usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));

    if (usuarioCadastrado) {
        // Se houver um usuário cadastrado, mostre o ícone, o botão de logout e oculte a mensagem de login
        userIcon.style.display = "block";
        loginMessage.style.display = "none";
        logoutButton.style.display = "block";
    } else {
        // Caso contrário, mostre a mensagem de login e oculte o ícone e o botão de logout
        userIcon.style.display = "none";
        loginMessage.style.display = "block";
        logoutButton.style.display = "none";
    }
});

// Popup de Logout
const logoutPopup = document.getElementById("logoutPopup");
const closePopup = document.querySelector(".close-popup");
const confirmLogout = document.getElementById("confirmLogout");
const userIconContainer = document.getElementById("user-container"); // Container do ícone de usuário

// Exibe o popup de logout ao clicar no ícone de usuário, se o usuário estiver logado
userIconContainer.addEventListener("click", (event) => {
    event.preventDefault();
    const usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioCadastrado) { // Só abre o popup se o usuário estiver logado
        logoutPopup.style.display = "flex";
    } else {
        window.location.href = "login.html";
    }
});

// Fecha o popup ao clicar no "X"
closePopup.addEventListener("click", () => {
    logoutPopup.style.display = "none";
});

// Logout quando o usuário confirma a saída
confirmLogout.addEventListener("click", () => {
    logout();
    logoutPopup.style.display = "none";
});

// Função de logout (também redefine a interface)
function logout() {
    localStorage.removeItem("usuario");
    const userIcon = document.querySelector("#userIcon svg");
    const loginMessage = document.getElementById("loginMessage");
    const logoutButton = document.getElementById("logoutButton");

    userIcon.style.display = "none";
    loginMessage.style.display = "block";
    logoutButton.style.display = "none";
    
    alert("Você saiu com sucesso!");
}

// Fecha o popup se o usuário clicar fora dele
window.addEventListener("click", (event) => {
    if (event.target == logoutPopup) {
        logoutPopup.style.display = "none";
    }
});



// Próximos Jogos
const jogos = [
    { timeA: "Flamengo", timeB: "Vasco", data: "20/11/2024", hora: "16:00", local: "Maracanã", link: "https://flamengo.superingresso.com.br/#!/apresentacao/ac539935d84a7820736084438f6b16fad433d7e8" },
    { timeA: "Botafogo", timeB: "Fluminense", data: "21/11/2024", hora: "18:00", local: "Engenhão", link: "https://www.botafogo.com.br/noticias/ingressos-botafogo-x-vitoria" },
    { timeA: "Cruzeiro", timeB: "Internacional", data: "25/11/2024", hora: "21:00", local: "Mineirão", link: "https://cruzeiro.futebolcard.com/" },
];

const jogosLista = document.querySelector(".jogos-lista");

jogos.forEach(jogo => {
    const card = document.createElement("div");
    card.className = "jogo-card"; // Adiciona a classe base

    // Adiciona a classe específica dependendo do jogo
    if (jogo.timeA === "Flamengo" && jogo.timeB === "Vasco") {
        card.classList.add("flamengo-vs-vasco");
    } else if (jogo.timeA === "Botafogo" && jogo.timeB === "Fluminense") {
        card.classList.add("botafogo-vs-fluminense");
    } else if (jogo.timeA === "Cruzeiro" && jogo.timeB === "Internacional") {
        card.classList.add("cruzeiro-vs-internacional");
    }

    let jogoHTML = `
        <p><strong>${jogo.timeA}</strong> vs <strong>${jogo.timeB}</strong></p>
        <p>Data: ${jogo.data}</p>
        <p>Hora: ${jogo.hora}</p>
        <p>Local: ${jogo.local}</p>
    `;

    // Adiciona o link de compra de ingressos
    if (jogo.link) {
        jogoHTML += `<p><a href="${jogo.link}" target="_blank">Comprar Ingressos</a></p>`;
    }

    card.innerHTML = jogoHTML;
    jogosLista.appendChild(card);
});








const ctx = document.getElementById("grafico-evolucao").getContext("2d");

const grafico = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["Rodada 1", "Rodada 2", "Rodada 3", "Rodada 4"],
        datasets: [
            {
                label: "Flamengo",
                data: [3, 6, 9, 12],
                borderColor: "red",
                borderWidth: 2,
                fill: false,
            },
            {
                label: "Vasco",
                data: [1, 4, 4, 7],
                borderColor: "blue",
                borderWidth: 2,
                fill: false,
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    },
});

// Recupera o time do usuário do sessionStorage
const timeSelecionado = sessionStorage.getItem("timeSelecionado");

if (!timeSelecionado) {
    // Exibe uma mensagem amigável ao invés de redirecionar
   
    // Você pode adicionar uma opção para redirecionar para o cadastro ou deixar a pessoa seguir navegando
} else {
    carregarNoticias(timeSelecionado);
}

// Função para carregar as notícias do time selecionado
function carregarNoticias(time) {
    const noticias = obterNoticias(); // Essa função pode ser adaptada para usar uma API ou JSON com as notícias

    // Filtra as notícias de acordo com o time selecionado
    const noticiasFiltradas = noticias.filter(noticia => noticia.time === time);

    // Exibe as notícias filtradas na página
    exibirNoticias(noticiasFiltradas);
}

// Função para simular o retorno de notícias (pode ser substituída por uma API ou arquivo JSON)
function obterNoticias() {
    return [
        { time: "Flamengo", titulo: "Flamengo vence o clássico", conteudo: "Conteúdo da notícia..." },
        { time: "Vasco", titulo: "Vasco se prepara para a próxima partida", conteudo: "Conteúdo da notícia..." },
        { time: "Botafogo", titulo: "Botafogo conquista mais 3 pontos", conteudo: "Conteúdo da notícia..." },
        { time: "Fluminense", titulo: "Fluminense garante vitória fora de casa", conteudo: "Conteúdo da notícia..." },
    ];
}

// Função para exibir as notícias na página
function exibirNoticias(noticias) {
    const container = document.getElementById("noticiasContainer");

    // Limpa as notícias anteriores
    container.innerHTML = "";

    noticias.forEach(noticia => {
        const noticiaElement = document.createElement("div");
        noticiaElement.classList.add("noticia");

        noticiaElement.innerHTML = `
            <h2>${noticia.titulo}</h2>
            <p>${noticia.conteudo}</p>
        `;

        container.appendChild(noticiaElement);
    });
}

// document.addEventListener("DOMContentLoaded", function () {
//     const usuarioCadastrado = JSON.parse(localStorage.getItem("usuario"));
//     const noticiasLink = document.getElementById("noticiasLink");

//     // Verifica se o usuário está logado
//     if (usuarioCadastrado) {
//         // Se o usuário estiver logado, exibe o botão de notícias
//         noticiasLink.style.display = "block";
//     } else {
//         // Se não estiver logado, esconde o botão de notícias
//         noticiasLink.style.display = "none";
//     }

//     console.log(localStorage.getItem("usuario"));
// });





