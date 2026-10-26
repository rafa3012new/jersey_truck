/**
 * TruckFleet - Venta de Spare Parts
 * Catálogo estático de repuestos, filtros, paginación y tarjetas.
 * Reutiliza los carruseles y el zoom de main.js.
 */

const SPARE_PARTS_CATALOG = [
  {
    id: 1,
    name: "Kit de pastillas de freno Bendix",
    brand: "bendix",
    brandName: "Bendix",
    category: "brakes",
    categoryName: "Frenos",
    condition: "oem",
    conditionName: "OEM",
    badgeClass: "badge-success",
    sku: "TF-BRK-1001",
    compatibility: ["Freightliner", "Kenworth", "Peterbilt"],
    stock: 24,
    availability: "in-stock",
    warranty: "12 meses",
    price: 189,
    image: "../assets/img/part-brakes.svg",
  },
  {
    id: 2,
    name: "Discos de freno ventilados Bendix",
    brand: "bendix",
    brandName: "Bendix",
    category: "brakes",
    categoryName: "Frenos",
    condition: "new",
    conditionName: "Nuevo",
    badgeClass: "badge-primary",
    sku: "TF-BRK-1002",
    compatibility: ["Mack", "Volvo", "Freightliner"],
    stock: 16,
    availability: "in-stock",
    warranty: "12 meses",
    price: 249,
    image: "../assets/img/part-brakes.svg",
  },
  {
    id: 3,
    name: "Filtro de aceite Fleetguard LF9080",
    brand: "fleetguard",
    brandName: "Fleetguard",
    category: "filters",
    categoryName: "Filtros",
    condition: "oem",
    conditionName: "OEM",
    badgeClass: "badge-success",
    sku: "TF-FLT-2001",
    compatibility: ["Cummins", "Freightliner", "Kenworth"],
    stock: 80,
    availability: "in-stock",
    warranty: "6 meses",
    price: 32,
    image: "../assets/img/part-filters.svg",
  },
  {
    id: 4,
    name: "Filtro de aire Donaldson PowerCore",
    brand: "donaldson",
    brandName: "Donaldson",
    category: "filters",
    categoryName: "Filtros",
    condition: "aftermarket",
    conditionName: "Aftermarket",
    badgeClass: "badge-secondary",
    sku: "TF-FLT-2002",
    compatibility: ["Volvo", "Mack", "Peterbilt"],
    stock: 35,
    availability: "in-stock",
    warranty: "6 meses",
    price: 89,
    image: "../assets/img/part-filters.svg",
  },
  {
    id: 5,
    name: "Turbo Garrett GT4088",
    brand: "garrett",
    brandName: "Garrett",
    category: "engine",
    categoryName: "Motor",
    condition: "refurbished",
    conditionName: "Reacondicionado",
    badgeClass: "badge-outline",
    sku: "TF-ENG-3001",
    compatibility: ["Freightliner", "Mack", "Volvo"],
    stock: 0,
    availability: "special-order",
    warranty: "12 meses",
    price: 1450,
    image: "../assets/img/part-engine.svg",
  },
  {
    id: 6,
    name: "Bomba de agua Cummins",
    brand: "cummins",
    brandName: "Cummins",
    category: "engine",
    categoryName: "Motor",
    condition: "oem",
    conditionName: "OEM",
    badgeClass: "badge-success",
    sku: "TF-ENG-3002",
    compatibility: ["Freightliner", "Kenworth", "Peterbilt"],
    stock: 12,
    availability: "in-stock",
    warranty: "12 meses",
    price: 320,
    image: "../assets/img/part-engine.svg",
  },
  {
    id: 7,
    name: "Batería Odyssey Extreme 31",
    brand: "odyssey",
    brandName: "Odyssey",
    category: "electrical",
    categoryName: "Sistema Eléctrico",
    condition: "new",
    conditionName: "Nuevo",
    badgeClass: "badge-primary",
    sku: "TF-ELE-4001",
    compatibility: ["Freightliner", "Kenworth", "Volvo"],
    stock: 40,
    availability: "in-stock",
    warranty: "24 meses",
    price: 285,
    image: "../assets/img/part-electrical.svg",
  },
  {
    id: 8,
    name: "Alternador Delco Remy 160A",
    brand: "delco-remy",
    brandName: "Delco Remy",
    category: "electrical",
    categoryName: "Sistema Eléctrico",
    condition: "refurbished",
    conditionName: "Reacondicionado",
    badgeClass: "badge-outline",
    sku: "TF-ELE-4002",
    compatibility: ["Mack", "Volvo", "Peterbilt"],
    stock: 5,
    availability: "low-stock",
    warranty: "12 meses",
    price: 410,
    image: "../assets/img/part-electrical.svg",
  },
  {
    id: 9,
    name: "Amortiguador Sachs Heavy Duty",
    brand: "sachs",
    brandName: "Sachs",
    category: "suspension",
    categoryName: "Suspensión",
    condition: "new",
    conditionName: "Nuevo",
    badgeClass: "badge-primary",
    sku: "TF-SUS-5001",
    compatibility: ["Freightliner", "Kenworth", "Mack"],
    stock: 22,
    availability: "in-stock",
    warranty: "12 meses",
    price: 175,
    image: "../assets/img/part-suspension.svg",
  },
  {
    id: 10,
    name: "Kit de bujes de suspensión Meritor",
    brand: "meritor",
    brandName: "Meritor",
    category: "suspension",
    categoryName: "Suspensión",
    condition: "oem",
    conditionName: "OEM",
    badgeClass: "badge-success",
    sku: "TF-SUS-5002",
    compatibility: ["Volvo", "Mack", "Peterbilt"],
    stock: 0,
    availability: "special-order",
    warranty: "12 meses",
    price: 260,
    image: "../assets/img/part-suspension.svg",
  },
  {
    id: 11,
    name: "Llanta Michelin X Line Energy",
    brand: "michelin",
    brandName: "Michelin",
    category: "tires",
    categoryName: "Llantas",
    condition: "new",
    conditionName: "Nuevo",
    badgeClass: "badge-primary",
    sku: "TF-TIR-6001",
    compatibility: ["Freightliner", "Kenworth", "Volvo", "Mack"],
    stock: 48,
    availability: "in-stock",
    warranty: "24 meses",
    price: 520,
    image: "../assets/img/part-tires.svg",
  },
  {
    id: 12,
    name: "Aceite sintético Shell Rotella T6 15W-40",
    brand: "shell",
    brandName: "Shell",
    category: "lubricants",
    categoryName: "Lubricantes",
    condition: "new",
    conditionName: "Nuevo",
    badgeClass: "badge-primary",
    sku: "TF-LUB-7001",
    compatibility: ["Freightliner", "Kenworth", "Peterbilt", "Volvo", "Mack"],
    stock: 120,
    availability: "in-stock",
    warranty: "6 meses",
    price: 28,
    image: "../assets/img/part-lubricants.svg",
  },
];

