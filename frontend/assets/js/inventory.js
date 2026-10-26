/**
 * TruckFleet - Inventario (datos + paginación)
 * Renderiza el listado de camiones por páginas y gestiona los filtros
 * del panel lateral (demo solo frontend).
 */

/**
 * Catálogo estático de camiones (demo).
 * Cada entrada alimenta una card del grid y los filtros del panel lateral.
 */
// Catálogo alimentado desde frontend/assets/js/truck-sales-data.js, que envuelve
// frontend/assets/truck-sales_img/Truck_Desc.json (sin backend ni servidor).
const INVENTORY_TRUCKS =
  (typeof TRUCK_SALES_DATA !== "undefined" && Array.isArray(TRUCK_SALES_DATA))
    ? TRUCK_SALES_DATA
    : [];

/**
 * Estado de la vista de inventario (página actual, orden y filtros).
 */
const inventoryState = {
  page: 1,
  perPage: 6,
  sort: "newest",
  filters: {
    search: "",
    condition: "",
    make: "",
    year: "",
    fuelType: "",
    dutyType: "",
    transmissionType: "",
  },
};

document.addEventListener("DOMContentLoaded", initInventory);

// Vuelve a pintar el listado cuando el usuario cambia de idioma.
document.addEventListener("truckfleet:languagechange", () => {
  if (document.getElementById("trucksGrid")) {
    populateMakeFilter();
    populateYearFilter();
    renderInventory();
  }
});

/**
 * Inicializa la página de inventario
 */
function initInventory() {
  const grid = document.getElementById("trucksGrid");

  // Si no estamos en la página de inventario, no se hace nada
  if (!grid) return;

  inventoryState.perPage = parseInt(grid.dataset.perPage, 10) || 6;

  populateMakeFilter();
  populateYearFilter();
  bindInventoryEvents();
  renderInventory();
}

/**
 * Rellena el filtro de año con todos los años presentes en el catálogo.
 * La opción "Todos" respeta el idioma activo y se conserva la selección
 * actual si el año sigue existiendo.
 */
function populateYearFilter() {
  const yearSelect = document.getElementById("year");

  if (!yearSelect) return;

  const selectedYear = yearSelect.value;
  const years = [...new Set(INVENTORY_TRUCKS.map((truck) => truck.year))].sort(
    (a, b) => b - a
  );

  yearSelect.innerHTML = [
    `<option value="">${escapeHtml(t("Todos"))}</option>`,
    ...years.map((year) => `<option value="${year}">${year}</option>`),
  ].join("");

  yearSelect.value = years.some((year) => String(year) === selectedYear)
    ? selectedYear
    : "";
}

/**
 * Rellena el filtro de marca con todas las marcas presentes en el catálogo
 * (alimentado desde el JSON), conservando la selección actual si sigue existiendo.
 */
function populateMakeFilter() {
  const makeSelect = document.getElementById("make");
  if (!makeSelect) return;

  const selectedMake = makeSelect.value;
  const makes = [...new Map(
    INVENTORY_TRUCKS.map((truck) => [truck.make, truck.makeName])
  ).entries()];

  makeSelect.innerHTML = [
    `<option value="">${escapeHtml(t("Todas"))}</option>`,
    ...makes.map(
      ([make, makeName]) =>
        `<option value="${escapeHtml(make)}">${escapeHtml(makeName)}</option>`
    ),
  ].join("");

  makeSelect.value = makes.some(([make]) => make === selectedMake)
    ? selectedMake
    : "";
}

/**
 * Registra los eventos de filtros, orden y paginación
 */
function bindInventoryEvents() {
  // Formulario de filtros
  const filtersForm = document.getElementById("inventoryFilters");

  if (filtersForm) {
    filtersForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyFiltersFromForm();
      inventoryState.page = 1;
      renderInventory();
    });

    filtersForm.addEventListener("reset", () => {
      // El reset se aplica después del evento
      setTimeout(() => {
        applyFiltersFromForm();
        inventoryState.page = 1;
        renderInventory();
      }, 0);
    });

    // Los filtros de selección se aplican en vivo al cambiar de opción.
    filtersForm.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => {
        applyFiltersFromForm();
        inventoryState.page = 1;
        renderInventory();
      });
    });
  }

  // Búsqueda en vivo (con retardo para no renderizar en cada tecla)
  const searchInput = document.getElementById("search");
  let searchTimer;

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        inventoryState.filters.search = searchInput.value;
        inventoryState.page = 1;
        renderInventory();
      }, 400);
    });
  }

  // Orden de resultados
  const sortSelect = document.getElementById("inventorySort");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      inventoryState.sort = sortSelect.value;
      inventoryState.page = 1;
      renderInventory();
    });
  }

  // Paginación (delegación de eventos sobre la lista)
  const paginationList = document.getElementById("inventoryPagination");

  if (paginationList) {
    paginationList.addEventListener("click", (e) => {
      const link = e.target.closest("[data-page-target]");

      if (!link) return;

      e.preventDefault();

      const pageItem = link.closest(".page-item");
      if (pageItem && pageItem.classList.contains("disabled")) return;

      const target = parseInt(link.dataset.pageTarget, 10);
      if (!target || target === inventoryState.page) return;

      inventoryState.page = target;
      renderInventory();
      scrollToInventory();
    });
  }
}

