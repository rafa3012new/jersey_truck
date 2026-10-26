/**
 * TruckFleet - Renta de Trucks
 * Catálogo estático de trucks para renta, filtros, paginación y tarjetas.
 * Reutiliza los carruseles y el zoom de main.js.
 */

const TRUCK_RENTAL_FLEET = [
  {
    id: 1,
    name: "Freightliner M2 106",
    make: "freightliner",
    makeName: "Freightliner",
    year: 2022,
    mileage: 425000,
    fuel: "Diésel",
    fuelType: "diesel",
    fuelIcon: "bi-fuel-pump",
    transmission: "Automático",
    transmissionType: "automatic",
    type: "daycab",
    typeName: "Day Cab",
    color: "Blanco",
    duty: "medium",
    dutyName: "Medium Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 390,
    images: [
      {
        src: "../assets/img/jifif_truck_image_1_Freightliner_M2 106 Plus.jfif",
        desc: "Freightliner M2 106 - Vista Frontal",
      },
      {
        src: "../assets/img/webp_truck_image_1.webp",
        desc: "Freightliner M2 106 - Vista Lateral",
      },
    ],
  },
  {
    id: 2,
    name: "Kenworth T800",
    make: "kenworth",
    makeName: "Kenworth",
    year: 2023,
    mileage: 215000,
    fuel: "Diésel",
    fuelType: "diesel",
    fuelIcon: "bi-fuel-pump",
    transmission: "Manual",
    transmissionType: "manual",
    type: "daycab",
    typeName: "Day Cab",
    color: "Rojo",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 520,
    images: [
      {
        src: "../assets/img/webp_truck_image_2_Kenworth_T800.png",
        desc: "Kenworth T800 - Vista Frontal",
      },
      {
        src: "../assets/img/webp_truck_image_2.webp",
        desc: "Kenworth T800 - Vista Lateral",
      },
      {
        src: "../assets/img/webp_truck_image_1.webp",
        desc: "Kenworth T800 - Vista Trasera",
      },
    ],
  },
  {
    id: 3,
    name: "Mack Granite",
    make: "mack",
    makeName: "Mack",
    year: 2025,
    mileage: 80000,
    fuel: "Diésel",
    fuelType: "diesel",
    fuelIcon: "bi-fuel-pump",
    transmission: "Automático",
    transmissionType: "automatic",
    type: "daycab",
    typeName: "Day Cab",
    color: "Blanco",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 560,
    images: [
      {
        src: "../assets/img/webp_truck_image_1_Mack Granite.webp",
        desc: "Mack Granite - Vista Frontal",
      },
      {
        src: "../assets/img/webp_truck_image_1.webp",
        desc: "Mack Granite - Vista Lateral",
      },
      {
        src: "../assets/img/webp_truck_image_3.webp",
        desc: "Mack Granite - Cabina",
      },
    ],
  },
  {
    id: 4,
    name: "Mack Anthem",
    make: "mack",
    makeName: "Mack",
    year: 2024,
    mileage: 85000,
    fuel: "Diésel",
    fuelType: "diesel",
    fuelIcon: "bi-fuel-pump",
    transmission: "Automático",
    transmissionType: "automatic",
    type: "sleeper",
    typeName: "Sleeper",
    color: "Azul",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 610,
    images: [
      {
        src: "../assets/img/webp_truck_image_2_Mack Anthem.webp",
        desc: "Mack Anthem - Vista Frontal",
      },
      {
        src: "../assets/img/webp_truck_image_2.webp",
        desc: "Mack Anthem - Vista Lateral",
      },
      {
        src: "../assets/img/webp_truck_image_1.webp",
        desc: "Mack Anthem - Cabina",
      },
    ],
  },
  {
    id: 5,
    name: "Freightliner eCascadia",
    make: "freightliner",
    makeName: "Freightliner",
    year: 2026,
    mileage: 0,
    fuel: "Eléctrico",
    fuelType: "electric",
    fuelIcon: "bi-battery-charging",
    transmission: "Automático",
    transmissionType: "automatic",
    type: "daycab",
    typeName: "Day Cab",
    color: "Blanco",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 750,
    images: [
      {
        src: "../assets/img/jifif_truck_image_2_Freightliner eCascadia.jfif",
        desc: "Freightliner eCascadia - Vista Frontal",
      },
      {
        src: "../assets/img/webp_truck_image_1.webp",
        desc: "Freightliner eCascadia - Vista Lateral",
      },
      {
        src: "../assets/img/webp_truck_image_3.webp",
        desc: "Freightliner eCascadia - Vista Trasera",
      },
    ],
  },
  {
    id: 6,
    name: "Peterbilt 389",
    make: "peterbilt",
    makeName: "Peterbilt",
    year: 2023,
    mileage: 165000,
    fuel: "Gas Natural",
    fuelType: "natural-gas",
    fuelIcon: "bi-fire",
    transmission: "Manual",
    transmissionType: "manual",
    type: "sleeper",
    typeName: "Sleeper",
    color: "Rojo",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 570,
    images: [
      {
        src: "../assets/img/main_demo_webp_truck_image.webp",
        desc: "Peterbilt 389 - Vista Frontal",
      },
      {
        src: "../assets/img/jpg_truck_image_4.jpg",
        desc: "Peterbilt 389 - Vista Lateral",
      },
      {
        src: "../assets/img/webp_truck_image_3.webp",
        desc: "Peterbilt 389 - Vista Trasera",
      },
    ],
  },
  {
    id: 7,
    name: "Kenworth T680",
    make: "kenworth",
    makeName: "Kenworth",
    year: 2024,
    mileage: 120000,
    fuel: "Diésel",
    fuelType: "diesel",
    fuelIcon: "bi-fuel-pump",
    transmission: "Automático",
    transmissionType: "automatic",
    type: "sleeper",
    typeName: "Sleeper",
    color: "Azul",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 630,
    images: [
      {
        src: "../assets/img/webp_truck_image_1_Kenworth_T680.png",
        desc: "Kenworth T680 - Vista Frontal",
      },
      {
        src: "../assets/img/main_demo_webp_truck_image_2.webp",
        desc: "Kenworth T680 - Vista Lateral",
      },
      {
        src: "../assets/img/webp_truck_image_2.webp",
        desc: "Kenworth T680 - Cabina",
      },
    ],
  },
  {
    id: 8,
    name: "Freightliner Cascadia 126",
    make: "freightliner",
    makeName: "Freightliner",
    year: 2021,
    mileage: 455000,
    fuel: "Diésel",
    fuelType: "diesel",
    fuelIcon: "bi-fuel-pump",
    transmission: "Manual",
    transmissionType: "manual",
    type: "semi",
    typeName: "Semi Remolque",
    color: "Plata",
    duty: "heavy",
    dutyName: "Heavy Duty",
    badge: "Renta",
    badgeClass: "badge-primary",
    rate: 450,
    images: [
      {
        src: "../assets/img/webp_truck_image_2_Freightliner eCascadia.png",
        desc: "Freightliner Cascadia 126 - Vista Frontal",
      },
      {
        src: "../assets/img/jpg_truck_image_1.jpg",
        desc: "Freightliner Cascadia 126 - Vista Lateral",
      },
      {
        src: "../assets/img/jpg_truck_image_2.jpg",
        desc: "Freightliner Cascadia 126 - Cabina",
      },
    ],
  },
];