const sparePartsState = {
  page: 1,
  perPage: 6,
  sort: "relevance",
  filters: {
    search: "",
    category: "",
    brand: "",
    condition: "",
    availability: "",
  },
};

document.addEventListener("DOMContentLoaded", initSpareParts);

// Vuelve a pintar el listado cuando el usuario cambia de idioma.
document.addEventListener("truckfleet:languagechange", () => {
  if (document.getElementById("sparePartsGrid")) {
    populateSpareCategoryFilter();
    populateSpareBrandFilter();
    renderSpareParts();
  }
});

/**
 * Inicializa la página de repuestos.
 */
function initSpareParts() {
  const grid = document.getElementById("sparePartsGrid");

  if (!grid) return;

  sparePartsState.perPage = parseInt(grid.dataset.perPage, 10) || 6;

  populateSpareCategoryFilter();
  populateSpareBrandFilter();
  bindSparePartsEvents();
  renderSpareParts();
}

/**
 * Rellena el filtro de categoría con las categorías presentes en el catálogo.
 */
function populateSpareCategoryFilter() {
  const categorySelect = document.getElementById("spareCategory");

  if (!categorySelect) return;

  const selectedCategory = categorySelect.value;
  const categories = [
    ...new Map(
      SPARE_PARTS_CATALOG.map((part) => [part.category, part.categoryName])
    ).entries(),
  ].sort((a, b) => t(a[1]).localeCompare(t(b[1])));

  categorySelect.innerHTML = [
    `<option value="">${escapeSpareHtml(t("Todas"))}</option>`,
    ...categories.map(
      ([value, label]) =>
        `<option value="${escapeSpareHtml(value)}">${escapeSpareHtml(t(label))}</option>`
    ),
  ].join("");

  categorySelect.value = categories.some(([value]) => value === selectedCategory)
    ? selectedCategory
    : "";
}

