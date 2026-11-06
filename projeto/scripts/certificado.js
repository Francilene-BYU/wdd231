
function exibirCursos(lista) {
    const elementoCursos = document.querySelector("#listaCursos");

    elementoCursos.innerHTML = "";

    const totalCreditos = lista.reduce((soma, curso) => {
        return soma + curso.creditos;
    }, 0);

    document.querySelector("#totalCreditos").textContent =
        `Total de créditos: ${totalCreditos}`;

    lista.forEach((curso) => {
        const cartao = document.createElement("div");

        cartao.classList.add("cartao-curso");
        
        if (curso.concluido) {
            cartao.classList.add("concluido");
        }

        cartao.innerHTML = `
            <h3>${curso.assunto} ${curso.numero}</h3>
            <p>${curso.titulo}</p>
            <p>Créditos: ${curso.creditos}</p>
            <p>Tecnologias: ${curso.tecnologia.join(", ")}</p>
            <p>${curso.concluido ? "Concluído" : "Pendente"}</p>
        `;

        elementoCursos.appendChild(cartao);
    });
}

exibirCursos(cursos);

    const botaoTodos = document.querySelector("#todos");

    botaoTodos.addEventListener("click", () => {
        exibirCursos(cursos);
});

const botaoWdd = document.querySelector("#wdd");

botaoWdd.addEventListener("click", () => {
    const cursosWdd = cursos.filter((curso) => curso.assunto === "WDD");

    exibirCursos(cursosWdd);
});

const botaoCse = document.querySelector("#cse");

botaoCse.addEventListener("click", () => {
    const cursosCse = cursos.filter((curso) => curso.assunto === "CSE");

    exibirCursos(cursosCse);
});
