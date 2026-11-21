
// MODAIS DOS NÍVEIS DE ASSOCIAÇÃO

const membershipLinks = document.querySelectorAll(".membership-card a");

membershipLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const dialogId = link.getAttribute("href");
        const dialog = document.querySelector(dialogId);

        if (dialog) {
            dialog.showModal();
        }
    });
});

// BOTÕES PARA FECHAR OS MODAIS

const closeButtons = document.querySelectorAll(".close-dialog");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const dialog = button.closest("dialog");

        if (dialog) {
            dialog.close();
        }
    });
});

// REGISTRAR DATA E HORA DO CARREGAMENTO

const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}
