// Quando a página carrega, pegamos o time do usuário do sessionStorage
const timeSelecionado = sessionStorage.getItem("timeSelecionado");

if (!timeSelecionado) {
    alert("Você precisa fazer login primeiro!");
    window.location.href = "login.html"; // Redireciona se o time não estiver no sessionStorage
} else {
    // Atualiza o título com o nome do time
    atualizarTitulo(timeSelecionado);

    // Exibir notícias do time
    carregarNoticias(timeSelecionado);
}

// Função para carregar as notícias da API da NewsAPI
function carregarNoticias(time) {
    const apiKey = '0d041f078ac04a5e8361a8cb96babd4d'; // Substitua com a sua chave da API da NewsAPI
    const url = `https://newsapi.org/v2/everything?q=${time}&apiKey=${apiKey}`; // URL da NewsAPI com o time como parâmetro

    // Altera a aparência da página com base no time
    estilizarPaginaPorTime(time);

    // Requisição para a API
    fetch(url)
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            const noticiasContainer = document.getElementById("noticias");
            noticiasContainer.innerHTML = ""; // Limpa o container antes de carregar novas notícias

            const maxNoticias = 8; // Limita o número de notícias exibidas

            // Verifica se existem notícias
            if (data.articles && data.articles.length > 0) {
                // Exibe apenas as primeiras 10 notícias
                data.articles.slice(0, maxNoticias).forEach(noticia => {
                    const noticiaElement = document.createElement("div");
                    noticiaElement.classList.add("noticia");

                    noticiaElement.innerHTML = `
                        <h3>${noticia.title}</h3>
                        <img src="${noticia.urlToImage || 'default-image.jpg'}" alt="${noticia.title}">
                        <p>${noticia.description || 'Descrição não disponível.'}</p>
                        <a href="${noticia.url}" target="_blank">Leia mais</a>
                    `;

                    noticiasContainer.appendChild(noticiaElement);
                });
            } else {
                noticiasContainer.innerHTML = "<p>Não há notícias disponíveis para o time selecionado.</p>";
            }
        })
        .catch(error => {
            console.error("Erro ao carregar as notícias:", error);
            alert("Ocorreu um erro ao carregar as notícias.");
        });
}

// Função para estilizar a página de acordo com o time
function estilizarPaginaPorTime(time) {
    const body = document.body;
    const noticiasContainer = document.getElementById("noticias");
    let corPrimaria = "";
    let corSecundaria = "";

    // Define as cores com base no time selecionado
    switch (time) {
        case "Flamengo":
            corPrimaria = "#c22a1e"; // Vermelho
            corSecundaria = "#000000"; // Preto
            break;
        case "Vasco":
            corPrimaria = "#ffffff"; // Branco
            corSecundaria = "#000000"; // Preto
            break;
        case "Botafogo":
            corPrimaria = "#000000"; // Preto
            corSecundaria = "#ffffff"; // Branco
            break;
        case "Fluminense":
            corPrimaria = "#00613c"; // Verde
            corSecundaria = "#880012"; // Grená
            break;
        default:
            corPrimaria = "#ffffff"; // Branco
            corSecundaria = "#cccccc"; // Cinza
    }

    // Aplica as cores no corpo e no container de notícias
    body.style.backgroundColor = corSecundaria;
    body.style.color = corPrimaria;
    noticiasContainer.style.backgroundColor = corPrimaria;
    noticiasContainer.style.color = corSecundaria;
    noticiasContainer.style.padding = "20px";
    noticiasContainer.style.borderRadius = "10px";
}

// Função para atualizar o título com o nome do time
function atualizarTitulo(time) {
    const titulo = document.querySelector("#noticias-container h2");
    titulo.textContent = `Notícias do ${time}`; // Substitui o texto pelo nome do time
}
