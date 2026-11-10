
const caminhoJSON = "dados/membros.json";
const caminhoImagens = "imagens/";

const container = document.querySelector("#member-container");
const botaoGrade = document.querySelector("#grid-view");
const botaoLista = document.querySelector("#list-view");



async function carregarMembros() {
    try {
        const resposta = await fetch(caminhoJSON);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os dados.");
        }

        const membros = await resposta.json();

        exibirMembros(membros);
        
    } catch (erro) {
        console.error("Erro:", erro);
        container.innerHTML = "<p>Não foi possível carregar os associados.</p>";
    }
}

function exibirMembros(lista) {
    container.innerHTML = "";

    lista.forEach((membro) => {
        const cartao = document.createElement("article");
        cartao.classList.add("member-card");

        cartao.innerHTML = `
            <img src="${caminhoImagens}${membro.imagem}" alt="${membro.nome}" loading="lazy">
            <h3>${membro.nome}</h3>
            <p>${membro.descricao}</p>
            <p><strong>Endereço:</strong> ${membro.endereco}</p>
            <p><strong>Telefone:</strong> ${membro.telefone}</p>
            <p><strong>Website:</strong>
                <a href="${membro.website}" target="_blank" rel="noopener noreferrer">
                    Visitar site
                </a>
            </p>
            <p><strong>Categoria:</strong> ${membro.nivel === 3 ? "Gold" : membro.nivel === 2 ? "Silver" : "Member"}</p>
        `;

        container.appendChild(cartao);
    });
}

function alterarVisualizacao(modo) {
    if (modo === "grade") {
        container.classList.remove("member-list");
        container.classList.add("member-grid");

        botaoGrade.classList.add("active");
        botaoLista.classList.remove("active");

        botaoGrade.setAttribute("aria-pressed", "true");
        botaoLista.setAttribute("aria-pressed", "false");
    } else {
        container.classList.remove("member-grid");
        container.classList.add("member-list");

        botaoLista.classList.add("active");
        botaoGrade.classList.remove("active");

        botaoLista.setAttribute("aria-pressed", "true");
        botaoGrade.setAttribute("aria-pressed", "false");
    }
}

botaoGrade.addEventListener("click", () => alterarVisualizacao("grade"));
botaoLista.addEventListener("click", () => alterarVisualizacao("lista"));

carregarMembros();


document.querySelector("#anoAtual").textContent = new Date().getFullYear();

document.querySelector("#ultimaModificacao").textContent =
    `Última modificação: ${document.lastModified}`;