/**
 * Copia los valores del formulario de filtros al estado
 */
function applyFiltersFromForm() {
  const getValue = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : "";
  };

  inventoryState.filters.search = getValue("search");
  inventoryState.filters.condition = getValue("condition");
  inventoryState.filters.make = getValue("make");
  inventoryState.filters.year = getValue("year");
  inventoryState.filters.fuelType = getValue("fuelType");
  inventoryState.filters.dutyType = getValue("dutyType");
  inventoryState.filters.transmissionType = getValue("transmissionType");
}

/**
 * Filtra el catálogo según los filtros activos
 * @returns {Array} Camiones que cumplen los filtros
 */
function getFilteredTrucks() {
  const {
    search,
    condition,
    make,
    year,
    fuelType,
    dutyType,
    transmissionType,
  } = inventoryState.filters;
  const query = search.trim().toLowerCase();
  const selectedYear = year ? parseInt(year, 10) : null;

  return INVENTORY_TRUCKS.filter((truck) => {
    const matchesSearch =
      !query ||
      truck.name.toLowerCase().includes(query) ||
      truck.makeName.toLowerCase().includes(query);

    const matchesCondition = !condition || truck.condition === condition;
    const matchesMake = !make || truck.make === make;
    const matchesYear = selectedYear === null || truck.year === selectedYear;
    const matchesFuelType = !fuelType || truck.fuelType === fuelType;
    const matchesDutyType = !dutyType || truck.duty === dutyType;
    const matchesTransmission =
      !transmissionType || truck.transmissionType === transmissionType;

    return (
      matchesSearch &&
      matchesCondition &&
      matchesMake &&
      matchesYear &&
      matchesFuelType &&
      matchesDutyType &&
      matchesTransmission
    );
  });
}

/**
 * Ordena el catálogo según el criterio seleccionado
 * @param {Array} trucks - Camiones filtrados
 * @param {string} sort - Criterio de orden
 * @returns {Array} Camiones ordenados
 */
function sortTrucks(trucks, sort) {
  const sorted = [...trucks];

  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "year":
      return sorted.sort((a, b) => b.year - a.year);
    case "mileage":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return sorted.sort((a, b) => b.year - a.year || b.id - a.id);
  }
}

/**
 * Renderiza la página actual de camiones (grid + resumen + paginación)
 */
function renderInventory() {
  const grid = document.getElementById("trucksGrid");

  if (!grid) return;

  const trucks = sortTrucks(getFilteredTrucks(), inventoryState.sort);
  const total = trucks.length;
  const totalPages = Math.max(1, Math.ceil(total / inventoryState.perPage));

  // Ajusta la página si el filtro redujo el número de resultados
  if (inventoryState.page > totalPages) inventoryState.page = totalPages;
  if (inventoryState.page < 1) inventoryState.page = 1;

  const start = (inventoryState.page - 1) * inventoryState.perPage;
  const pageTrucks = trucks.slice(start, start + inventoryState.perPage);

  grid.innerHTML = pageTrucks.length
    ? pageTrucks.map((truck) => buildTruckCard(truck)).join("")
    : buildEmptyState();

  updateResultsInfo(start, pageTrucks.length, total);
  renderPagination(totalPages);
  refreshTruckWidgets();
}

/**
 * Construye el HTML de una card de camión
 * @param {Object} truck - Datos del camión
 * @param {string} columnClass - Clases de la columna Bootstrap (opcional)
 * @returns {string} HTML de la card
 */
function buildTruckCard(truck, columnClass = "col-md-6") {
  // Protege la clase de columna (por ejemplo, si se usa directamente en un map)
  const column =
    typeof columnClass === "string" && columnClass.trim()
      ? columnClass
      : "col-md-6";

  const images = truck.images
    .map((image, index) => {
      const imageDesc = localizeImageDesc(image.desc);

      return `
              <div class="truck-carousel-item${index === 0 ? " active" : ""}" data-desc="${escapeHtml(imageDesc)}">
                <img src="${escapeHtml(image.src)}" alt="${escapeHtml(imageDesc)}" class="truck-card-img"
                  loading="lazy" />
              </div>`;
    })
    .join("");

  const firstImageDesc = localizeImageDesc(truck.images[0].desc);

  return `
            <div class="${column}">
              <div class="truck-card">
                <div class="truck-carousel" data-carousel>
                  <div class="truck-carousel-images">${images}
                  </div>
                  <button class="truck-carousel-arrow truck-carousel-prev" data-carousel-prev aria-label="${escapeHtml(t("Anterior imagen"))}">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                  <button class="truck-carousel-arrow truck-carousel-next" data-carousel-next aria-label="${escapeHtml(t("Siguiente imagen"))}">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                  <span class="badge ${truck.badgeClass} position-absolute top-0 end-0 m-3" style="z-index: 10;">${escapeHtml(t(truck.badge))}</span>
                </div>
                <div class="truck-carousel-desc" data-carousel-desc>${escapeHtml(firstImageDesc)}</div>
                <div class="truck-card-body">
                  <div class="truck-card-heading">
                    <h5 class="truck-card-title">${escapeHtml(truck.name)}</h5>
                    <a class="truck-card-detail-link" href="./truck-detail.html?id=${truck.id}">
                      ${escapeHtml(t("Ver detalle"))}
                      <i class="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                  <div class="truck-card-meta">
                    <span class="truck-card-meta-item"><i class="bi bi-calendar3"></i>${truck.year}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-speedometer2"></i>${formatMileage(truck.mileage)}</span>
                    <span class="truck-card-meta-item"><i class="bi ${truck.fuelIcon}"></i>${escapeHtml(t(truck.fuel))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-gear"></i>${escapeHtml(t(truck.transmission))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-buildings"></i>${escapeHtml(t(truck.typeName))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-palette"></i>${escapeHtml(t(truck.color))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-box-seam"></i>${escapeHtml(t(truck.dutyName))}</span>
                  </div>
                  <div class="truck-card-price">
                    ${formatUsdPrice(truck.price)} <span>USD</span>
                  </div>
                </div>
                <div class="truck-card-footer">
                  <a href="./contact.html" class="btn btn-primary w-100">
                    ${escapeHtml(t("Solicitar Información"))}
                    <i class="bi bi-envelope ms-1"></i>
                  </a>
                </div>
              </div>
            </div>`;
}

