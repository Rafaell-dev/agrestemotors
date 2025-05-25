document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');

    hamburgerMenu.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });

    // Fechar o sidebar ao clicar em um link
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebar.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });

    // Opcional: Fechar o sidebar ao clicar fora dele
    document.addEventListener('click', function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnHamburger = hamburgerMenu.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
    });
});