/**
 * Rellena el filtro de marca con las marcas presentes en el catálogo.
 */
function populateSpareBrandFilter() {
  const brandSelect = document.getElementById("spareBrand");

  if (!brandSelect) return;

  const selectedBrand = brandSelect.value;
  const brands = [
    ...new Map(
      SPARE_PARTS_CATALOG.map((part) => [part.brand, part.brandName])
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  brandSelect.innerHTML = [
    `<option value="">${escapeSpareHtml(t("Todas"))}</option>`,
    ...brands.map(
      ([value, label]) =>
        `<option value="${escapeSpareHtml(value)}">${escapeSpareHtml(label)}</option>`
    ),
  ].join("");

  brandSelect.value = brands.some(([value]) => value === selectedBrand)
    ? selectedBrand
    : "";
}

/**
 * Registra los eventos de filtros, orden y paginación.
 */
function bindSparePartsEvents() {
  const filtersForm = document.getElementById("sparePartsFilters");

  if (filtersForm) {
    filtersForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applySpareFiltersFromForm();
      sparePartsState.page = 1;
      renderSpareParts();
    });

    filtersForm.addEventListener("reset", () => {
      setTimeout(() => {
        applySpareFiltersFromForm();
        sparePartsState.page = 1;
        renderSpareParts();
      }, 0);
    });

    filtersForm.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => {
        applySpareFiltersFromForm();
        sparePartsState.page = 1;
        renderSpareParts();
      });
    });
  }

  const searchInput = document.getElementById("spareSearch");
  let searchTimer;

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        sparePartsState.filters.search = searchInput.value;
        sparePartsState.page = 1;
        renderSpareParts();
      }, 400);
    });
  }

  const sortSelect = document.getElementById("sparePartsSort");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sparePartsState.sort = sortSelect.value;
      sparePartsState.page = 1;
      renderSpareParts();
    });
  }

  const paginationList = document.getElementById("sparePartsPagination");

  if (paginationList) {
    paginationList.addEventListener("click", (e) => {
      const link = e.target.closest("[data-page-target]");

      if (!link) return;

      e.preventDefault();

      const pageItem = link.closest(".page-item");
      if (pageItem && pageItem.classList.contains("disabled")) return;

      const target = parseInt(link.dataset.pageTarget, 10);
      if (!target || target === sparePartsState.page) return;

      sparePartsState.page = target;
      renderSpareParts();
      scrollToSpareParts();
    });
  }
}

/**
 * Copia los valores del formulario de filtros al estado.
 */
function applySpareFiltersFromForm() {
  const getValue = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : "";
  };

  sparePartsState.filters.search = getValue("spareSearch");
  sparePartsState.filters.category = getValue("spareCategory");
  sparePartsState.filters.brand = getValue("spareBrand");
  sparePartsState.filters.condition = getValue("spareCondition");
  sparePartsState.filters.availability = getValue("spareAvailability");
}