const truckRentalState = {
  page: 1,
  perPage: 6,
  sort: "newest",
  filters: {
    search: "",
    type: "",
    make: "",
    year: "",
    fuelType: "",
    duty: "",
    transmissionType: "",
  },
};

document.addEventListener("DOMContentLoaded", initTruckRental);

// Vuelve a pintar el listado cuando el usuario cambia de idioma.
document.addEventListener("truckfleet:languagechange", () => {
  if (document.getElementById("trucksGrid")) {
    populateTruckMakeFilter();
    populateTruckYearFilter();
    renderTruckRental();
  }
});

/**
 * Inicializa la página de renta de trucks.
 */
function initTruckRental() {
  const grid = document.getElementById("trucksGrid");

  if (!grid) return;

  truckRentalState.perPage = parseInt(grid.dataset.perPage, 10) || 6;

  populateTruckMakeFilter();
  populateTruckYearFilter();
  bindTruckRentalEvents();
  renderTruckRental();
}

/**
 * Rellena el filtro de marca con las marcas presentes en el catálogo.
 */
function populateTruckMakeFilter() {
  const makeSelect = document.getElementById("truckMake");

  if (!makeSelect) return;

  const selectedMake = makeSelect.value;
  const makes = [
    ...new Map(
      TRUCK_RENTAL_FLEET.map((truck) => [truck.make, truck.makeName])
    ).entries(),
  ].sort((a, b) => a[1].localeCompare(b[1]));

  makeSelect.innerHTML = [
    `<option value="">${escapeTruckHtml(t("Todas"))}</option>`,
    ...makes.map(
      ([value, label]) =>
        `<option value="${escapeTruckHtml(value)}">${escapeTruckHtml(label)}</option>`
    ),
  ].join("");

  makeSelect.value = makes.some(([value]) => value === selectedMake)
    ? selectedMake
    : "";
}

