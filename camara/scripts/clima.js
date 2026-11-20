
/* ========================================
   CONECTA FORTALEZA
   INTEGRAÇÃO OPENWEATHERMAP
======================================== */

// Configurações da API
const API_KEY = "3dc2889b50e01fd68f882d90b7e6787d";

const LATITUDE = -3.7319;
const LONGITUDE = -38.5267;

// Elementos HTML
const weatherCurrent = document.querySelector("#weather-current");
const weatherForecast = document.querySelector("#weather-forecast");

// Endpoints da OpenWeatherMap
const URL_ATUAL = "https://api.openweathermap.org/data/2.5/weather";

const URL_PREVISAO = "https://api.openweathermap.org/data/2.5/forecast";

// Buscar clima atual
async function carregarClimaAtual() {

    try {

        const url = `${URL_ATUAL}?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric&lang=pt_br`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar o clima atual.");
        }

        const dados = await resposta.json();

        const temperatura = Math.round(dados.main.temp);
        const descricao = dados.weather[0].description;
        const sensacao = Math.round(dados.main.feels_like);
        const icone = dados.weather[0].icon;

        weatherCurrent.innerHTML = `
            <div class="weather-card">
                <img
                    src="https://openweathermap.org/img/wn/${icone}@2x.png"
                    alt="${descricao}"
                    width="80"
                    height="80"
                >
                <p><strong>${temperatura}°C</strong></p>
                <p>${descricao}</p>
                <p>Sensação térmica: ${sensacao}°C</p>
            </div>
        `;

        return dados;

    } catch (erro) {

        console.error("Erro no clima atual:", erro);

        weatherCurrent.textContent =
            "Não foi possível carregar o clima atual.";
    }
}

// Formatar a data considerando o fuso horário de Fortaleza
function obterDataLocal(timestamp, timezone) {

    const data = new Date((timestamp + timezone) * 1000);

    return [
        data.getUTCFullYear(),
        String(data.getUTCMonth() + 1).padStart(2, "0"),
        String(data.getUTCDate()).padStart(2, "0")
    ].join("-");
}

// Buscar previsão para os próximos três dias
async function carregarPrevisao() {

    try {

        const url = `${URL_PREVISAO}?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric&lang=pt_br`;

        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Erro ao consultar a previsão.");
        }

        const dados = await resposta.json();

        const hoje = obterDataLocal(
            dados.list[0].dt,
            dados.city.timezone
        );

        // Agrupar previsões por dia
        const previsoesPorDia = {};

        dados.list.forEach(item => {

            const data = obterDataLocal(
                item.dt,
                dados.city.timezone
            );

            // Ignorar o dia atual
            if (data === hoje) return;

            if (!previsoesPorDia[data]) {
                previsoesPorDia[data] = [];
            }

            previsoesPorDia[data].push(item);
        });

        // Selecionar os três próximos dias
        const proximosDias = Object.keys(previsoesPorDia)
            .sort()
            .slice(0, 3);

        weatherForecast.replaceChildren();

        proximosDias.forEach(data => {

            const registros = previsoesPorDia[data];

            const temperaturas = registros.map(
                item => item.main.temp
            );

            const media = temperaturas.reduce(
                (total, temperatura) => total + temperatura, 0
            ) / temperaturas.length;

            const minima = Math.round(Math.min(...temperaturas));
            const maxima = Math.round(Math.max(...temperaturas));

            const [ano, mes, dia] = data.split("-").map(Number);

            const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                timeZone: "UTC"
            }).format(new Date(Date.UTC(ano, mes - 1, dia, 12)));

            const cartao = document.createElement("article");
            cartao.classList.add("forecast-card");

            const titulo = document.createElement("h4");
            titulo.textContent = dataFormatada;

            const temperatura = document.createElement("p");
            temperatura.textContent =
                `Média: ${Math.round(media)}°C`;

            const faixa = document.createElement("p");
            faixa.textContent =
                `Mínima: ${minima}°C | Máxima: ${maxima}°C`;

            cartao.append(titulo, temperatura, faixa);

            weatherForecast.appendChild(cartao);
        });

    } catch (erro) {

        console.error("Erro na previsão:", erro);

        weatherForecast.textContent =
            "Não foi possível carregar a previsão do tempo.";
    }
}

// Executar as funções
carregarClimaAtual();
carregarPrevisao();
