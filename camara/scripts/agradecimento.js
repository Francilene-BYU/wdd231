
// RECUPERAR OS DADOS ENVIADOS PELO FORMULÁRIO

const parametros = new URLSearchParams(window.location.search);

// EXIBIR OS DADOS NA PÁGINA

document.querySelector("#firstName").textContent =
    parametros.get("firstName") || "Não informado";

document.querySelector("#lastName").textContent =
    parametros.get("lastName") || "Não informado";

document.querySelector("#email").textContent =
    parametros.get("email") || "Não informado";

document.querySelector("#phone").textContent =
    parametros.get("phone") || "Não informado";

document.querySelector("#organization").textContent =
    parametros.get("organization") || "Não informado";

// FORMATAR A DATA E A HORA

const dataRecebida = parametros.get("timestamp");
const timestampElement = document.querySelector("#timestamp");

if (dataRecebida) {
    const data = new Date(dataRecebida);

    timestampElement.textContent = isNaN(data.getTime())
        ? "Data inválida"
        : data.toLocaleString("pt-BR");
} else {
    timestampElement.textContent = "Não informado";
}

// ATUALIZAR O RODAPÉ

document.querySelector("#anoAtual").textContent =
    new Date().getFullYear();

document.querySelector("#ultimaModificacao").textContent =
    `Última modificação: ${document.lastModified}`;