/**
 * Filtra el catálogo según los filtros activos.
 */
function getFilteredSpareParts() {
  const { search, category, brand, condition, availability } =
    sparePartsState.filters;
  const query = search.trim().toLowerCase();

  return SPARE_PARTS_CATALOG.filter((part) => {
    const searchable = [
      part.name,
      t(part.name),
      part.brandName,
      part.sku,
      part.categoryName,
      t(part.categoryName),
      ...part.compatibility,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !query || searchable.includes(query);
    const matchesCategory = !category || part.category === category;
    const matchesBrand = !brand || part.brand === brand;
    const matchesCondition = !condition || part.condition === condition;
    const matchesAvailability =
      !availability || part.availability === availability;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesBrand &&
      matchesCondition &&
      matchesAvailability
    );
  });
}

/**
 * Ordena el catálogo según el criterio seleccionado.
 */
function sortSpareParts(parts, sort) {
  const sorted = [...parts];

  switch (sort) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) =>
        t(a.name).localeCompare(t(b.name))
      );
    case "stock":
      return sorted.sort((a, b) => b.stock - a.stock || a.id - b.id);
    case "relevance":
    default:
      return sorted.sort((a, b) => a.id - b.id);
  }
}

/**
 * Renderiza la página actual de repuestos.
 */
function renderSpareParts() {
  const grid = document.getElementById("sparePartsGrid");

  if (!grid) return;

  const parts = sortSpareParts(getFilteredSpareParts(), sparePartsState.sort);
  const total = parts.length;
  const totalPages = Math.max(1, Math.ceil(total / sparePartsState.perPage));

  if (sparePartsState.page > totalPages) sparePartsState.page = totalPages;
  if (sparePartsState.page < 1) sparePartsState.page = 1;

  const start = (sparePartsState.page - 1) * sparePartsState.perPage;
  const pageParts = parts.slice(start, start + sparePartsState.perPage);

  grid.innerHTML = pageParts.length
    ? pageParts.map((part) => buildSparePartCard(part)).join("")
    : buildSparePartsEmptyState();

  updateSparePartsResultsInfo(start, pageParts.length, total);
  renderSparePartsPagination(totalPages);
  refreshSpareWidgets();
}

/**
 * Construye el HTML de una tarjeta de repuesto.
 */
function buildSparePartCard(part, columnClass = "col-md-6") {
  const column =
    typeof columnClass === "string" && columnClass.trim()
      ? columnClass
      : "col-md-6";

  const name = t(part.name);
  const category = t(part.categoryName);
  const imageDesc = `${name} - ${category}`;
  const contactUrl = `./contact.html?part=${encodeURIComponent(name)}`;
  const stockLabel =
    part.availability === "special-order"
      ? t("Bajo pedido")
      : `${part.stock} ${t("disponibles")}`;

  return `
            <div class="${column}">
              <div class="truck-card part-card">
                <div class="truck-carousel" data-carousel>
                  <div class="truck-carousel-images">
                    <div class="truck-carousel-item active" data-desc="${escapeSpareHtml(imageDesc)}">
                      <img src="${escapeSpareHtml(part.image)}" alt="${escapeSpareHtml(imageDesc)}"
                        class="truck-card-img" loading="lazy" />
                    </div>
                  </div>
                  <span class="badge ${part.badgeClass} position-absolute top-0 end-0 m-3" style="z-index: 10;">${escapeSpareHtml(t(part.conditionName))}</span>
                </div>
                <div class="truck-carousel-desc" data-carousel-desc>${escapeSpareHtml(imageDesc)}</div>
                <div class="truck-card-body">
                  <div class="truck-card-heading">
                    <h5 class="truck-card-title">${escapeSpareHtml(name)}</h5>
                    <a class="truck-card-detail-link" href="${escapeSpareHtml(contactUrl)}">
                      ${escapeSpareHtml(t("Cotizar"))}
                      <i class="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                  <div class="truck-card-meta">
                    <span class="truck-card-meta-item"><i class="bi bi-tag"></i>${escapeSpareHtml(category)}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-award"></i>${escapeSpareHtml(part.brandName)}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-upc-scan"></i>${escapeSpareHtml(part.sku)}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-truck"></i>${escapeSpareHtml(part.compatibility.join(" · "))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-box-seam"></i>${escapeSpareHtml(stockLabel)}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-shield-check"></i>${escapeSpareHtml(t(part.warranty))}</span>
                  </div>
                  <div class="truck-card-price">
                    ${formatSparePrice(part.price)} <span>USD</span>
                  </div>
                </div>
                <div class="truck-card-footer">
                  <a href="${escapeSpareHtml(contactUrl)}" class="btn btn-primary w-100">
                    ${escapeSpareHtml(t("Solicitar Cotización"))}
                    <i class="bi bi-envelope ms-1"></i>
                  </a>
                </div>
              </div>
            </div>`;
}

