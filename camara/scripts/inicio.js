
/* ========================================
   CONECTA FORTALEZA
   EMPRESAS EM DESTAQUE
======================================== */

// Localizar o espaço onde os cartões serão exibidos
const spotlightContainer = document.querySelector("#spotlight-container");

// Buscar os dados das empresas
async function carregarDestaques() {

    try {

        const resposta = await fetch("dados/membros.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os membros.");
        }

        const empresas = await resposta.json();

        // Filtrar empresas Ouro (3) e Prata (2)
        const empresasElegiveis = empresas.filter(
            empresa => empresa.nivel === 2 || empresa.nivel === 3
        );

        // Embaralhar as empresas aleatoriamente
        const empresasEmbaralhadas = [...empresasElegiveis];

        for (let i = empresasEmbaralhadas.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));

            [empresasEmbaralhadas[i], empresasEmbaralhadas[j]] =
                [empresasEmbaralhadas[j], empresasEmbaralhadas[i]];
        }

        // Selecionar três empresas
        const destaques = empresasEmbaralhadas.slice(0, 3);

        // Limpar mensagem de carregamento
        spotlightContainer.replaceChildren();

        // Criar um cartão para cada empresa
        destaques.forEach(empresa => {

            const cartao = document.createElement("article");
            cartao.classList.add("spotlight-card");

            // Nome da empresa
            const nome = document.createElement("h3");
            nome.textContent = empresa.nome;

            // Imagem da empresa
            const imagem = document.createElement("img");
            imagem.src = `imagens/${empresa.imagem}`;
            imagem.alt = `Imagem da empresa ${empresa.nome}`;
            imagem.loading = "lazy";
            imagem.classList.add("spotlight-logo");

            // Telefone
            const telefone = document.createElement("p");
            telefone.textContent = `Telefone: ${empresa.telefone}`;

            // Endereço
            const endereco = document.createElement("p");
            endereco.textContent = `Endereço: ${empresa.endereco}`;

            // Nível de associação
            const nivel = document.createElement("p");
            nivel.textContent = `Associação: ${
                empresa.nivel === 3 ? "Ouro" : "Prata"
            }`;

            // Link para o site
            const site = document.createElement("a");
            site.href = empresa.website;
            site.textContent = "Visitar site";
            site.target = "_blank";
            site.rel = "noopener noreferrer";

            // Montar o cartão
            cartao.append(
                nome,
                imagem,
                telefone,
                endereco,
                nivel,
                site
            );

            // Inserir o cartão na página
            spotlightContainer.appendChild(cartao);
        });

    } catch (erro) {

        console.error("Erro ao carregar os destaques:", erro);

        spotlightContainer.textContent =
            "Não foi possível carregar as empresas em destaque.";
    }
}

// Executar a função
carregarDestaques();