/**
 * Rellena el filtro de año con todos los años presentes en el catálogo.
 */
function populateTruckYearFilter() {
  const yearSelect = document.getElementById("truckYear");

  if (!yearSelect) return;

  const selectedYear = yearSelect.value;
  const years = [...new Set(TRUCK_RENTAL_FLEET.map((truck) => truck.year))].sort(
    (a, b) => b - a
  );

  yearSelect.innerHTML = [
    `<option value="">${escapeTruckHtml(t("Todos"))}</option>`,
    ...years.map((year) => `<option value="${year}">${year}</option>`),
  ].join("");

  yearSelect.value = years.some((year) => String(year) === selectedYear)
    ? selectedYear
    : "";
}

/**
 * Registra los eventos de filtros, orden y paginación.
 */
function bindTruckRentalEvents() {
  const filtersForm = document.getElementById("truckRentalFilters");

  if (filtersForm) {
    filtersForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyTruckFiltersFromForm();
      truckRentalState.page = 1;
      renderTruckRental();
    });

    filtersForm.addEventListener("reset", () => {
      setTimeout(() => {
        applyTruckFiltersFromForm();
        truckRentalState.page = 1;
        renderTruckRental();
      }, 0);
    });

    filtersForm.querySelectorAll("select").forEach((select) => {
      select.addEventListener("change", () => {
        applyTruckFiltersFromForm();
        truckRentalState.page = 1;
        renderTruckRental();
      });
    });
  }

  const searchInput = document.getElementById("truckSearch");
  let searchTimer;

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        truckRentalState.filters.search = searchInput.value;
        truckRentalState.page = 1;
        renderTruckRental();
      }, 400);
    });
  }

  const sortSelect = document.getElementById("truckRentalSort");

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      truckRentalState.sort = sortSelect.value;
      truckRentalState.page = 1;
      renderTruckRental();
    });
  }

  const paginationList = document.getElementById("truckPagination");

  if (paginationList) {
    paginationList.addEventListener("click", (e) => {
      const link = e.target.closest("[data-page-target]");

      if (!link) return;

      e.preventDefault();

      const pageItem = link.closest(".page-item");
      if (pageItem && pageItem.classList.contains("disabled")) return;

      const target = parseInt(link.dataset.pageTarget, 10);
      if (!target || target === truckRentalState.page) return;

      truckRentalState.page = target;
      renderTruckRental();
      scrollToTruckRental();
    });
  }
}

/**
 * Copia los valores del formulario de filtros al estado.
 */
function applyTruckFiltersFromForm() {
  const getValue = (id) => {
    const element = document.getElementById(id);
    return element ? element.value : "";
  };

  truckRentalState.filters.search = getValue("truckSearch");
  truckRentalState.filters.type = getValue("truckType");
  truckRentalState.filters.make = getValue("truckMake");
  truckRentalState.filters.year = getValue("truckYear");
  truckRentalState.filters.fuelType = getValue("truckFuelType");
  truckRentalState.filters.duty = getValue("truckDuty");
  truckRentalState.filters.transmissionType = getValue("truckTransmissionType");
}

/**
 * Filtra el catálogo según los filtros activos.
 */
