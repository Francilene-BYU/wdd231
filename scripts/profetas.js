
const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';

const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
    const resposta = await fetch(url);
    const dados = await resposta.json();

    console.table(dados.profetas);

    exibirProfetas(dados.profetas);
}

obterDadosDeProfetas();

function exibirProfetas(profetas) {
    profetas.forEach((profeta) => {

        // Criar o cartão
        const card = document.createElement('section');
        card.classList.add('card');

        // Criar o nome do profeta
        const nomeCompleto = document.createElement('h2');
        nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;

        // Criar o espaço das informações
        const informacoes = document.createElement('div');
        informacoes.classList.add('informacoes');

        // Dados do profeta
        const dados = [
            ['Nascimento:', profeta.nascimento],
            ['Lugar:', profeta.localNascimento],
            ['Crianças:', profeta['numeroFilhos']],
            ['Anos de Serviço:', profeta['duracao']],
            ['Falecimento:', profeta.morte]
        ];

        // Criar os pares de chave e valor
        dados.forEach(([chave, valor]) => {
            const textoChave = document.createElement('strong');
            textoChave.textContent = chave;

            const textoValor = document.createElement('span');
            textoValor.textContent = valor ?? '—';

            informacoes.appendChild(textoChave);
            informacoes.appendChild(textoValor);
        });

        // Criar a fotografia
        const retrato = document.createElement('img');

        retrato.setAttribute('src', profeta.urlImagem);
        retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
        retrato.setAttribute('loading', 'lazy');
        retrato.setAttribute('width', '340');
        retrato.setAttribute('height', '440');

        // Adicionar os elementos ao cartão
        card.appendChild(nomeCompleto);
        card.appendChild(informacoes);
        card.appendChild(retrato);

        // Adicionar o cartão à página
        cartoes.appendChild(card);
    });
}
