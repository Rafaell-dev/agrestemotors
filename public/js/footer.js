export const footer = (() => {
    "use strict";

    const footerContainer = /*HTML*/`
    <div class="container">
    <div class="footer-content">
        <div class="footer-column footer-about">
            <img src="./assets/logo_agreste_branca.png" alt="Logo Agreste Motors" class="footer-logo">
            <p>Reconhecida no mercado de carros de luxo e superesportivos pela qualidade e confiança, a Agreste
                Motors busca trazer ao cliente a melhor experiência de negociação.</p>
            <div class="contact-info">
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-map-pin">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    Av. Rui Barbosa, 961, Heliópolis, Garanhuns - PE
                </p>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-phone">
                        <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href="tel:+558737623303">
                        (87) 3762-3303
                    </a>
                </p>
                <p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    contato@agrestemotors.com
                </p>
            </div>
        </div>
        <div class="footer-column footer-links">
            <h4>Navegação</h4>
            <ul>
                <li><a href="./vehicles.html">Veículos</a></li>
                <li><a href="#contato">Consultoria</a></li>
                <li><a href="#sobre">Sobre</a></li>
            </ul>
        </div>
        <div class="footer-column footer-map">
            <h4>Nossa Localização</h4>
            <div class="map-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.983208645259!2d-36.4791528596368!3d-8.882714307293949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7070d209c44b347%3A0x60e22fe8f42178ce!2sAv.%20Rui%20Barbosa%2C%20961%20-%20Heli%C3%B3polis%2C%20Garanhuns%20-%20PE%2C%2055295-530!5e0!3m2!1sen!2sbr!4v1748147592364!5m2!1sen!2sbr"
                    width="100%" height="250" style="border:0; border-radius: 4px;" allowfullscreen=""
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; <span id="currentYear"></span> Agreste Motors. Todos os direitos reservados.</p>
        <div class="social-icons">
            <a href="https://www.facebook.com/agrestemotors" target="_blank" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-facebook">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            </a>
            <a href="https://www.instagram.com/agrestemotors/" target="_blank" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="lucide lucide-instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            </a>
        </div>
    </div>
</div>`;

    async function carregarFooter() {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.innerHTML = footerContainer;

            const currentYear = new Date().getFullYear();
            document.getElementById('currentYear').textContent = currentYear;
        } else {
            console.error('Footer element not found.');
        }
    }

    async function inicializar() {
        await carregarFooter();
    }

    return { inicializar }
})();

