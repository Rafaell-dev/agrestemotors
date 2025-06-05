const detalhesVeiculo = (() => {
    "use strict";

    class DetalhesVeiculo {
        constructor() {
            this.imagensVeiculo = [
                './assets/vehicles/main_photos/ford_0.jpeg',
                './assets/vehicles/main_photos/ford_1.jpeg',
                './assets/vehicles/main_photos/ford_2.jpeg',
                './assets/vehicles/main_photos/ford_3.jpeg',
                './assets/vehicles/main_photos/ford_4.jpeg',
                './assets/vehicles/main_photos/ford_5.jpeg',
                './assets/vehicles/main_photos/ford_6.jpeg',
                './assets/vehicles/main_photos/ford_7.jpeg'
            ];

            this.indiceImagemAtual = 0;
            this.intervaloAutoplay = null;
            this.tempoAutoplay = 5000;
            this.autoplayAtivo = true;
            this.permitirScrollAutomatico = true;

            this.inicializar();
        }

        inicializar() {
            this.inicializarGaleria();
            this.inicializarBotoesContato();
            this.inicializarAbas();
            this.adicionarNavegacaoTeclado();
            this.adicionarSuporteTouch();
            this.adicionarEfeitosCarregamentoImagem();
            this.iniciarAutoplay();
            this.atualizarContadorImagens();
        }

        inicializarGaleria() {
            const containerMiniaturas = document.getElementById("thumbnails");
            const elementoTotalImagens = document.getElementById("totalImages");

            if (!containerMiniaturas || !elementoTotalImagens) return;

            elementoTotalImagens.textContent = this.imagensVeiculo.length;

            this.imagensVeiculo.forEach((imagem, indice) => {
                const miniatura = document.createElement("div");
                miniatura.className = `thumbnail ${indice === 0 ? "active" : ""}`;
                miniatura.innerHTML = `<img src="${imagem}" alt="Imagem ${indice + 1}" loading="lazy">`;
                miniatura.addEventListener("click", () => this.selecionarImagem(indice));
                containerMiniaturas.appendChild(miniatura);
            });

            const secaoGaleria = document.querySelector(".gallery-section");
            if (secaoGaleria) {
                secaoGaleria.addEventListener("mouseenter", () => this.pausarAutoplay());
                secaoGaleria.addEventListener("mouseleave", () => this.retomarAutoplay());
            }
        }

        alterarImagem(direcao) {
            this.permitirScrollAutomatico = false;
            this.indiceImagemAtual += direcao;

            if (this.indiceImagemAtual >= this.imagensVeiculo.length) {
                this.indiceImagemAtual = 0;
            } else if (this.indiceImagemAtual < 0) {
                this.indiceImagemAtual = this.imagensVeiculo.length - 1;
            }

            this.atualizarImagemPrincipal();
            this.atualizarMiniaturas();
            this.atualizarContadorImagens();
            this.reiniciarAutoplay();
            
            setTimeout(() => {
                this.permitirScrollAutomatico = true;
            }, 1000);
        }

        selecionarImagem(indice) {
            this.permitirScrollAutomatico = true;
            this.indiceImagemAtual = indice;
            this.atualizarImagemPrincipal();
            this.atualizarMiniaturas();
            this.atualizarContadorImagens();
            this.reiniciarAutoplay();
        }

        atualizarImagemPrincipal() {
            const imagemPrincipal = document.getElementById("mainImage");
            if (!imagemPrincipal) return;

            imagemPrincipal.style.opacity = "0";

            setTimeout(() => {
                imagemPrincipal.src = this.imagensVeiculo[this.indiceImagemAtual];
                imagemPrincipal.style.opacity = "1";
            }, 150);
        }

        atualizarMiniaturas() {
            const miniaturas = document.querySelectorAll(".thumbnail");
            miniaturas.forEach((miniatura, indice) => {
                miniatura.classList.toggle("active", indice === this.indiceImagemAtual);
            });

            if (!this.permitirScrollAutomatico) return;

            const miniaturaAtiva = document.querySelector(".thumbnail.active");
            const containerMiniaturas = document.getElementById("thumbnails");
            
            if (miniaturaAtiva && containerMiniaturas && this.elementoNoViewport(containerMiniaturas)) {
                const containerRect = containerMiniaturas.getBoundingClientRect();
                const miniaturaRect = miniaturaAtiva.getBoundingClientRect();
                
                const estaVisivel = miniaturaRect.left >= containerRect.left && 
                                   miniaturaRect.right <= containerRect.right;
                
                if (!estaVisivel) {
                    miniaturaAtiva.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });
                }
            }
        }

        atualizarContadorImagens() {
            const elementoImagemAtual = document.getElementById("currentImage");
            if (elementoImagemAtual) {
                elementoImagemAtual.textContent = this.indiceImagemAtual + 1;
            }
        }

        iniciarAutoplay() {
            if (this.imagensVeiculo.length <= 1) return;

            this.intervaloAutoplay = setInterval(() => {
                this.alterarImagem(1);
            }, this.tempoAutoplay);
        }

        pausarAutoplay() {
            if (this.intervaloAutoplay) {
                clearInterval(this.intervaloAutoplay);
                this.intervaloAutoplay = null;
            }
        }

        retomarAutoplay() {
            if (this.autoplayAtivo && !this.intervaloAutoplay) {
                this.iniciarAutoplay();
            }
        }

        reiniciarAutoplay() {
            this.pausarAutoplay();
            this.retomarAutoplay();
        }

        inicializarBotoesContato() {
            const btnWhatsapp = document.querySelector(".btn-whatsapp");
            const btnTelefone = document.querySelector(".btn-phone");

            if (btnWhatsapp) {
                btnWhatsapp.addEventListener("click", () => {
                    const nomeVeiculo = document.querySelector(".vehicle-title")?.textContent || "Ford Focus SE 2.0";
                    const mensagem = encodeURIComponent(
                        `Olá! Tenho interesse no ${nomeVeiculo} anunciado no site da Agreste Motors.`
                    );
                    const urlWhatsapp = `https://wa.me/5587999999999?text=${mensagem}`;
                    window.open(urlWhatsapp, "_blank");
                });
            }

            if (btnTelefone) {
                btnTelefone.addEventListener("click", () => {
                    window.location.href = "tel:+5587999999999";
                });
            }
        }

        inicializarAbas() {
            const botaoAbas = document.querySelectorAll(".tab-btn");

            botaoAbas.forEach((btn) => {
                btn.addEventListener("click", () => {
                    this.rastrearCliqueAba(btn.textContent.trim());
                });
            });
        }

        rastrearCliqueAba(nomeAba) {
            console.log(`Aba clicada: ${nomeAba}`);
        }

        adicionarNavegacaoTeclado() {
            document.addEventListener("keydown", (e) => {
                const secaoGaleria = document.querySelector(".gallery-section");
                if (!secaoGaleria || !this.elementoNoViewport(secaoGaleria)) return;

                switch (e.key) {
                    case "ArrowLeft":
                        e.preventDefault();
                        this.alterarImagem(-1);
                        break;
                    case "ArrowRight":
                        e.preventDefault();
                        this.alterarImagem(1);
                        break;
                    case " ":
                        e.preventDefault();
                        if (this.autoplayAtivo) {
                            this.pausarAutoplay();
                            this.autoplayAtivo = false;
                        } else {
                            this.retomarAutoplay();
                            this.autoplayAtivo = true;
                        }
                        break;
                }
            });
        }

        adicionarSuporteTouch() {
            const imagemPrincipal = document.querySelector(".main-image");
            if (!imagemPrincipal) return;

            let inicioTouchX = 0;
            let fimTouchX = 0;
            let inicioTouchY = 0;
            let fimTouchY = 0;
            const distanciaMinSwipe = 50;

            imagemPrincipal.addEventListener(
                "touchstart",
                (e) => {
                    inicioTouchX = e.touches[0].clientX;
                    inicioTouchY = e.touches[0].clientY;
                },
                { passive: true }
            );

            imagemPrincipal.addEventListener(
                "touchmove",
                (e) => {
                    const atualX = e.touches[0].clientX;
                    const atualY = e.touches[0].clientY;
                    const difX = Math.abs(atualX - inicioTouchX);
                    const difY = Math.abs(atualY - inicioTouchY);

                    if (difX > difY && difX > 20) {
                        e.preventDefault();
                    }
                },
                { passive: false }
            );

            imagemPrincipal.addEventListener(
                "touchend",
                (e) => {
                    fimTouchX = e.changedTouches[0].clientX;
                    fimTouchY = e.changedTouches[0].clientY;
                    this.manipularSwipe(inicioTouchX, fimTouchX, inicioTouchY, fimTouchY, distanciaMinSwipe);
                },
                { passive: true }
            );
        }

        manipularSwipe(inicioX, fimX, inicioY, fimY, distanciaMin) {
            const difX = inicioX - fimX;
            const difY = Math.abs(inicioY - fimY);

            if (Math.abs(difX) > difY && Math.abs(difX) > distanciaMin) {
                if (difX > 0) {
                    this.alterarImagem(1);
                } else {
                    this.alterarImagem(-1);
                }
            }
        }

        adicionarEfeitosCarregamentoImagem() {
            const imagens = document.querySelectorAll("img");

            imagens.forEach((img) => {
                img.addEventListener("load", function () {
                    this.classList.add("loaded");
                });

                img.addEventListener("error", function () {
                    this.src = "/assets/placeholder.jpeg";
                    this.classList.add("loaded");
                });

                if (img.complete) {
                    img.classList.add("loaded");
                }
            });
        }

        elementoNoViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        adicionarImagem(urlImagem) {
            this.imagensVeiculo.push(urlImagem);
            this.inicializarGaleria();
        }

        removerImagem(indice) {
            if (indice >= 0 && indice < this.imagensVeiculo.length) {
                this.imagensVeiculo.splice(indice, 1);
                if (this.indiceImagemAtual >= this.imagensVeiculo.length) {
                    this.indiceImagemAtual = this.imagensVeiculo.length - 1;
                }
                this.inicializarGaleria();
                this.atualizarImagemPrincipal();
                this.atualizarContadorImagens();
            }
        }
    }

    function abrirAba(evt, nomeAba) {
        const conteudoAbas = document.getElementsByClassName("tab-content");
        const botoesAbas = document.getElementsByClassName("tab-btn");

        for (let i = 0; i < conteudoAbas.length; i++) {
            conteudoAbas[i].classList.remove("active");
        }

        for (let i = 0; i < botoesAbas.length; i++) {
            botoesAbas[i].classList.remove("active");
        }

        const abaeSelecionada = document.getElementById(nomeAba);
        if (abaeSelecionada) {
            abaeSelecionada.classList.add("active");
            evt.currentTarget.classList.add("active");
        }
    }

    function alterarImagem(direcao) {
        if (window.instanciaDetalhesVeiculo) {
            window.instanciaDetalhesVeiculo.alterarImagem(direcao);
        }
    }

    function selecionarImagem(indice) {
        if (window.instanciaDetalhesVeiculo) {
            window.instanciaDetalhesVeiculo.selecionarImagem(indice);
        }
    }

    function changeImage(direction) {
        if (window.instanciaDetalhesVeiculo) {
            window.instanciaDetalhesVeiculo.alterarImagem(direction);
        }
    }

    function selectImage(index) {
        if (window.instanciaDetalhesVeiculo) {
            window.instanciaDetalhesVeiculo.selecionarImagem(index);
        }
    }

    function openTab(evt, tabName) {
        return abrirAba(evt, tabName);
    }

    function configurarEventosVisibilidade() {
        document.addEventListener("visibilitychange", () => {
            if (window.instanciaDetalhesVeiculo) {
                if (document.hidden) {
                    window.instanciaDetalhesVeiculo.pausarAutoplay();
                } else if (window.instanciaDetalhesVeiculo.autoplayAtivo) {
                    window.instanciaDetalhesVeiculo.retomarAutoplay();
                }
            }
        });
    }

    function configurarRedimensionamento() {
        window.addEventListener("resize", () => {
            clearTimeout(window.timeoutRedimensionamento);
            window.timeoutRedimensionamento = setTimeout(() => {
                if (window.instanciaDetalhesVeiculo) {
                    window.instanciaDetalhesVeiculo.atualizarMiniaturas();
                }
            }, 250);
        });
    }

    async function inicializarDetalhes() {
        const imagemPrincipal = document.getElementById("mainImage");
        if (imagemPrincipal) {
            window.instanciaDetalhesVeiculo = new DetalhesVeiculo();
            configurarEventosVisibilidade();
            configurarRedimensionamento();
            window.abrirAba = abrirAba;
            window.alterarImagem = alterarImagem;
            window.selecionarImagem = selecionarImagem;
            window.changeImage = changeImage;
            window.selectImage = selectImage;
            window.openTab = openTab;
        } else {
            console.error("Elemento de imagem principal não encontrado.");
        }
    }

    async function inicializar() {
        await inicializarDetalhes();
    }

    return { inicializar };
})();

document.addEventListener("DOMContentLoaded", () => {
    detalhesVeiculo.inicializar();
});