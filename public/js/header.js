export const header = (() => {
    "use strict";

    const headerContainer = /*HTML*/`
        <div class="container">
            <a href="./index.html" class="logo">
                <img src="./assets/logo_agreste_branca.png" alt="Logo branca Agreste Motors">
            </a>

            <button class="hamburger-menu"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-align-justify-icon lucide-align-justify">
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                    <path d="M3 6h18" />
                </svg>
            </button>

            <nav class="sidebar">
                <ul>
                    <li><a href="./vehicles.html">Veículos</a></li>
                    <li><a href="#contato">Consultoria</a></li>
                    <li><a href="./about.html">Sobre</a></li>
                </ul>
                <div class="sidebar-phone">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-phone">
                        <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href="tel:+558737623303">
                        (87) 3762-3303
                    </a>
                </div>
            </nav>

            <nav class="desktop-nav">
                <ul>
                    <li><a href="./vehicles.html">Veículos</a></li>
                    <li><a href="#contato">Consultoria</a></li>
                    <li><a href="./about.html">Sobre</a></li>
                </ul>
            </nav>
            <div class="desktop-phone">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-phone">
                    <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+558737623303">
                    (87) 3762-3303
                </a>
            </div>
        </div>
    `;

    function setupEventListeners() {
        const hamburgerMenu = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');

        if (!hamburgerMenu || !sidebar) {
            console.error("Hamburger menu or sidebar not found. Event listeners not attached.");
            return;
        }

        hamburgerMenu.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });

        const sidebarLinks = document.querySelectorAll('.sidebar a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function () {
                sidebar.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', function (event) {
            if (sidebar.classList.contains('active')) {
                const isClickInsideSidebar = sidebar.contains(event.target);
                const isClickOnHamburger = hamburgerMenu.contains(event.target);

                if (!isClickInsideSidebar && !isClickOnHamburger) {
                    sidebar.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                }
            }
        });
    }

    async function carregarHeader() {
        const headerElement = document.querySelector('header#header');
        if (headerElement) {
            headerElement.innerHTML = headerContainer;
            setupEventListeners();
        } else {
            console.error("Header element with id 'header' not found.");
        }
    }

    async function inicializar() {
        await carregarHeader();
    }

    return { inicializar };
})();