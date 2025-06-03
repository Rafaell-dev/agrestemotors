const filtroVeiculos = (() => {
    "use strict";

    class FiltroVeiculos {
        constructor() {
            this.veiculos = [];
            this.veiculosFiltrados = [];
            this.filtrosAtivos = {
                busca: "",
                marcas: [],
                anoMin: null,
                anoMax: null,
                precoMin: null,
                precoMax: null,
                kmMin: null,
                kmMax: null,
                combustiveis: [],
                transmissoes: [],
            };

            this.inicializar();
        }

        inicializar() {
            this.carregarVeiculos();
            this.configurarEventListeners();
            this.configurarToggleMobile();
            this.atualizarResultados();
        }

        carregarVeiculos() {
            const cardsVeiculos = document.querySelectorAll(".car-card");
            this.veiculos = Array.from(cardsVeiculos).map((card) => ({
                elemento: card,
                marca: card.dataset.brand,
                ano: Number.parseInt(card.dataset.year),
                preco: Number.parseInt(card.dataset.price),
                km: Number.parseInt(card.dataset.km),
                combustivel: card.dataset.fuel,
                transmissao: card.dataset.transmission,
                nome: card.querySelector("h3").textContent.toLowerCase(),
            }));

            this.veiculosFiltrados = [...this.veiculos];
        }

        configurarEventListeners() {
            this.configurarBusca();
            this.configurarFiltrosMarca();
            this.configurarFiltrosCombustivel();
            this.configurarFiltrosTransmissao();
            this.configurarFiltrosAno();
            this.configurarFiltrosPreco();
            this.configurarFiltrosKm();
            this.configurarOrdenacao();
            this.configurarLimparFiltros();
        }

        configurarBusca() {
            const inputBusca = document.getElementById("searchInput");
            if (inputBusca) {
                inputBusca.addEventListener("input", (e) => {
                    this.filtrosAtivos.busca = e.target.value.toLowerCase();
                    this.aplicarFiltros();
                });
            }
        }

        configurarFiltrosMarca() {
            const checkboxesMarca = document.querySelectorAll('input[name="brand"]');
            checkboxesMarca.forEach((checkbox) => {
                checkbox.addEventListener("change", () => {
                    this.filtrosAtivos.marcas = Array.from(checkboxesMarca)
                        .filter((cb) => cb.checked)
                        .map((cb) => cb.value);
                    this.aplicarFiltros();
                });
            });
        }

        configurarFiltrosCombustivel() {
            const checkboxesCombustivel = document.querySelectorAll('input[name="fuel"]');
            checkboxesCombustivel.forEach((checkbox) => {
                checkbox.addEventListener("change", () => {
                    this.filtrosAtivos.combustiveis = Array.from(checkboxesCombustivel)
                        .filter((cb) => cb.checked)
                        .map((cb) => cb.value);
                    this.aplicarFiltros();
                });
            });
        }

        configurarFiltrosTransmissao() {
            const checkboxesTransmissao = document.querySelectorAll('input[name="transmission"]');
            checkboxesTransmissao.forEach((checkbox) => {
                checkbox.addEventListener("change", () => {
                    this.filtrosAtivos.transmissoes = Array.from(checkboxesTransmissao)
                        .filter((cb) => cb.checked)
                        .map((cb) => cb.value);
                    this.aplicarFiltros();
                });
            });
        }

        configurarFiltrosAno() {
            const inputAnoMin = document.getElementById("filterMinYear");
            const inputAnoMax = document.getElementById("filterMaxYear");

            if (inputAnoMin) {
                inputAnoMin.addEventListener("input", (e) => {
                    this.filtrosAtivos.anoMin = e.target.value ? Number.parseInt(e.target.value) : null;
                    this.aplicarFiltros();
                });
            }

            if (inputAnoMax) {
                inputAnoMax.addEventListener("input", (e) => {
                    this.filtrosAtivos.anoMax = e.target.value ? Number.parseInt(e.target.value) : null;
                    this.aplicarFiltros();
                });
            }
        }

        configurarFiltrosPreco() {
            const inputPrecoMin = document.getElementById("filterMinPrice");
            const inputPrecoMax = document.getElementById("filterMaxPrice");

            if (inputPrecoMin) {
                inputPrecoMin.addEventListener("input", (e) => {
                    this.filtrosAtivos.precoMin = e.target.value ? Number.parseInt(e.target.value) : null;
                    this.aplicarFiltros();
                });
            }

            if (inputPrecoMax) {
                inputPrecoMax.addEventListener("input", (e) => {
                    this.filtrosAtivos.precoMax = e.target.value ? Number.parseInt(e.target.value) : null;
                    this.aplicarFiltros();
                });
            }
        }

        configurarFiltrosKm() {
            const inputKmMin = document.getElementById("filterMinKm");
            const inputKmMax = document.getElementById("filterMaxKm");

            if (inputKmMin) {
                inputKmMin.addEventListener("input", (e) => {
                    this.filtrosAtivos.kmMin = e.target.value ? Number.parseInt(e.target.value) : null;
                    this.aplicarFiltros();
                });
            }

            if (inputKmMax) {
                inputKmMax.addEventListener("input", (e) => {
                    this.filtrosAtivos.kmMax = e.target.value ? Number.parseInt(e.target.value) : null;
                    this.aplicarFiltros();
                });
            }
        }

        configurarOrdenacao() {
            const selectOrdenacao = document.getElementById("sortSelect");
            if (selectOrdenacao) {
                selectOrdenacao.addEventListener("change", (e) => {
                    this.ordenarVeiculos(e.target.value);
                });
            }
        }

        configurarLimparFiltros() {
            const btnLimparFiltros = document.getElementById("clearFilters");
            if (btnLimparFiltros) {
                btnLimparFiltros.addEventListener("click", () => {
                    this.limparTodosFiltros();
                });
            }
        }

        configurarToggleMobile() {
            const btnToggle = document.getElementById("toggleFilters");
            const painelFiltros = document.getElementById("filtersPanel");
            const cabecalhoFiltro = document.querySelector(".filter-header");

            if (btnToggle && painelFiltros) {
                btnToggle.addEventListener("click", () => {
                    painelFiltros.classList.toggle("active");
                    document.body.style.overflow = painelFiltros.classList.contains("active") ? "hidden" : "";
                });

                if (cabecalhoFiltro) {
                    cabecalhoFiltro.addEventListener("click", (e) => {
                        if (window.innerWidth <= 768 && e.target === cabecalhoFiltro) {
                            painelFiltros.classList.remove("active");
                            document.body.style.overflow = "";
                        }
                    });
                }

                document.addEventListener("click", (e) => {
                    if (
                        window.innerWidth <= 768 &&
                        !painelFiltros.contains(e.target) &&
                        !btnToggle.contains(e.target) &&
                        painelFiltros.classList.contains("active")
                    ) {
                        painelFiltros.classList.remove("active");
                        document.body.style.overflow = "";
                    }
                });
            }
        }

        aplicarFiltros() {
            this.veiculosFiltrados = this.veiculos.filter((veiculo) => {
                if (this.filtrosAtivos.busca && !veiculo.nome.includes(this.filtrosAtivos.busca)) {
                    return false;
                }

                if (this.filtrosAtivos.marcas.length > 0 && !this.filtrosAtivos.marcas.includes(veiculo.marca)) {
                    return false;
                }

                if (this.filtrosAtivos.anoMin && veiculo.ano < this.filtrosAtivos.anoMin) {
                    return false;
                }
                if (this.filtrosAtivos.anoMax && veiculo.ano > this.filtrosAtivos.anoMax) {
                    return false;
                }

                if (this.filtrosAtivos.precoMin && veiculo.preco < this.filtrosAtivos.precoMin) {
                    return false;
                }
                if (this.filtrosAtivos.precoMax && veiculo.preco > this.filtrosAtivos.precoMax) {
                    return false;
                }

                if (this.filtrosAtivos.kmMin && veiculo.km < this.filtrosAtivos.kmMin) {
                    return false;
                }
                if (this.filtrosAtivos.kmMax && veiculo.km > this.filtrosAtivos.kmMax) {
                    return false;
                }

                if (this.filtrosAtivos.combustiveis.length > 0 && !this.filtrosAtivos.combustiveis.includes(veiculo.combustivel)) {
                    return false;
                }

                if (
                    this.filtrosAtivos.transmissoes.length > 0 &&
                    !this.filtrosAtivos.transmissoes.includes(veiculo.transmissao)
                ) {
                    return false;
                }

                return true;
            });

            this.atualizarResultados();
            this.atualizarContadorFiltrosAtivos();
        }

        ordenarVeiculos(ordenarPor) {
            switch (ordenarPor) {
                case "price-asc":
                    this.veiculosFiltrados.sort((a, b) => a.preco - b.preco);
                    break;
                case "price-desc":
                    this.veiculosFiltrados.sort((a, b) => b.preco - a.preco);
                    break;
                case "year-asc":
                    this.veiculosFiltrados.sort((a, b) => a.ano - b.ano);
                    break;
                case "year-desc":
                    this.veiculosFiltrados.sort((a, b) => b.ano - a.ano);
                    break;
                case "km-asc":
                    this.veiculosFiltrados.sort((a, b) => a.km - b.km);
                    break;
                case "km-desc":
                    this.veiculosFiltrados.sort((a, b) => b.km - a.km);
                    break;
            }

            this.atualizarResultados();
        }

        atualizarResultados() {
            const gradeVeiculos = document.getElementById("vehiclesGrid");
            const semResultados = document.getElementById("noResults");
            const contadorResultados = document.getElementById("resultsCount");

            this.veiculos.forEach((veiculo) => {
                veiculo.elemento.style.display = "none";
            });

            this.veiculosFiltrados.forEach((veiculo, index) => {
                veiculo.elemento.style.display = "block";
                veiculo.elemento.style.animationDelay = `${index * 0.1}s`;
            });

            const contador = this.veiculosFiltrados.length;
            if (contadorResultados) {
                contadorResultados.textContent = `${contador} veículo${contador !== 1 ? "s" : ""} encontrado${contador !== 1 ? "s" : ""}`;
            }

            if (semResultados) {
                semResultados.style.display = contador === 0 ? "block" : "none";
            }

            if (window.innerWidth <= 768) {
                const painelFiltros = document.getElementById("filtersPanel");
                if (painelFiltros && painelFiltros.classList.contains("active")) {
                    setTimeout(() => {
                        painelFiltros.classList.remove("active");
                        document.body.style.overflow = "";
                    }, 300);
                }
            }
        }

        atualizarContadorFiltrosAtivos() {
            const contadorFiltrosAtivos = document.getElementById("activeFiltersCount");
            if (!contadorFiltrosAtivos) return;

            let contador = 0;

            if (this.filtrosAtivos.busca) contador++;
            if (this.filtrosAtivos.marcas.length > 0) contador++;
            if (this.filtrosAtivos.anoMin || this.filtrosAtivos.anoMax) contador++;
            if (this.filtrosAtivos.precoMin || this.filtrosAtivos.precoMax) contador++;
            if (this.filtrosAtivos.kmMin || this.filtrosAtivos.kmMax) contador++;
            if (this.filtrosAtivos.combustiveis.length > 0) contador++;
            if (this.filtrosAtivos.transmissoes.length > 0) contador++;

            contadorFiltrosAtivos.textContent = contador;
            contadorFiltrosAtivos.style.display = contador > 0 ? "flex" : "none";
        }

        limparTodosFiltros() {
            this.filtrosAtivos = {
                busca: "",
                marcas: [],
                anoMin: null,
                anoMax: null,
                precoMin: null,
                precoMax: null,
                kmMin: null,
                kmMax: null,
                combustiveis: [],
                transmissoes: [],
            };

            const inputBusca = document.getElementById("searchInput");
            if (inputBusca) inputBusca.value = "";

            const inputsNumero = document.querySelectorAll('input[type="number"]');
            inputsNumero.forEach((input) => (input.value = ""));

            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach((checkbox) => (checkbox.checked = false));

            const selectOrdenacao = document.getElementById("sortSelect");
            if (selectOrdenacao) selectOrdenacao.value = "price-asc";

            this.veiculosFiltrados = [...this.veiculos];
            this.atualizarResultados();
            this.atualizarContadorFiltrosAtivos();
        }

        adicionarVeiculo(dadosVeiculo) {
            const htmlVeiculo = this.criarHTMLVeiculo(dadosVeiculo);
            const gradeVeiculos = document.getElementById("vehiclesGrid");
            if (gradeVeiculos) {
                gradeVeiculos.insertAdjacentHTML("beforeend", htmlVeiculo);
                this.carregarVeiculos();
                this.aplicarFiltros();
            }
        }

        criarHTMLVeiculo(veiculo) {
            return `
                <div class="car-card" data-brand="${veiculo.marca}" data-year="${veiculo.ano}" 
                     data-price="${veiculo.preco}" data-km="${veiculo.km}" 
                     data-fuel="${veiculo.combustivel}" data-transmission="${veiculo.transmissao}">
                  <div class="car-card-image">
                    <img src="${veiculo.imagem}" alt="${veiculo.nome}">
                    ${veiculo.distintivo ? `<div class="car-badge">${veiculo.distintivo}</div>` : ""}
                  </div>
                  <div class="car-card-details">
                    <h3>${veiculo.nome}</h3>
                    <p class="price">R$<span>${veiculo.preco.toLocaleString("pt-BR")}</span></p>
                    <p class="specs">${veiculo.ano} - ${veiculo.km.toLocaleString("pt-BR")}KM - ${veiculo.combustivel.toUpperCase()}</p>
                    <div class="car-features">
                      ${veiculo.caracteristicas.map((caracteristica) => `<span class="feature">${caracteristica}</span>`).join("")}
                    </div>
                  </div>
                </div>
            `;
        }
    }

    function configurarRedimensionamento() {
        window.addEventListener("resize", () => {
            const painelFiltros = document.getElementById("filtersPanel");
            if (window.innerWidth > 768 && painelFiltros) {
                painelFiltros.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }

    function limparTodosFiltros() {
        if (window.instanciaFiltroVeiculos) {
            window.instanciaFiltroVeiculos.limparTodosFiltros();
        }
    }

    async function inicializarFiltro() {
        const gradeVeiculos = document.getElementById("vehiclesGrid");
        if (gradeVeiculos) {
            window.instanciaFiltroVeiculos = new FiltroVeiculos();
            configurarRedimensionamento();
            window.limparTodosFiltros = limparTodosFiltros;
        } else {
            console.error("Grid de veículos não encontrado.");
        }
    }

    async function inicializar() {
        await inicializarFiltro();
    }

    return { inicializar };
})();

// Inicializar automaticamente quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    filtroVeiculos.inicializar();
});