function getFilteredTruckRentals() {
  const {
    search,
    type,
    make,
    year,
    fuelType,
    duty,
    transmissionType,
  } = truckRentalState.filters;
  const query = search.trim().toLowerCase();
  const selectedYear = year ? parseInt(year, 10) : null;

  return TRUCK_RENTAL_FLEET.filter((truck) => {
    const matchesSearch =
      !query ||
      truck.name.toLowerCase().includes(query) ||
      truck.makeName.toLowerCase().includes(query);

    const matchesType = !type || truck.type === type;
    const matchesMake = !make || truck.make === make;
    const matchesYear = selectedYear === null || truck.year === selectedYear;
    const matchesFuelType = !fuelType || truck.fuelType === fuelType;
    const matchesDuty = !duty || truck.duty === duty;
    const matchesTransmission =
      !transmissionType || truck.transmissionType === transmissionType;

    return (
      matchesSearch &&
      matchesType &&
      matchesMake &&
      matchesYear &&
      matchesFuelType &&
      matchesDuty &&
      matchesTransmission
    );
  });
}

/**
 * Ordena el catálogo según el criterio seleccionado.
 */
function sortTruckRentals(trucks, sort) {
  const sorted = [...trucks];

  switch (sort) {
    case "rate-low":
      return sorted.sort((a, b) => a.rate - b.rate);
    case "rate-high":
      return sorted.sort((a, b) => b.rate - a.rate);
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
 * Renderiza la página actual de trucks.
 */
function renderTruckRental() {
  const grid = document.getElementById("trucksGrid");

  if (!grid) return;

  const trucks = sortTruckRentals(getFilteredTruckRentals(), truckRentalState.sort);
  const total = trucks.length;
  const totalPages = Math.max(1, Math.ceil(total / truckRentalState.perPage));

  if (truckRentalState.page > totalPages) truckRentalState.page = totalPages;
  if (truckRentalState.page < 1) truckRentalState.page = 1;

  const start = (truckRentalState.page - 1) * truckRentalState.perPage;
  const pageTrucks = trucks.slice(start, start + truckRentalState.perPage);

  grid.innerHTML = pageTrucks.length
    ? pageTrucks.map((truck) => buildTruckRentalCard(truck)).join("")
    : buildTruckRentalEmptyState();

  updateTruckResultsInfo(start, pageTrucks.length, total);
  renderTruckPagination(totalPages);
  refreshTruckWidgets();
}

/**
 * Construye el HTML de una tarjeta de truck en renta.
 */
function buildTruckRentalCard(truck, columnClass = "col-md-6") {
  const column =
    typeof columnClass === "string" && columnClass.trim()
      ? columnClass
      : "col-md-6";

  const images = truck.images
    .map((image, index) => {
      const imageDesc = localizeImageDesc(image.desc);

      return `
              <div class="truck-carousel-item${index === 0 ? " active" : ""}" data-desc="${escapeTruckHtml(imageDesc)}">
                <img src="${escapeTruckHtml(image.src)}" alt="${escapeTruckHtml(imageDesc)}" class="truck-card-img"
                  loading="lazy" />
              </div>`;
    })
    .join("");

  const firstImageDesc = localizeImageDesc(truck.images[0].desc);
  const contactUrl = `./contact.html?unit=${encodeURIComponent(truck.name)}`;

  return `
            <div class="${column}">
              <div class="truck-card">
                <div class="truck-carousel" data-carousel>
                  <div class="truck-carousel-images">${images}
                  </div>
                  <button class="truck-carousel-arrow truck-carousel-prev" data-carousel-prev aria-label="${escapeTruckHtml(t("Anterior imagen"))}">
                    <i class="bi bi-chevron-left"></i>
                  </button>
                  <button class="truck-carousel-arrow truck-carousel-next" data-carousel-next aria-label="${escapeTruckHtml(t("Siguiente imagen"))}">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                  <span class="badge ${truck.badgeClass} position-absolute top-0 end-0 m-3" style="z-index: 10;">${escapeTruckHtml(t(truck.badge))}</span>
                </div>
                <div class="truck-carousel-desc" data-carousel-desc>${escapeTruckHtml(firstImageDesc)}</div>
                <div class="truck-card-body">
                  <div class="truck-card-heading">
                    <h5 class="truck-card-title">${escapeTruckHtml(truck.name)}</h5>
                    <a class="truck-card-detail-link" href="${escapeTruckHtml(contactUrl)}">
                      ${escapeTruckHtml(t("Reservar"))}
                      <i class="bi bi-arrow-up-right"></i>
                    </a>
                  </div>
                  <div class="truck-card-meta">
                    <span class="truck-card-meta-item"><i class="bi bi-calendar3"></i>${truck.year}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-speedometer2"></i>${formatTruckMileage(truck.mileage)}</span>
                    <span class="truck-card-meta-item"><i class="bi ${truck.fuelIcon}"></i>${escapeTruckHtml(t(truck.fuel))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-gear"></i>${escapeTruckHtml(t(truck.transmission))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-truck"></i>${escapeTruckHtml(t(truck.typeName))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-palette"></i>${escapeTruckHtml(t(truck.color))}</span>
                    <span class="truck-card-meta-item"><i class="bi bi-box-seam"></i>${escapeTruckHtml(t(truck.dutyName))}</span>
                  </div>
                  <div class="truck-card-price">
                    ${formatTruckRate(truck.rate)} <span>USD ${escapeTruckHtml(t("por día"))}</span>
                  </div>
                </div>
                <div class="truck-card-footer">
                  <a href="${escapeTruckHtml(contactUrl)}" class="btn btn-primary w-100">
                    ${escapeTruckHtml(t("Solicitar Información"))}
                    <i class="bi bi-envelope ms-1"></i>
                  </a>
                </div>
              </div>
            </div>`;
}

/**
 * Construye el estado vacío (sin coincidencias).
 */
function buildTruckRentalEmptyState() {
  return `
            <div class="col-12">
              <div class="inventory-empty">
                <i class="bi bi-truck inventory-empty-icon"></i>
                <h5 class="inventory-empty-title">${escapeTruckHtml(t("No encontramos camiones"))}</h5>
                <p class="inventory-empty-text">
                  ${escapeTruckHtml(t("Ajusta los filtros o contáctanos para buscar la unidad que necesitas."))}
                </p>
              </div>
            </div>`;
}

/**
 * Actualiza el resumen de resultados.
 */
function updateTruckResultsInfo(start, shown, total) {
  const summary = document.getElementById("truckSummary");

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
function renderTruckPagination(totalPages) {
  const list = document.getElementById("truckPagination");

  if (!list) return;

  const current = truckRentalState.page;
  const isFirst = current === 1;
  const isLast = current === totalPages;

  let html = "";

  html += `
              <li class="page-item${isFirst ? " disabled" : ""}">
                <a class="page-link" href="#"${isFirst ? ' tabindex="-1" aria-disabled="true"' : ` data-page-target="${current - 1}"`}>${escapeTruckHtml(t("Anterior"))}</a>
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
                <a class="page-link" href="#"${isLast ? ' tabindex="-1" aria-disabled="true"' : ` data-page-target="${current + 1}"`}>${escapeTruckHtml(t("Siguiente"))}</a>
              </li>`;

  list.innerHTML = html;
}

/**
 * Reactiva carruseles y zoom después de renderizar las tarjetas.
 */
function refreshTruckWidgets() {
  if (typeof initTruckCarousels === "function") initTruckCarousels();
  if (typeof initTruckZoomModal === "function") initTruckZoomModal();
}

/**
 * Desplaza la vista al inicio del listado.
 */
function scrollToTruckRental() {
  const grid = document.getElementById("trucksGrid");

  if (!grid) return;

  window.scrollTo({
    top: grid.getBoundingClientRect().top + window.pageYOffset - 100,
    behavior: "smooth",
  });
}

/**
 * Formatea la tarifa diaria en dólares.
 */
function formatTruckRate(rate) {
  return `$${rate.toLocaleString("en-US")}`;
}

/**
 * Formatea el kilometraje.
 */
function formatTruckMileage(mileage) {
  return `${mileage.toLocaleString("en-US")} mi`;
}

/**
 * Escapa caracteres especiales de HTML.
 */
function escapeTruckHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
