/**
 * TruckFleet - JavaScript Principal
 * Funcionalidades básicas para el sitio demo (Frontend únicamente)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar tooltips de Bootstrap si existen
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map((tooltipTriggerEl) => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Marcar enlace activo en navbar según página actual
  setActiveNavLink();

  // Añadir efecto fade-in a elementos al cargar
  addFadeInAnimation();

  // Smooth scroll para enlaces internos
  handleSmoothScroll();

  // Año dinámico en footer
  updateCopyrightYear();

  // Validación básica del formulario de contacto (demo)
  handleContactForm();

  // Precarga el mensaje si se llega desde el detalle de un camión
  prefillContactForm();

  // Inicializar carruseles de camiones
  initTruckCarousels();

  // Inicializar modal de zoom
  initTruckZoomModal();

  // Animación de contadores al entrar en vista
  initCountUpCounters();
});

// Al cambiar de idioma se refrescan los textos generados por este script.
document.addEventListener("truckfleet:languagechange", () => {
  refreshContactPrefillLanguage();
  refreshCarouselDescriptions();
  refreshZoomModalLanguage();
});

/**
 * Marca el enlace de navegación activo según la URL actual
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop();
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    // Caso especial para index.html
    if (
      (currentPage === "" || currentPage === "index.html") &&
      (linkPage === "index.html" || linkPage === "")
    ) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else if (linkPage === currentPage && currentPage !== "") {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * Añade animación fade-in a secciones
 */
function addFadeInAnimation() {
  const sections = document.querySelectorAll("section, .page-header");

  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";

    setTimeout(() => {
      section.classList.add("fade-in");
    }, index * 50);
  });
}

/**
 * Maneja smooth scroll para anclas
 */
function handleSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Solo si es ancla interna
      if (href !== "#" && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 76; // Navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/**
 * Actualiza el año en el copyright del footer
 */
function updateCopyrightYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }
}

/**
 * Manejo básico del formulario de contacto (Solo demostrativo, frontend)
 */
function handleContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Obtener datos del formulario
      const formData = new FormData(contactForm);
      const name = formData.get("name") || document.getElementById("name")?.value;
      const email =
        formData.get("email") || document.getElementById("email")?.value;

      // Validación básica
      if (!name || !email) {
        showAlert(t("Por favor, completa todos los campos obligatorios."), "danger");
        return;
      }

      // Simulación de envío (Demo - Solo frontend)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>${t(
        "Enviando..."
      )}`;

      // Simular delay de envío
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;

        // Mostrar mensaje de éxito
        showAlert(
          t("¡Gracias por tu mensaje! Nos pondremos en contacto contigo muy pronto."),
          "success"
        );

        // Resetear formulario
        contactForm.reset();
      }, 1500);
    });
  }
}

/**
 * Precarga el formulario de contacto cuando se llega desde la página de
 * detalle de un camión (contact.html?truck=<nombre de la unidad>) o desde
 * repuestos (contact.html?part=<nombre del repuesto>).
 */
function prefillContactForm() {
  const message = document.getElementById("message");

  if (!message || message.value.trim()) return;

  const params = new URLSearchParams(window.location.search);
  const part = params.get("part");
  const unit = params.get("unit") || params.get("truck");

  if (part) {
    message.value = t("Hola, me interesa el repuesto {part}. ¿Podrían darme una cotización?", {
      part: part,
    });
    return;
  }

  if (!unit) return;

  message.value = t("Hola, me interesa el {truck}. ¿Podrían darme más información?", {
    truck: unit,
  });
}

/**
 * Vuelve a redactar el mensaje precargado cuando cambia el idioma.
 * Solo actúa si el usuario no ha modificado el texto.
 */
function refreshContactPrefillLanguage() {
  const message = document.getElementById("message");
  if (!message) return;

  const params = new URLSearchParams(window.location.search);
  const part = params.get("part");
  const unit = params.get("unit") || params.get("truck");

  if (part) {
    const current = message.value.trim();
    const spanishPrefill = `Hola, me interesa el repuesto ${part}. ¿Podrían darme una cotización?`;
    const englishPrefill = `Hello, I am interested in the spare part ${part}. Could you send me a quote?`;

    if (current !== spanishPrefill && current !== englishPrefill) return;

    message.value = t("Hola, me interesa el repuesto {part}. ¿Podrían darme una cotización?", {
      part: part,
    });
    return;
  }

  if (!unit) return;

  const current = message.value.trim();
  const spanishPrefill = `Hola, me interesa el ${unit}. ¿Podrían darme más información?`;
  const englishPrefill = `Hello, I am interested in the ${unit}. Could you give me more information?`;

  if (current !== spanishPrefill && current !== englishPrefill) return;

  message.value = t("Hola, me interesa el {truck}. ¿Podrían darme más información?", {
    truck: unit,
  });
}

/**
 * Actualiza la descripción visible de cada carrusel tras un cambio de idioma.
 * El carrusel reemplaza el nodo de texto original al navegar, por lo que hay
 * que volver a leer el `data-desc` ya traducido por i18n.js.
 */
function refreshCarouselDescriptions() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const descEl = carousel.parentElement.querySelector("[data-carousel-desc]");
    if (!descEl) return;

    const activeItem = carousel.querySelector(".truck-carousel-item.active");
    if (activeItem) {
      descEl.textContent = activeItem.getAttribute("data-desc") || "";
    }
  });
}

/**
 * Actualiza las etiquetas accesibles y la ayuda del modal de zoom.
 * Si el modal está abierto se cierra para no mezclar idiomas en su contenido.
 */
function refreshZoomModalLanguage() {
  const closeBtn = document.getElementById("truckZoomClose");
  const prevBtn = document.getElementById("truckZoomPrev");
  const nextBtn = document.getElementById("truckZoomNext");

  if (closeBtn) closeBtn.setAttribute("aria-label", t("Cerrar"));
  if (prevBtn) prevBtn.setAttribute("aria-label", t("Imagen anterior"));
  if (nextBtn) nextBtn.setAttribute("aria-label", t("Imagen siguiente"));

  updateZoomImageHint();

  const modal = document.getElementById("truckZoomModal");
  if (modal && modal.classList.contains("active")) {
    closeZoomModal();
  }
}

/**
 * Muestra alerta Bootstrap
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de alerta (success, danger, warning, info)
 */
function showAlert(message, type = "info") {
  // Eliminar alertas anteriores
  const existingAlert = document.querySelector(".alert-floating");
  if (existingAlert) {
    existingAlert.remove();
  }

  // Crear alerta
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show alert-floating shadow-lg`;
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="${t("Cerrar")}"></button>
  `;

  // Estilos para alerta flotante
  alertDiv.style.position = "fixed";
  alertDiv.style.top = "90px";
  alertDiv.style.right = "20px";
  alertDiv.style.zIndex = "1055";
  alertDiv.style.maxWidth = "400px";
  alertDiv.style.minWidth = "320px";

  // Añadir al body
  document.body.appendChild(alertDiv);

  // Auto-eliminar después de 5 segundos
  setTimeout(() => {
    if (alertDiv && alertDiv.parentNode) {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertDiv);
      bsAlert.close();
    }
  }, 5000);
}

/**
 * Función de utilidad para formatear precios (Demo)
 * @param {number} price - Precio numérico
 * @returns {string} Precio formateado
 */
function formatPrice(price) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Inicializar carruseles de camiones
 */
function initTruckCarousels() {
  const carousels = document.querySelectorAll("[data-carousel]");

  carousels.forEach((carousel) => {
    // Evita duplicar listeners si el listado se vuelve a renderizar
    if (carousel.dataset.carouselReady === "true") return;
    carousel.dataset.carouselReady = "true";

    const items = carousel.querySelectorAll(".truck-carousel-item");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const descEl = carousel.parentElement.querySelector("[data-carousel-desc]");
    const featuresList = carousel.parentElement.querySelector(".service-card-features");
    const featureItems = featuresList
      ? Array.from(featuresList.querySelectorAll("li"))
      : [];

    if (items.length <= 1) {
      if (prevBtn) prevBtn.style.display = "none";
      if (nextBtn) nextBtn.style.display = "none";
      return;
    }

    let currentIndex = 0;

    function updateCarousel() {
      items.forEach((item, index) => {
        if (index === currentIndex) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });

      if (descEl) {
        const activeItem = items[currentIndex];
        const desc = activeItem.getAttribute("data-desc") || "";
        descEl.textContent = desc;
      }

      // Resalta el item correspondiente en la lista de features de la tarjeta.
      if (featureItems.length) {
        featureItems.forEach((item, index) => {
          if (index === currentIndex) {
            item.classList.add("is-active");
          } else {
            item.classList.remove("is-active");
          }
        });
      }

      // Notifica la imagen visible para sincronizar componentes externos
      // (por ejemplo, las miniaturas de la página de detalle).
      carousel.dispatchEvent(
        new CustomEvent("truck-carousel:change", {
          detail: { index: currentIndex },
        })
      );
    }

    // Permite que componentes externos (miniaturas) cambien de imagen.
    carousel.addEventListener("truck-carousel:go", (event) => {
      const index = Number(event.detail && event.detail.index);

      if (!Number.isInteger(index) || index < 0 || index >= items.length) {
        return;
      }

      currentIndex = index;
      updateCarousel();
    });

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
      });
    }

    updateCarousel();
  });
}

/* ===================================
   Animación de contadores (count-up)
   =================================== */

/**
 * Anima un contador desde 0 hasta su valor objetivo cuando entra en vista.
 * Se ejecuta una sola vez por elemento.
 */
function initCountUpCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach((el) => {
    const suffix = el.getAttribute("data-suffix") || "";
    el.textContent = "0" + suffix;
    observer.observe(el);
  });
}

/* ===================================
   Modal de Zoom (carrusel de imágenes)
   =================================== */

/**
 * Estado compartido del carrusel del modal de zoom.
 *
 * Se mantiene fuera de `initTruckZoomModal()` para que los listeners
 * creados una sola vez (flechas, teclado) y los clics sobre las imágenes
 * (que se re-vinculan cada vez que se renderiza el inventario) trabajen
 * siempre con los mismos datos.
 */
const zoomModalState = {
  items: [],
  currentIndex: 0,
  simpleMode: false,
};

/**
 * Inicializar modal de zoom
 */
function initTruckZoomModal() {
  // Crear modal si no existe
  if (!document.getElementById("truckZoomModal")) {
    const modal = document.createElement("div");
    modal.id = "truckZoomModal";
    modal.className = "truck-zoom-modal";
    modal.innerHTML = `
      <button class="truck-zoom-modal-close" id="truckZoomClose" aria-label="${t("Cerrar")}">
        <i class="bi bi-x"></i>
      </button>
      <button class="truck-zoom-modal-arrow truck-zoom-modal-prev" id="truckZoomPrev" aria-label="${t("Imagen anterior")}">
        <span aria-hidden="true">&lt;</span>
      </button>
      <div class="truck-zoom-modal-content">
        <img src="" alt="" class="truck-zoom-modal-img" id="truckZoomImg" draggable="false" />
        <div class="truck-zoom-modal-desc" id="truckZoomDesc"></div>
        <div class="truck-zoom-modal-counter" id="truckZoomCounter"></div>
        <div class="truck-zoom-modal-hint" id="truckZoomHint"></div>
      </div>
      <button class="truck-zoom-modal-arrow truck-zoom-modal-next" id="truckZoomNext" aria-label="${t("Imagen siguiente")}">
        <span aria-hidden="true">&gt;</span>
      </button>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById("truckZoomClose");
    const prevBtn = document.getElementById("truckZoomPrev");
    const nextBtn = document.getElementById("truckZoomNext");

    closeBtn.addEventListener("click", closeZoomModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeZoomModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (modal.classList.contains("active")) {
        if (e.key === "Escape") {
          closeZoomModal();
        } else if (e.key === "ArrowLeft") {
          navigateZoom(-1);
        } else if (e.key === "ArrowRight") {
          navigateZoom(1);
        }
      }
    });

    prevBtn.addEventListener("click", () => navigateZoom(-1));
    nextBtn.addEventListener("click", () => navigateZoom(1));

    // Zoom profundo sobre la imagen (clic para acercar, arrastre para mover)
    const img = document.getElementById("truckZoomImg");
    img.addEventListener("pointerdown", handleZoomImagePointerDown);
    img.addEventListener("pointermove", handleZoomImagePointerMove);
    img.addEventListener("pointerup", handleZoomImagePointerUp);
    img.addEventListener("pointercancel", handleZoomImagePointerUp);
    img.addEventListener("dblclick", (e) => e.preventDefault());
  }

  // Agregar eventos a imágenes de carrusel
  document.querySelectorAll(".truck-carousel-item .truck-card-img").forEach((img) => {
    // Evita duplicar listeners si el listado se vuelve a renderizar
    if (img.dataset.zoomReady === "true") return;
    img.dataset.zoomReady = "true";

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      const carousel = img.closest("[data-carousel]");
      if (!carousel) return;

      const items = carousel.querySelectorAll(".truck-carousel-item");
      const currentItem = img.closest(".truck-carousel-item");
      const index = Array.from(items).indexOf(currentItem);

      const zoomItems = Array.from(items).map((item) => {
        const itemImg = item.querySelector(".truck-card-img");
        return {
          src: itemImg.src,
          alt: itemImg.alt,
          desc: item.getAttribute("data-desc") || "",
        };
      });

      zoomModalState.items = zoomItems;
      zoomModalState.currentIndex = index;
      zoomModalState.simpleMode = !!img.closest(".service-card");

      updateZoomModal();
      const modal = document.getElementById("truckZoomModal");
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
}

/**
 * Cierra el modal de zoom
 */
function closeZoomModal() {
  const modal = document.getElementById("truckZoomModal");
  if (!modal) return;

  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

/**
 * Avanza o retrocede dentro del carrusel de imágenes del modal de zoom
 * @param {number} direction - -1 para la imagen anterior, 1 para la siguiente
 */
function navigateZoom(direction) {
  if (zoomModalState.items.length <= 1) return;

  zoomModalState.currentIndex =
    (zoomModalState.currentIndex + direction + zoomModalState.items.length) %
    zoomModalState.items.length;
  updateZoomModal();
}

/**
 * Actualiza la imagen, la descripción, el contador y las flechas del modal
 */
function updateZoomModal() {
  const img = document.getElementById("truckZoomImg");
  const desc = document.getElementById("truckZoomDesc");
  const counter = document.getElementById("truckZoomCounter");
  const prevBtn = document.getElementById("truckZoomPrev");
  const nextBtn = document.getElementById("truckZoomNext");

  if (!img) return;

  const total = zoomModalState.items.length;
  const item = zoomModalState.items[zoomModalState.currentIndex];
  if (!item) return;

  img.src = item.src;
  img.alt = item.alt;

  if (desc) desc.textContent = item.desc || "";
  if (counter) {
    if (zoomModalState.simpleMode) {
      counter.style.display = "none";
    } else {
      counter.style.display = "";
      counter.textContent =
        total > 1 ? `${zoomModalState.currentIndex + 1} / ${total}` : "";
    }
  }
  const hintEl = document.getElementById("truckZoomHint");
  if (hintEl) {
    hintEl.style.display = zoomModalState.simpleMode ? "none" : "";
  }
  const zoomImg = document.getElementById("truckZoomImg");
  if (zoomImg) {
    zoomImg.style.cursor = zoomModalState.simpleMode ? "default" : "";
  }

  // Reinicia la transición al cambiar de imagen
  img.classList.remove("truck-zoom-modal-img-anim");
  void img.offsetWidth; // Fuerza el reflow para que la animación se aplique de nuevo
  img.classList.add("truck-zoom-modal-img-anim");

  // Las flechas solo se muestran cuando hay más de una imagen
  if (prevBtn) prevBtn.style.display = total > 1 ? "flex" : "none";
  if (nextBtn) nextBtn.style.display = total > 1 ? "flex" : "none";

  // Cada imagen nueva vuelve al estado inicial de zoom
  resetZoomImage();
}

/* ===================================
   Zoom profundo de la imagen del modal
   =================================== */

/**
 * Niveles de zoom (x1 ajustado, x2.5, x6) a los que se llega
 * haciendo clic sucesivamente sobre la imagen.
 */
const ZOOM_LEVELS = [1, 2.5, 6];

/**
 * Estado del zoom profundo.
 *
 * - `scale`: factor de escala aplicado a la imagen.
 * - `tx` / `ty`: desplazamiento (px) de la imagen respecto a su posición original.
 * - `ox` / `oy`: punto ancla de la imagen (en coordenadas de la caja sin transformar)
 *   que se mantiene fijo bajo el puntero.
 * - `layout`: medidas reales de la imagen sin transformar.
 */
const zoomImageState = {
  level: 0,
  scale: ZOOM_LEVELS[0],
  tx: 0,
  ty: 0,
  ox: 0,
  oy: 0,
  layout: null,
  dragging: false,
  moved: false,
  levelAtDown: 0,
  startX: 0,
  startY: 0,
  lastX: 0,
  lastY: 0,
};

/**
 * Obtiene las medidas reales de la imagen (sin la transformación del zoom)
 *
 * Se usa la matriz real calculada por el navegador para poder deshacer el
 * zoom aunque la transición CSS siga en curso.
 *
 * @param {HTMLElement} img - Elemento de la imagen
 * @returns {{left: number, top: number, width: number, height: number}} Medidas
 */
function getZoomImageLayout(img) {
  const rect = img.getBoundingClientRect();
  const transform = getComputedStyle(img).transform;

  if (!transform || transform === "none") {
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  let matrix = null;
  try {
    matrix = new DOMMatrixReadOnly(transform);
  } catch (error) {
    matrix = null;
  }

  if (!matrix) {
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };
  }

  const scaleX = matrix.a || 1;
  const scaleY = matrix.d || 1;

  return {
    left: rect.left - matrix.e,
    top: rect.top - matrix.f,
    width: rect.width / scaleX,
    height: rect.height / scaleY,
  };
}

/**
 * Aplica la transformación (escala + desplazamiento) a la imagen
 */
function applyZoomImageTransform() {
  const img = document.getElementById("truckZoomImg");
  if (!img) return;

  const { scale, tx, ty, ox, oy } = zoomImageState;
  img.style.transformOrigin = `${ox}px ${oy}px`;
  img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
}

/**
 * Evita que la imagen se arrastre fuera de la pantalla al moverla
 *
 * La imagen siempre debe conservar un fragmento visible dentro del modal.
 */
function clampZoomImagePan() {
  const state = zoomImageState;
  if (state.level === 0 || !state.layout) return;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const { layout } = state;

  const scaledW = layout.width * state.scale;
  const scaledH = layout.height * state.scale;

  // Bordes de la imagen ya escalada, sin contar el desplazamiento
  const L0 = layout.left + state.ox * (1 - state.scale);
  const R0 = L0 + scaledW;
  const T0 = layout.top + state.oy * (1 - state.scale);
  const B0 = T0 + scaledH;

  const minVisible = 100;
  const margin = 8;

  // Si la imagen escalada cabe en pantalla se mantiene dentro con margen;
  // si es más grande, solo se exige que quede un fragmento visible.
  const minTx = scaledW <= vw ? -L0 + margin : minVisible - R0;
  const maxTx = scaledW <= vw ? vw - R0 - margin : vw - minVisible - L0;
  const minTy = scaledH <= vh ? -T0 + margin : minVisible - B0;
  const maxTy = scaledH <= vh ? vh - B0 - margin : vh - minVisible - T0;

  const loTx = Math.min(minTx, maxTx);
  const hiTx = Math.max(minTx, maxTx);
  const loTy = Math.min(minTy, maxTy);
  const hiTy = Math.max(minTy, maxTy);

  state.tx = Math.min(Math.max(state.tx, loTx), hiTx);
  state.ty = Math.min(Math.max(state.ty, loTy), hiTy);
}

/**
 * Cambia el nivel de zoom manteniendo fijo el punto pulsado
 * @param {number} level - Índice dentro de `ZOOM_LEVELS`
 * @param {number} clientX - Coordenada X del puntero
 * @param {number} clientY - Coordenada Y del puntero
 */
function setZoomImageLevel(level, clientX, clientY) {
  const img = document.getElementById("truckZoomImg");
  if (!img) return;

  // Nivel 0 = imagen ajustada al modal
  if (level === 0) {
    resetZoomImage();
    return;
  }

  const state = zoomImageState;
  const layout = getZoomImageLayout(img);

  // Punto de la imagen (coords de la caja sin transformar) bajo el puntero
  const ex = clientX - layout.left;
  const ey = clientY - layout.top;

  let ox;
  let oy;

  if (state.scale === 1) {
    // Primer acercamiento: el punto pulsado es el ancla
    ox = ex;
    oy = ey;
  } else {
    // Ya había zoom: se conserva el punto que está bajo el puntero
    ox = state.ox + (ex - state.ox - state.tx) / state.scale;
    oy = state.oy + (ey - state.oy - state.ty) / state.scale;
  }

  state.level = level;
  state.scale = ZOOM_LEVELS[level];
  state.ox = ox;
  state.oy = oy;
  state.layout = layout;

  // Desplazamiento necesario para que el ancla quede bajo el puntero
  state.tx = clientX - layout.left - ox;
  state.ty = clientY - layout.top - oy;

  img.classList.add("is-zoomed");
  clampZoomImagePan();
  applyZoomImageTransform();
  updateZoomImageHint();
}

/**
 * Devuelve la imagen a su estado inicial (ajustada al modal)
 */
function resetZoomImage() {
  const img = document.getElementById("truckZoomImg");
  const state = zoomImageState;

  state.level = 0;
  state.scale = ZOOM_LEVELS[0];
  state.tx = 0;
  state.ty = 0;
  state.ox = 0;
  state.oy = 0;
  state.layout = null;
  state.dragging = false;

  if (img) {
    img.classList.remove("is-zoomed", "is-dragging");
    img.style.transform = "";
    img.style.transformOrigin = "";
  }

  updateZoomImageHint();
}

/**
 * Actualiza el texto de ayuda del zoom según el estado actual
 */
function updateZoomImageHint() {
  const hint = document.getElementById("truckZoomHint");
  if (!hint) return;

  const state = zoomImageState;

  if (state.level === 0) {
    hint.textContent = t("Haz clic en la imagen para acercar");
  } else if (state.level >= ZOOM_LEVELS.length - 1) {
    hint.textContent = t("Zoom x{scale} (máximo) · clic para volver a ajustar", {
      scale: state.scale,
    });
  } else {
    hint.textContent = t(
      "Zoom x{scale} · arrastra para mover · clic para acercar más",
      { scale: state.scale }
    );
  }
}

/**
 * Inicia el zoom profundo y la posible panorámica (pointer down)
 */
function handleZoomImagePointerDown(e) {
  if (zoomModalState.simpleMode) return;
  if (e.button !== undefined && e.button !== 0) return;

  const img = e.currentTarget;
  const state = zoomImageState;

  if (img.setPointerCapture) {
    img.setPointerCapture(e.pointerId);
  }

  state.dragging = true;
  state.moved = false;
  state.levelAtDown = state.level;
  state.startX = e.clientX;
  state.startY = e.clientY;
  state.lastX = e.clientX;
  state.lastY = e.clientY;

  // Desde el estado inicial se acerca de inmediato para poder arrastrar
  if (state.level === 0) {
    setZoomImageLevel(1, e.clientX, e.clientY);
  }

  e.preventDefault();
}

/**
 * Mueve la imagen ampliada mientras se arrastra
 */
function handleZoomImagePointerMove(e) {
  const state = zoomImageState;
  if (!state.dragging) return;

  const dx = e.clientX - state.lastX;
  const dy = e.clientY - state.lastY;
  state.lastX = e.clientX;
  state.lastY = e.clientY;

  // El arrastre empieza cuando el puntero se separa del punto inicial
  if (!state.moved) {
    const distance =
      Math.abs(e.clientX - state.startX) + Math.abs(e.clientY - state.startY);
    if (distance <= 3) return;

    state.moved = true;
    // Sin transición, la imagen sigue al puntero sin retardo
    e.currentTarget.classList.add("is-dragging");
  }

  if (state.level === 0) return;

  state.tx += dx;
  state.ty += dy;
  clampZoomImagePan();
  applyZoomImageTransform();
}

/**
 * Finaliza la panorámica (pointer up / cancel)
 */
function handleZoomImagePointerUp(e) {
  const img = e.currentTarget;
  const state = zoomImageState;

  // Clic simple sobre una imagen ya ampliada: avanza un nivel de zoom
  // (x1 → x2.5 → x6 → x1)
  if (
    !state.moved &&
    state.levelAtDown > 0 &&
    state.level === state.levelAtDown
  ) {
    const nextLevel = (state.level + 1) % ZOOM_LEVELS.length;
    setZoomImageLevel(nextLevel, e.clientX, e.clientY);
  }

  state.dragging = false;
  state.moved = false;
  img.classList.remove("is-dragging");

  if (img.hasPointerCapture && img.hasPointerCapture(e.pointerId)) {
    img.releasePointerCapture(e.pointerId);
  }
}
