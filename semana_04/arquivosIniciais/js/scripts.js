const btnAbrir = document.querySelector("btnAbrir");
const caixaDialogo = document.querySelector("caixaDialogo");
const btnFechar = document.querySelector("btnFechar");

btnAbrir.addEventlistener ("click", () => {
    caixaDialogo.showmodal();

});

btnFechar.addEventlistener ("click", () => {
    caixaDialogo.close();

});