/**
 * Construye el estado vacío (sin coincidencias)
 * @returns {string} HTML del mensaje
 */
function buildEmptyState() {
  return `
            <div class="col-12">
              <div class="inventory-empty">
                <i class="bi bi-truck inventory-empty-icon"></i>
                <h5 class="inventory-empty-title">${escapeHtml(t("No encontramos camiones"))}</h5>
                <p class="inventory-empty-text">
                  ${escapeHtml(t("Ajusta los filtros o contáctanos para buscar la unidad que necesitas."))}
                </p>
              </div>
            </div>`;
}

/**
 * Actualiza el resumen de resultados ("Mostrando X de Y resultados")
 */
function updateResultsInfo(start, shown, total) {
  const summary = document.getElementById("inventorySummary");

  if (!summary) return;

  if (!total) {
    summary.innerHTML = t("No se encontraron <strong>{total}</strong> resultados", {
      total: 0,
    });
    return;
  }

  const from = start + 1;
  const to = start + shown;

  summary.innerHTML = t(
    "Mostrando <strong>{from}-{to}</strong> de <strong>{total}</strong> resultados",
    { from, to, total }
  );
}

/**
 * Genera los controles de paginación según el total de páginas
 * @param {number} totalPages - Cantidad total de páginas
 */
function renderPagination(totalPages) {
  const list = document.getElementById("inventoryPagination");

  if (!list) return;

  const current = inventoryState.page;
  const isFirst = current === 1;
  const isLast = current === totalPages;

  let html = "";

  // Anterior
  html += `
              <li class="page-item${isFirst ? " disabled" : ""}">
                <a class="page-link" href="#"${isFirst ? ' tabindex="-1" aria-disabled="true"' : ` data-page-target="${current - 1}"`}>${escapeHtml(t("Anterior"))}</a>
              </li>`;

  // Páginas numéricas
  for (let page = 1; page <= totalPages; page++) {
    const isActive = page === current;

    html += `
              <li class="page-item${isActive ? " active" : ""}">
                <a class="page-link" href="#" data-page-target="${page}"${isActive ? ' aria-current="page"' : ""}>${page}</a>
              </li>`;
  }

  // Siguiente
  html += `
              <li class="page-item${isLast ? " disabled" : ""}">
                <a class="page-link" href="#"${isLast ? ' tabindex="-1" aria-disabled="true"' : ` data-page-target="${current + 1}"`}>${escapeHtml(t("Siguiente"))}</a>
              </li>`;

  list.innerHTML = html;
}

/**
 * Vuelve a activar carruseles y modal de zoom sobre las cards renderizadas
 */
function refreshTruckWidgets() {
  if (typeof initTruckCarousels === "function") initTruckCarousels();
  if (typeof initTruckZoomModal === "function") initTruckZoomModal();
}

/**
 * Desplaza la vista al inicio del listado de camiones
 */
function scrollToInventory() {
  const grid = document.getElementById("trucksGrid");

  if (!grid) return;

  window.scrollTo({
    top: grid.getBoundingClientRect().top + window.pageYOffset - 100,
    behavior: "smooth",
  });
}

/**
 * Formatea el kilometraje en miles (425000 -> 425,000 mi)
 * @param {number} mileage - Kilometraje
 * @returns {string} Kilometraje formateado
 */
function formatMileage(mileage) {
  return `${mileage.toLocaleString("en-US")} mi`;
}

/**
 * Formatea el precio en dólares (72500 -> $72,500)
 * @param {number} price - Precio numérico
 * @returns {string} Precio formateado
 */
function formatUsdPrice(price) {
  return `$${price.toLocaleString("en-US")}`;
}

/**
 * Escapa caracteres especiales de HTML
 * @param {string} value - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
