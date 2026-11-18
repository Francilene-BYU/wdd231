
// Selecionar os elementos HTML
const tempAtual = document.querySelector('#temp-atual');
const iconeDoClima = document.querySelector('#icone-do-clima');
const descrDaLegenda = document.querySelector('figcaption');


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=3dc2889b50e01fd68f882d90b7e6787d';


async function apiFetch() {
    try {
        const resposta = await fetch(url);

        if (resposta.ok) {
            const dados = await resposta.json();
            console.log(dados);
            mostrarResultados(dados);
        } else {
            throw Error(await resposta.text());
        }

    } catch (erro) {
        console.log(erro);
    }
}

apiFetch();


function mostrarResultados(dados) {
    tempAtual.innerHTML = `${dados.main.temp}&deg;C`;

    const iconeSrc = `https://openweathermap.org/img/w/${dados.weather[0].icon}.png`;

    const descricoes = {
    "overcast clouds": "Céu nublado",
    "broken clouds": "Nuvens dispersas",
    "scattered clouds": "Nuvens esparsas",
    "few clouds": "Poucas nuvens",
    "clear sky": "Céu limpo",
    "light rain": "Chuva leve",
    "moderate rain": "Chuva moderada",
    "heavy intensity rain": "Chuva forte",
    "mist": "Névoa",
    "fog": "Neblina",
    "thunderstorm": "Tempestade"
};

const descr = descricoes[dados.weather[0].description] 
    || dados.weather[0].description;

    iconeDoClima.setAttribute('src', iconeSrc);
    iconeDoClima.setAttribute('alt', `Ícone indicando ${descr}`);

    descrDaLegenda.textContent = descr;
}

