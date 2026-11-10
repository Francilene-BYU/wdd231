const navbtn = document.querySelector("#ham-btn");
const navlinks = document.querySelector("#nav-bar");

navbtn.addEventListener("click", () => {
    navbtn.classList.toggle("show");
    navlinks.classList.toggle("show");

    const menuAberto = navlinks.classList.contains("show");

    navbtn.setAttribute("aria-expanded", menuAberto);
    navbtn.setAttribute(
        "aria-label",
        menuAberto ? "Fechar menu" : "Abrir menu"
    );
});