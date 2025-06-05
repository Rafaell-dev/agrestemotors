const paginaConsultoria = (() => {
    "use strict";

    class PaginaConsultoria {
        constructor() {
            this.formulario = null;
            this.estaEnviando = false;
            this.inicializar();
        }

        inicializar() {
            this.configurarFormulario();
            this.configurarFaq();
            this.configurarRolagemSuave();
            this.configurarAnimacoes();
            this.configurarMascaraTelefone();
        }

        configurarFormulario() {
            this.formulario = document.getElementById("consultationForm");
            if (!this.formulario) return;

            this.formulario.addEventListener("submit", (e) => this.manipularEnvioFormulario(e));

            const camposObrigatorios = this.formulario.querySelectorAll("[required]");
            camposObrigatorios.forEach((campo) => {
                campo.addEventListener("blur", () => this.validarCampo(campo));
                campo.addEventListener("input", () => this.limparErroCampo(campo));
            });
        }

        configurarMascaraTelefone() {
            const inputTelefone = document.getElementById("telefone");
            if (!inputTelefone) return;

            inputTelefone.addEventListener("input", (e) => {
                let valor = e.target.value.replace(/\D/g, "");

                if (valor.length <= 11) {
                    if (valor.length <= 10) {
                        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
                    } else {
                        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
                    }
                }

                e.target.value = valor;
            });
        }

        validarCampo(campo) {
            const valor = campo.value.trim();
            let ehValido = true;
            let mensagemErro = "";

            this.limparErroCampo(campo);

            if (campo.hasAttribute("required") && !valor) {
                ehValido = false;
                mensagemErro = "Este campo é obrigatório";
            } else if (campo.type === "email" && valor) {
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexEmail.test(valor)) {
                    ehValido = false;
                    mensagemErro = "Digite um e-mail válido";
                }
            } else if (campo.type === "tel" && valor) {
                const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (!regexTelefone.test(valor)) {
                    ehValido = false;
                    mensagemErro = "Digite um telefone válido";
                }
            }

            if (!ehValido) {
                this.mostrarErroCampo(campo, mensagemErro);
            }

            return ehValido;
        }

        mostrarErroCampo(campo, mensagem) {
            campo.classList.add("error");

            let elementoErro = campo.parentNode.querySelector(".field-error");
            if (!elementoErro) {
                elementoErro = document.createElement("span");
                elementoErro.className = "field-error";
                campo.parentNode.appendChild(elementoErro);
            }

            elementoErro.textContent = mensagem;
        }

        limparErroCampo(campo) {
            campo.classList.remove("error");
            const elementoErro = campo.parentNode.querySelector(".field-error");
            if (elementoErro) {
                elementoErro.remove();
            }
        }

        async manipularEnvioFormulario(e) {
            e.preventDefault();

            if (this.estaEnviando) return;

            const camposObrigatorios = this.formulario.querySelectorAll("[required]");
            let formularioValido = true;

            camposObrigatorios.forEach((campo) => {
                if (!this.validarCampo(campo)) {
                    formularioValido = false;
                }
            });

            if (!formularioValido) {
                this.mostrarMensagem("Por favor, corrija os erros no formulário.", "error");
                return;
            }

            this.estaEnviando = true;
            this.definirCarregamentoFormulario(true);

            try {
                await this.enviarFormulario();
                this.mostrarMensagemSucesso();
                this.formulario.reset();
            } catch (erro) {
                this.mostrarMensagem("Erro ao enviar formulário. Tente novamente.", "error");
            } finally {
                this.estaEnviando = false;
                this.definirCarregamentoFormulario(false);
            }
        }

        async enviarFormulario() {
            return new Promise((resolver) => {
                setTimeout(() => {
                    console.log("Formulário enviado com sucesso");
                    resolver();
                }, 2000);
            });
        }

        definirCarregamentoFormulario(carregando) {
            const botaoEnviar = this.formulario.querySelector(".btn-submit");
            const containerFormulario = document.querySelector(".form-container");

            if (carregando) {
                botaoEnviar.classList.add("loading");
                botaoEnviar.disabled = true;
                botaoEnviar.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                    Enviando...
                `;
                containerFormulario.classList.add("loading");
            } else {
                botaoEnviar.classList.remove("loading");
                botaoEnviar.disabled = false;
                botaoEnviar.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Solicitar Consultoria Gratuita
                `;
                containerFormulario.classList.remove("loading");
            }
        }

        mostrarMensagemSucesso() {
            const mensagem = `
                <div class="success-message">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22,4 12,14.01 9,11.01"></polyline>
                    </svg>
                    <div>
                        <strong>Solicitação enviada com sucesso!</strong><br>
                        Nossa equipe entrará em contato em até 2 horas.
                    </div>
                </div>
            `;

            const cabecalhoFormulario = document.querySelector(".form-header");
            cabecalhoFormulario.insertAdjacentHTML("afterend", mensagem);

            setTimeout(() => {
                const mensagemSucesso = document.querySelector(".success-message");
                if (mensagemSucesso) {
                    mensagemSucesso.remove();
                }
            }, 10000);
        }

        mostrarMensagem(texto, tipo = "info") {
            const classMensagem = tipo === "error" ? "error-message" : "success-message";
            const caminhoIcone = tipo === "error"
                ? "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
                : "M22 11.08V12a10 10 0 1 1-5.93-9.14";

            const mensagem = `
                <div class="${classMensagem}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="${caminhoIcone}"></path>
                        ${tipo === "error" ? '<line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>' : '<polyline points="22,4 12,14.01 9,11.01"></polyline>'}
                    </svg>
                    <span>${texto}</span>
                </div>
            `;

            const cabecalhoFormulario = document.querySelector(".form-header");

            const mensagensExistentes = document.querySelectorAll(".success-message, .error-message");
            mensagensExistentes.forEach((msg) => msg.remove());

            cabecalhoFormulario.insertAdjacentHTML("afterend", mensagem);

            setTimeout(() => {
                const elementoMensagem = document.querySelector(`.${classMensagem}`);
                if (elementoMensagem) {
                    elementoMensagem.remove();
                }
            }, 5000);
        }

        configurarFaq() {
            const itensFaq = document.querySelectorAll(".faq-item");

            itensFaq.forEach((item) => {
                const pergunta = item.querySelector(".faq-question");
                pergunta.addEventListener("click", () => {
                    itensFaq.forEach((outroItem) => {
                        if (outroItem !== item && outroItem.classList.contains("active")) {
                            outroItem.classList.remove("active");
                        }
                    });
                });
            });
        }

        configurarRolagemSuave() {
            const links = document.querySelectorAll('a[href^="#"]');

            links.forEach((link) => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const idAlvo = link.getAttribute("href");
                    const elementoAlvo = document.querySelector(idAlvo);

                    if (elementoAlvo) {
                        const alturaCabecalho = document.querySelector("#header")?.offsetHeight || 0;
                        const posicaoAlvo = elementoAlvo.offsetTop - alturaCabecalho - 20;

                        window.scrollTo({
                            top: posicaoAlvo,
                            behavior: "smooth",
                        });
                    }
                });
            });
        }

        configurarAnimacoes() {
            const opcaoObservador = {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            };

            const observador = new IntersectionObserver((entradas) => {
                entradas.forEach((entrada) => {
                    if (entrada.isIntersecting) {
                        entrada.target.style.opacity = "1";
                        entrada.target.style.transform = "translateY(0)";
                    }
                });
            }, opcaoObservador);

            const elementosAnimados = document.querySelectorAll(`
                .benefit-card,
                .step-item,
                .testimonial-card,
                .faq-item
            `);

            elementosAnimados.forEach((el) => {
                el.style.opacity = "0";
                el.style.transform = "translateY(20px)";
                el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
                observador.observe(el);
            });
        }

        rastrearInteracao(acao, elemento) {
            console.log(`Interação do usuário: ${acao} em ${elemento}`);
        }
    }

    function alternarFaq(elemento) {
        const itemFaq = elemento.closest(".faq-item");
        const estaAtivo = itemFaq.classList.contains("active");

        document.querySelectorAll(".faq-item").forEach((item) => {
            item.classList.remove("active");
        });

        if (!estaAtivo) {
            itemFaq.classList.add("active");
        }
    }

    function configurarRedimensionamento() {
        window.addEventListener("resize", () => {
            clearTimeout(window.timeoutRedimensionamento);
            window.timeoutRedimensionamento = setTimeout(() => {
                console.log("Janela redimensionada");
            }, 250);
        });
    }

    async function inicializarConsultoria() {
        window.instanciaPaginaConsultoria = new PaginaConsultoria();
        configurarRedimensionamento();
        window.alternarFaq = alternarFaq;
    }

    async function inicializar() {
        await inicializarConsultoria();
    }

    return { inicializar };
})();

document.addEventListener("DOMContentLoaded", () => {
    paginaConsultoria.inicializar();
});