/**
 * Construye el estado vacío (sin coincidencias).
 */
function buildSparePartsEmptyState() {
  return `
            <div class="col-12">
              <div class="inventory-empty">
                <i class="bi bi-gear-wide-connected inventory-empty-icon"></i>
                <h5 class="inventory-empty-title">${escapeSpareHtml(t("No encontramos repuestos"))}</h5>
                <p class="inventory-empty-text">
                  ${escapeSpareHtml(t("Ajusta los filtros o contáctanos para encontrar el repuesto que necesitas."))}
                </p>
              </div>
            </div>`;
}

/**
 * Actualiza el resumen de resultados.
 */
function updateSparePartsResultsInfo(start, shown, total) {
  const summary = document.getElementById("sparePartsSummary");

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
 * Genera los controles de paginación.
 */
function renderSparePartsPagination(totalPages) {
  const list = document.getElementById("sparePartsPagination");

  if (!list) return;

  const current = sparePartsState.page;
  const isFirst = current === 1;
  const isLast = current === totalPages;

  let html = "";

  html += `
              <li class="page-item${isFirst ? " disabled" : ""}">
                <a class="page-link" href="#"${isFirst ? ' tabindex="-1" aria-disabled="true"' : ` data-page-target="${current - 1}"`}>${escapeSpareHtml(t("Anterior"))}</a>
              </li>`;

  for (let page = 1; page <= totalPages; page++) {
    const isActive = page === current;

    html += `
              <li class="page-item${isActive ? " active" : ""}">
                <a class="page-link" href="#" data-page-target="${page}"${isActive ? ' aria-current="page"' : ""}>${page}</a>
              </li>`;
  }

  html += `
              <li class="page-item${isLast ? " disabled" : ""}">
                <a class="page-link" href="#"${isLast ? ' tabindex="-1" aria-disabled="true"' : ` data-page-target="${current + 1}"`}>${escapeSpareHtml(t("Siguiente"))}</a>
              </li>`;

  list.innerHTML = html;
}

/**
 * Reactiva carruseles y zoom después de renderizar las tarjetas.
 */
function refreshSpareWidgets() {
  if (typeof initTruckCarousels === "function") initTruckCarousels();
  if (typeof initTruckZoomModal === "function") initTruckZoomModal();
}

/**
 * Desplaza la vista al inicio del listado.
 */
function scrollToSpareParts() {
  const grid = document.getElementById("sparePartsGrid");

  if (!grid) return;

  window.scrollTo({
    top: grid.getBoundingClientRect().top + window.pageYOffset - 100,
    behavior: "smooth",
  });
}

/**
 * Formatea el precio en dólares.
 */
function formatSparePrice(price) {
  return `$${price.toLocaleString("en-US")}`;
}

/**
 * Escapa caracteres especiales de HTML.
 */
function escapeSpareHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
