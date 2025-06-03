const carousel = (() => {
  "use strict";

  class CarrosselVeiculos {
      constructor() {
          this.slideAtual = 0;
          this.slides = document.querySelectorAll(".vehicle-slide");
          this.indicadores = document.querySelectorAll(".indicator");
          this.btnAnterior = document.getElementById("prevBtn");
          this.btnProximo = document.getElementById("nextBtn");
          this.intervaloAutoplay = null;
          this.delayAutoplay = 6000;
          this.estaRodando = true;

          this.inicializar();
      }

      inicializar() {
          if (this.slides.length === 0) return;

          this.configurarEventListeners();
          this.configurarSuporteToque();
          this.configurarCarregamentoImagens();
          this.iniciarAutoplay();
          this.configurarVisibilidade();
      }

      configurarEventListeners() {
          this.btnAnterior?.addEventListener("click", () => this.slideAnterior());
          this.btnProximo?.addEventListener("click", () => this.proximoSlide());

          this.indicadores.forEach((indicador, index) => {
              indicador.addEventListener("click", () => this.irParaSlide(index));
          });

          document.addEventListener("keydown", (e) => this.gerenciarTeclado(e));

          const containerCarrossel = document.querySelector(".vehicle-carousel-container");
          if (containerCarrossel) {
              containerCarrossel.addEventListener("mouseenter", () => this.pausarAutoplay());
              containerCarrossel.addEventListener("mouseleave", () => this.retomarAutoplay());
          }
      }

      irParaSlide(indiceSlide) {
          this.slides[this.slideAtual]?.classList.remove("active");
          this.indicadores[this.slideAtual]?.classList.remove("active");

          this.slideAtual = indiceSlide;

          this.slides[this.slideAtual]?.classList.add("active");
          this.indicadores[this.slideAtual]?.classList.add("active");

          this.reiniciarAutoplay();
          this.animarConteudoSlide();
      }

      proximoSlide() {
          const proximoIndice = (this.slideAtual + 1) % this.slides.length;
          this.irParaSlide(proximoIndice);
      }

      slideAnterior() {
          const indiceAnterior = (this.slideAtual - 1 + this.slides.length) % this.slides.length;
          this.irParaSlide(indiceAnterior);
      }

      animarConteudoSlide() {
          const elementoSlideAtual = this.slides[this.slideAtual];
          if (!elementoSlideAtual) return;

          const conteudo = elementoSlideAtual.querySelector(".vehicle-slide-content");
          if (conteudo) {
              conteudo.style.animation = "none";
              conteudo.offsetHeight;
              conteudo.style.animation = "slideInUp 1s ease-out";
          }
      }

      iniciarAutoplay() {
          if (this.slides.length <= 1) return;

          this.intervaloAutoplay = setInterval(() => {
              this.proximoSlide();
          }, this.delayAutoplay);
          this.estaRodando = true;
      }

      pausarAutoplay() {
          if (this.intervaloAutoplay) {
              clearInterval(this.intervaloAutoplay);
              this.intervaloAutoplay = null;
          }
      }

      retomarAutoplay() {
          if (this.estaRodando && !this.intervaloAutoplay) {
              this.iniciarAutoplay();
          }
      }

      reiniciarAutoplay() {
          this.pausarAutoplay();
          this.retomarAutoplay();
      }

      gerenciarTeclado(e) {
          switch (e.key) {
              case "ArrowLeft":
                  e.preventDefault();
                  this.slideAnterior();
                  break;
              case "ArrowRight":
                  e.preventDefault();
                  this.proximoSlide();
                  break;
              case " ":
                  e.preventDefault();
                  if (this.estaRodando) {
                      this.pausarAutoplay();
                      this.estaRodando = false;
                  } else {
                      this.retomarAutoplay();
                      this.estaRodando = true;
                  }
                  break;
          }
      }

      configurarSuporteToque() {
          const containerCarrossel = document.querySelector(".vehicle-carousel-container");
          if (!containerCarrossel) return;

          let inicioX = 0;
          let inicioY = 0;
          let fimX = 0;
          let fimY = 0;
          const distanciaMinimaDeslize = 50;

          containerCarrossel.addEventListener(
              "touchstart",
              (e) => {
                  inicioX = e.touches[0].clientX;
                  inicioY = e.touches[0].clientY;
              },
              { passive: true }
          );

          containerCarrossel.addEventListener(
              "touchmove",
              (e) => {
                  const atualX = e.touches[0].clientX;
                  const atualY = e.touches[0].clientY;
                  const difX = Math.abs(atualX - inicioX);
                  const difY = Math.abs(atualY - inicioY);

                  if (difX > difY) {
                      e.preventDefault();
                  }
              },
              { passive: false }
          );

          containerCarrossel.addEventListener(
              "touchend",
              (e) => {
                  fimX = e.changedTouches[0].clientX;
                  fimY = e.changedTouches[0].clientY;

                  const difX = inicioX - fimX;
                  const difY = Math.abs(inicioY - fimY);

                  if (Math.abs(difX) > difY && Math.abs(difX) > distanciaMinimaDeslize) {
                      if (difX > 0) {
                          this.proximoSlide();
                      } else {
                          this.slideAnterior();
                      }
                  }
              },
              { passive: true }
          );
      }

      configurarCarregamentoImagens() {
          const imagens = document.querySelectorAll(".vehicle-image-center img");
          imagens.forEach((img) => {
              img.addEventListener("load", function () {
                  this.classList.add("loaded");
              });

              if (img.complete) {
                  img.classList.add("loaded");
              }
          });
      }

      configurarVisibilidade() {
          document.addEventListener("visibilitychange", () => {
              if (document.hidden) {
                  this.pausarAutoplay();
              } else if (this.estaRodando) {
                  this.retomarAutoplay();
              }
          });
      }

      adicionarSlideVeiculo(dadosVeiculo) {
          const htmlSlide = this.criarHTMLSlide(dadosVeiculo);
          const wrapper = document.querySelector(".vehicle-carousel-wrapper");
          if (wrapper) {
              wrapper.insertAdjacentHTML("beforeend", htmlSlide);
              this.atualizarIndicadores();
          }
      }

      criarHTMLSlide(veiculo) {
          return `
              <div class="vehicle-slide">
                  <div class="vehicle-slide-content">
                      <div class="vehicle-info-left">
                          <div class="vehicle-badge">${veiculo.badge}</div>
                          <h1 class="vehicle-name">${veiculo.name}</h1>
                          <div class="vehicle-price">
                              <span class="price-label">A partir de</span>
                              <span class="price-value">R$ ${veiculo.price}</span>
                          </div>
                          <div class="vehicle-basic-info">
                              <div class="info-item">
                                  <span class="info-label">Ano:</span>
                                  <span class="info-value">${veiculo.year}</span>
                              </div>
                              <div class="info-item">
                                  <span class="info-label">KM:</span>
                                  <span class="info-value">${veiculo.km}</span>
                              </div>
                              <div class="info-item">
                                  <span class="info-label">Combustível:</span>
                                  <span class="info-value">${veiculo.fuel}</span>
                              </div>
                          </div>
                          <a href="./vehicle_details.html" class="vehicle-cta-btn">Ver Detalhes</a>
                      </div>
                      
                      <div class="vehicle-image-center">
                          <img src="${veiculo.image}" alt="${veiculo.name}">
                      </div>
                      
                      <div class="vehicle-specs-right">
                          <h3>Especificações</h3>
                          <div class="specs-list">
                              ${veiculo.specs
                                  .map(
                                      (spec) => `
                                      <div class="spec-item">
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                              <circle cx="12" cy="12" r="10"></circle>
                                              <polyline points="12,6 12,12 16,14"></polyline>
                                          </svg>
                                          <span>${spec}</span>
                                      </div>
                                  `
                                  )
                                  .join("")}
                          </div>
                      </div>
                  </div>
              </div>
          `;
      }

      atualizarIndicadores() {
          const containerIndicadores = document.querySelector(".vehicle-indicators");
          if (!containerIndicadores) return;

          containerIndicadores.innerHTML = "";

          this.slides = document.querySelectorAll(".vehicle-slide");
          this.slides.forEach((_, index) => {
              const indicador = document.createElement("span");
              indicador.className = `indicator ${index === this.slideAtual ? "active" : ""}`;
              indicador.setAttribute("data-slide", index);
              indicador.addEventListener("click", () => this.irParaSlide(index));
              containerIndicadores.appendChild(indicador);
          });

          this.indicadores = document.querySelectorAll(".indicator");
      }
  }

  function configurarRedimensionamento() {
      window.addEventListener("resize", () => {
          clearTimeout(window.resizeTimeout);
          window.resizeTimeout = setTimeout(() => {
              const carrossel = document.querySelector(".vehicle-carousel-container");
              if (carrossel) {
                  carrossel.style.display = "none";
                  carrossel.offsetHeight;
                  carrossel.style.display = "";
              }
          }, 250);
      });
  }

  async function inicializarCarrossel() {
      const containerCarrossel = document.querySelector(".vehicle-carousel-container");
      if (containerCarrossel) {
          new CarrosselVeiculos();
          configurarRedimensionamento();
      } else {
          console.error("Container do carrossel não encontrado.");
      }
  }

  async function inicializar() {
      await inicializarCarrossel();
  }

  return { inicializar };
})();

// Inicializar automaticamente quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  carousel.inicializar();
});