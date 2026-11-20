const btnAbrir1 = document.querySelector("#btnAbrir1");
const btnAbrir2 = document.querySelector("#btnAbrir2");
const btnAbrir3 = document.querySelector("#btnAbrir3");
const caixaDialogo = document.querySelector("#caixaDialogo");
const btnFechar = document.querySelector("#btnFechar");
const caixaDialogoTexto = document.querySelector("#caixaDialogo div");

// Abrir a caixa de diálogo 1
btnAbrir1.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = 'Uma Maçã contém 95 calorias';
});

// Abrir a caixa de diálogo 2
btnAbrir2.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = 'Uma Laranja contém 45 calorias';
});

// Abrir a caixa de diálogo 3
btnAbrir3.addEventListener("click", () => {
    caixaDialogo.showModal();
    caixaDialogoTexto.innerHTML = 'Uma Banana contém 105 calorias';
});

// Fechar a caixa de diálogo
btnFechar.addEventListener("click", () => {
    caixaDialogo.close();
});