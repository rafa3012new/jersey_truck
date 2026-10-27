/**
 * TruckFleet - Detalle del camión
 * Renderiza la ficha completa de una unidad del catálogo estático
 * (INVENTORY_TRUCKS, definido en inventory.js) usando el parámetro ?id= de la URL.
 *
 * Reutiliza el carrusel y el modal de zoom existentes (main.js) y sincroniza
 * las miniaturas mediante los eventos "truck-carousel:go" / "truck-carousel:change".
 */

document.addEventListener("DOMContentLoaded", initTruckDetail);

// Vuelve a renderizar la ficha cuando el usuario cambia de idioma.
document.addEventListener("truckfleet:languagechange", () => {
  if (document.getElementById("truckDetailBody")) initTruckDetail();
});

/**
 * Punto de entrada de la página de detalle
 */
function initTruckDetail() {
  const body = document.getElementById("truckDetailBody");

  // Solo se ejecuta en la página de detalle
  if (!body) return;

  const truck = getTruckFromUrl();

  if (!truck) {
    renderTruckNotFound();
    return;
  }

  renderTruckHeader(truck);
  renderTruckGallery(truck);
  renderTruckSidebar(truck);
  renderTruckSpecs(truck);
  renderTruckDescription(truck);
  renderTruckEquipment(truck);
  renderSimilarTrucks(truck);
  updateTruckMeta(truck);
}

/**
 * Obtiene la unidad indicada en la URL (?id=)
 * @returns {Object|null} Camión encontrado o null
 */
function getTruckFromUrl() {
  const catalog =
    typeof TRUCK_SALES_DATA !== "undefined" && Array.isArray(TRUCK_SALES_DATA)
      ? TRUCK_SALES_DATA
      : typeof INVENTORY_TRUCKS !== "undefined"
      ? INVENTORY_TRUCKS
      : null;

  if (!catalog) return null;

  const params = new URLSearchParams(window.location.search);
  const id = Number.parseInt(params.get("id"), 10);

  if (Number.isNaN(id)) return null;

  return catalog.find((truck) => truck.id === id) || null;
}

/* ===================================
   Encabezado
   =================================== */

function renderTruckHeader(truck) {
  const title = document.getElementById("detailTitle");
  const subtitle = document.getElementById("detailSubtitle");
  const badges = document.getElementById("detailBadges");
  const breadcrumb = document.getElementById("detailBreadcrumb");

  const fullName = getFullName(truck);

  if (title) title.textContent = fullName;
  if (breadcrumb) breadcrumb.textContent = truck.name;

  if (subtitle) {
    subtitle.textContent = t(
      "{type} · {condition} · Unidad #{stock}",
      {
        type: t(truck.typeName),
        condition: t(
          truck.condition === "new" ? "Unidad nueva" : "Unidad usada"
        ),
        stock: getStockNumber(truck),
      }
    );
  }

  if (badges) {
    badges.innerHTML = `
      <span class="badge ${truck.badgeClass}">${escapeHtml(t(truck.badge))}</span>
      <span class="badge badge-outline"><i class="bi bi-tag me-1"></i>${escapeHtml(t(truck.typeName))}</span>
      <span class="badge badge-outline"><i class="bi bi-box-seam me-1"></i>${escapeHtml(t(truck.dutyName))}</span>
      <span class="badge badge-outline"><i class="bi bi-upc-scan me-1"></i>#${getStockNumber(truck)}</span>
    `;
  }
}

/* ===================================
   Galería (carrusel + miniaturas)
   =================================== */

function renderTruckGallery(truck) {
  const gallery = document.getElementById("truckGallery");
  if (!gallery) return;

  // El placeholder también existe en inglés para no mostrar texto en español.
  const placeholderSrc =
    getLanguage() === "en"
      ? "../assets/img/placeholder-truck-en.svg"
      : "../assets/img/placeholder-truck.svg";

  const sourceImages =
    truck.images && truck.images.length
      ? truck.images
      : [
          {
            src: placeholderSrc,
            desc: `${truck.name} - Sin imagen disponible`,
          },
        ];

  // Traduce la descripción de cada foto (marca y modelo se conservan).
  const images = sourceImages.map((image) => ({
    ...image,
    desc: localizeImageDesc(image.desc),
  }));

  const items = images
    .map((image, index) => {
      const isVideo =
        typeof isTruckVideoSrc === "function"
          ? isTruckVideoSrc(image.src)
          : /\.(mp4|webm|ogg|mov|m4v)$/i.test(String(image.src)) ||
            /^v/i.test(String(image.src).split("/").pop().replace(/\.[^.]*$/, ""));

      const media = isVideo
        ? `<video src="${escapeHtml(image.src)}" class="truck-card-img" aria-label="${escapeHtml(image.desc)}"
            muted playsinline loop preload="${index === 0 ? "metadata" : "none"}"></video>`
        : `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.desc)}" class="truck-card-img"
            loading="${index === 0 ? "eager" : "lazy"}" />`;

      return `
        <div class="truck-carousel-item${index === 0 ? " active" : ""}" data-desc="${escapeHtml(image.desc)}" data-media-type="${isVideo ? "video" : "image"}">
          ${media}
        </div>`;
    })
    .join("");

  const thumbs = images
    .map((image, index) => {
      const isVideo =
        typeof isTruckVideoSrc === "function"
          ? isTruckVideoSrc(image.src)
          : /\.(mp4|webm|ogg|mov|m4v)$/i.test(String(image.src)) ||
            /^v/i.test(String(image.src).split("/").pop().replace(/\.[^.]*$/, ""));

      const thumbMedia = isVideo
        ? `<video src="${escapeHtml(image.src)}" muted playsinline preload="metadata"></video>`
        : `<img src="${escapeHtml(image.src)}" alt="" loading="lazy" />`;

      return `
        <button type="button" class="detail-thumb${index === 0 ? " active" : ""}" data-thumb-index="${index}"
          aria-label="${escapeHtml(
            t("Ver imagen {n}: {desc}", { n: index + 1, desc: image.desc })
          )}" aria-pressed="${index === 0}">
          ${thumbMedia}
          <span class="detail-thumb-number">${index + 1}</span>
        </button>`;
    })
    .join("");

  gallery.innerHTML = `
    <div class="detail-gallery" data-gallery>
      <div class="truck-carousel detail-carousel" data-carousel>
        <div class="truck-carousel-images">${items}
        </div>
        <button class="truck-carousel-arrow truck-carousel-prev" data-carousel-prev aria-label="${escapeHtml(t("Anterior imagen"))}">
          <i class="bi bi-chevron-left"></i>
        </button>
        <button class="truck-carousel-arrow truck-carousel-next" data-carousel-next aria-label="${escapeHtml(t("Siguiente imagen"))}">
          <i class="bi bi-chevron-right"></i>
        </button>
        ${
          images.length > 1
            ? `<span class="detail-gallery-counter" data-gallery-counter>1 / ${images.length}</span>`
            : ""
        }
        <span class="detail-gallery-hint">
          <i class="bi bi-zoom-in me-1"></i>${escapeHtml(t("Clic en la foto para ampliar"))}
        </span>
      </div>
      <div class="truck-carousel-desc detail-gallery-desc" data-carousel-desc>${escapeHtml(
        images[0].desc
      )}</div>
      <div class="detail-thumbs" data-gallery-thumbs>${thumbs}
      </div>
    </div>
  `;

  // Activa el carrusel y el zoom ya existentes sobre el nuevo markup
  if (typeof initTruckCarousels === "function") initTruckCarousels();
  if (typeof initTruckZoomModal === "function") initTruckZoomModal();

  bindGalleryThumbs(gallery, images.length);
}

/**
 * Sincroniza las miniaturas con el carrusel principal
 * @param {HTMLElement} gallery - Contenedor de la galería
 * @param {number} total - Total de imágenes
 */
function bindGalleryThumbs(gallery, total) {
  const carousel = gallery.querySelector("[data-carousel]");
  const thumbs = gallery.querySelector("[data-gallery-thumbs]");
  const counter = gallery.querySelector("[data-gallery-counter]");

  if (!carousel || !thumbs) return;

  const setActive = (index) => {
    thumbs.querySelectorAll("[data-thumb-index]").forEach((thumb) => {
      const isActive = Number(thumb.dataset.thumbIndex) === index;
      thumb.classList.toggle("active", isActive);
      thumb.setAttribute("aria-pressed", String(isActive));
    });

    if (counter) counter.textContent = `${index + 1} / ${total}`;
  };

  thumbs.addEventListener("click", (event) => {
    const thumb = event.target.closest("[data-thumb-index]");
    if (!thumb) return;

    const index = Number(thumb.dataset.thumbIndex);
    carousel.dispatchEvent(
      new CustomEvent("truck-carousel:go", { detail: { index } })
    );
  });

  carousel.addEventListener("truck-carousel:change", (event) => {
    setActive(event.detail.index);
  });

  setActive(0);
}

/* ===================================
   Barra lateral (precio, resumen, contacto)
   =================================== */

function renderTruckSidebar(truck) {
  renderTruckPriceCard(truck);
  renderTruckQuickSpecs(truck);
  renderTruckDealerCard(truck);
}

function renderTruckPriceCard(truck) {
  const card = document.getElementById("truckPriceCard");
  if (!card) return;

  const fullName = getFullName(truck);

  card.innerHTML = `
    <div class="detail-price-badges">
      <span class="badge ${truck.badgeClass}">${escapeHtml(t(truck.badge))}</span>
      <span class="badge badge-outline">${escapeHtml(t(truck.typeName))}</span>
    </div>
    <div class="detail-price">${formatUsdPrice(truck.price)} <span>USD</span></div>
    <p class="detail-price-note">${escapeHtml(
      t("Precio de venta · Unidad #{stock}", { stock: getStockNumber(truck) })
    )}</p>
    <div class="detail-actions">
      <a href="./contact.html?truck=${encodeURIComponent(fullName)}" class="btn btn-primary w-100">
        <i class="bi bi-envelope me-2"></i>${escapeHtml(t("Solicitar información"))}
      </a>
      <a href="tel:+18005550123" class="btn btn-outline-primary w-100">
        <i class="bi bi-telephone me-2"></i>+1 (800) 555-0123
      </a>
    </div>
    <p class="detail-price-foot">
      <i class="bi bi-shield-check me-1"></i>${escapeHtml(t("Financiamiento disponible sujeto a aprobación."))}
    </p>
  `;
}

function renderTruckQuickSpecs(truck) {
  const card = document.getElementById("truckQuickSpecs");
  if (!card) return;

  const specs = [
    ["bi-calendar3", t("Año"), truck.year],
    ["bi-speedometer2", t("Kilometraje"), formatMileage(truck.mileage)],
    [truck.fuelIcon || "bi-fuel-pump", t("Combustible"), t(truck.fuel)],
    ["bi-gear", t("Transmisión"), t(truck.transmission)],
    ["bi-truck", t("Tipo"), t(truck.typeName)],
    ["bi-palette", t("Color"), t(getColor(truck))],
    ["bi-box-seam", t("Categoría"), t(truck.dutyName)],
    ["bi-cpu", t("Motor"), getEngine(truck)],
    ["bi-geo-alt", t("Ubicación"), getLocation(truck)],
  ];

  card.innerHTML = `
    <h2 class="detail-card-title">${escapeHtml(t("Resumen de la unidad"))}</h2>
    <ul class="detail-quick-specs">
      ${specs
        .map(
          ([icon, label, value]) => `
        <li>
          <i class="bi ${icon}"></i>
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(String(value))}</strong>
        </li>`
        )
        .join("")}
    </ul>
  `;
}

function renderTruckDealerCard(truck) {
  const card = document.getElementById("truckDealerCard");
  if (!card) return;

  card.innerHTML = `
    <h2 class="detail-card-title">TruckFleet</h2>
    <p class="detail-dealer-line"><i class="bi bi-geo-alt"></i>${getLocation(truck)}</p>
    <p class="detail-dealer-line"><i class="bi bi-telephone"></i>+1 (800) 555-0123</p>
    <p class="detail-dealer-line"><i class="bi bi-envelope"></i>info@truckfleet.demo</p>
    <p class="detail-dealer-line"><i class="bi bi-clock"></i>${escapeHtml(t("Lun - Vie: 8:00 AM - 6:00 PM"))}</p>
    <a href="./contact.html" class="btn btn-outline-primary w-100 mt-2">
      <i class="bi bi-chat-dots me-2"></i>${escapeHtml(t("Agendar una visita"))}
    </a>
  `;
}

/* ===================================
   Especificaciones
   =================================== */

function renderTruckSpecs(truck) {
  const container = document.getElementById("truckSpecs");
  if (!container) return;

  const groups = buildSpecGroups(truck);

  container.innerHTML = groups
    .map(
      (group) => `
    <section class="detail-spec-group">
      <h3 class="detail-spec-group-title"><i class="bi ${group.icon}"></i>${group.title}</h3>
      <table class="detail-spec-table">
        <tbody>
          ${group.items
            .map(
              ([label, value]) => `
          <tr>
            <td>${escapeHtml(label)}</td>
            <td>${escapeHtml(String(value))}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </section>`
    )
    .join("");
}

/**
 * Construye los grupos de especificaciones de la unidad.
 * Los datos complementarios son de demostración y se derivan de forma
 * determinista a partir de las características del catálogo.
 * @param {Object} truck - Datos del camión
 * @returns {Array} Grupos de especificaciones
 */
function buildSpecGroups(truck) {
  return [
    {
      icon: "bi-clipboard-check",
      title: t("Información general"),
      items: [
        [t("Unidad"), `#${getStockNumber(truck)}`],
        [t("Condición"), t(truck.badge)],
        [t("Año"), truck.year],
        [t("Marca"), truck.makeName],
        [t("Modelo"), truck.name],
        [t("Tipo"), t(truck.typeName)],
        [t("Categoría de carga"), t(truck.dutyName)],
        [t("Color exterior"), t(getColor(truck))],
        [t("Kilometraje"), formatMileage(truck.mileage)],
        [t("Ubicación"), getLocation(truck)],
      ],
    },
    {
      icon: "bi-cpu",
      title: t("Motor y tren motriz"),
      items: [
        [t("Motor"), getEngine(truck)],
        [t("Potencia"), getPower(truck)],
        [t("Torque"), getTorque(truck)],
        [t("Combustible"), t(truck.fuel)],
        [t("Cilindrada"), isElectric(truck) ? t("No aplica") : "12.8 L"],
        [
          t("Norma de emisiones"),
          isElectric(truck) ? t("Cero emisiones") : "EPA 2021",
        ],
      ],
    },
    {
      icon: "bi-gear-wide-connected",
      title: t("Transmisión y ejes"),
      items: [
        [t("Transmisión"), t(truck.transmission)],
        [t("Ejes"), truck.type === "semi" ? "6x4" : "4x2"],
        [t("Relación final"), "3.42"],
        [
          t("Quinta rueda"),
          t(truck.type === "daycab" ? "No incluida" : "Incluida"),
        ],
      ],
    },
    {
      icon: "bi-rulers",
      title: t("Dimensiones y capacidad"),
      items: [
        [t("GVWR"), getGvwr(truck)],
        [t("Distancia entre ejes"), getWheelbase(truck)],
        [t("Capacidad de combustible"), getFuelCapacity(truck)],
        [t("Color exterior"), t(getColor(truck))],
        [t("Color exterior"), t(getColor(truck))],
      ],
    },
    {
      icon: "bi-person-workspace",
      title: t("Cabina y confort"),
      items: [
        [t("Tipo de cabina"), t(truck.typeName)],
        [t("Aire acondicionado"), t("Sí")],
        [t("Asientos"), t(truck.type === "sleeper" ? "2 (con litera)" : "2")],
        [t("Entretenimiento"), "Radio AM/FM · Bluetooth"],
      ],
    },
  ];
}

/* ===================================
   Descripción y equipamiento
   =================================== */

function renderTruckDescription(truck) {
  const container = document.getElementById("truckDescription");
  if (!container) return;

  const condition = t(truck.condition === "new" ? "nueva" : "usada");

  const uses = {
    daycab: "distribución urbana y entregas de corta distancia",
    sleeper: "transporte de larga distancia y rutas interestatales",
    semi: "transporte de carga pesada y operaciones de flota",
    box: "logística y reparto de mercancía",
  };
  const use = t(uses[truck.type] || "transporte de carga");

  const firstParagraph = t(
    "Esta unidad <strong>{name}</strong> {condition} se encuentra disponible en TruckFleet con <strong>{mileage}</strong> y un motor <strong>{engine}</strong>. Su configuración <strong>{type}</strong> la hace ideal para {use}.",
    {
      name: escapeHtml(getFullName(truck)),
      condition,
      mileage: formatMileage(truck.mileage),
      engine: escapeHtml(getEngine(truck)),
      type: escapeHtml(t(truck.typeName)),
      use,
    }
  );

  container.innerHTML = `
    <p class="detail-paragraph">
      ${firstParagraph}
    </p>
    <p class="detail-paragraph">
      ${escapeHtml(t("Todas nuestras unidades pasan por una revisión mecánica antes de la entrega y cuentan con documentación verificada. El precio publicado es de venta y no incluye impuestos ni trámites."))}
    </p>
    <div class="detail-highlights">
      <div class="detail-highlight"><i class="bi bi-shield-check"></i><span>${escapeHtml(t("Inspección mecánica incluida"))}</span></div>
      <div class="detail-highlight"><i class="bi bi-file-earmark-check"></i><span>${escapeHtml(t("Documentación verificada"))}</span></div>
      <div class="detail-highlight"><i class="bi bi-cash-coin"></i><span>${escapeHtml(t("Financiamiento disponible"))}</span></div>
      <div class="detail-highlight"><i class="bi bi-truck"></i><span>${escapeHtml(t("Entrega a nivel nacional"))}</span></div>
    </div>
  `;
}

const TRUCK_EQUIPMENT = [
  "Aire acondicionado",
  "Frenos ABS",
  "Control de crucero",
  "Espejos eléctricos",
  "Asiento del conductor neumático",
  "Bloqueo de diferencial",
  "Freno de motor",
  "Luces LED",
  "Radio AM/FM con Bluetooth",
  "Cámara de reversa",
  "Control de estabilidad",
  "Tanque de aluminio",
];

function renderTruckEquipment(truck) {
  const list = document.getElementById("truckEquipment");
  if (!list) return;

  let items = [];
  if (Array.isArray(truck.equipment) && truck.equipment.length) {
    items = truck.equipment;
  } else {
    const offset = truck.id % TRUCK_EQUIPMENT.length;
    items = [
      ...TRUCK_EQUIPMENT.slice(offset),
      ...TRUCK_EQUIPMENT.slice(0, offset),
    ].slice(0, 8);
  }

  list.innerHTML = items
    .map(
      (item) => `
    <li><i class="bi bi-check-circle-fill"></i><span>${escapeHtml(t(item))}</span></li>`
    )
    .join("");
}

/* ===================================
   Camiones similares
   =================================== */

function renderSimilarTrucks(truck) {
  const container = document.getElementById("truckSimilar");
  const section = document.getElementById("truckSimilarSection");
  if (!container) return;

  const catalog =
    typeof TRUCK_SALES_DATA !== "undefined" && Array.isArray(TRUCK_SALES_DATA)
      ? TRUCK_SALES_DATA
      : typeof INVENTORY_TRUCKS !== "undefined"
      ? INVENTORY_TRUCKS
      : [];

  const similar = catalog.filter(
    (candidate) => candidate.id !== truck.id
  )
    .sort((a, b) => similarityScore(b, truck) - similarityScore(a, truck))
    .slice(0, 3);

  if (!similar.length) {
    if (section) section.classList.add("d-none");
    return;
  }

  container.innerHTML = similar
    .map((candidate) => buildTruckCard(candidate, "col-md-6 col-lg-4"))
    .join("");

  if (typeof initTruckCarousels === "function") initTruckCarousels();
  if (typeof initTruckZoomModal === "function") initTruckZoomModal();
}

/**
 * Puntúa qué tan similar es una unidad respecto a la mostrada
 */
function similarityScore(candidate, truck) {
  let score = 0;

  if (candidate.make === truck.make) score += 3;
  if (candidate.type === truck.type) score += 2;
  if (candidate.condition === truck.condition) score += 1;

  return score;
}

/* ===================================
   Estado no encontrado y metadatos
   =================================== */

function renderTruckNotFound() {
  const body = document.getElementById("truckDetailBody");
  const empty = document.getElementById("truckDetailEmpty");
  const title = document.getElementById("detailTitle");
  const subtitle = document.getElementById("detailSubtitle");
  const badges = document.getElementById("detailBadges");
  const breadcrumb = document.getElementById("detailBreadcrumb");
  const similar = document.getElementById("truckSimilarSection");

  if (body) body.classList.add("d-none");
  if (empty) empty.classList.remove("d-none");
  if (title) title.textContent = t("Camión no encontrado");
  if (subtitle)
    subtitle.textContent = t(
      "La unidad solicitada no está disponible en este momento."
    );
  if (badges) badges.innerHTML = "";
  if (breadcrumb) breadcrumb.textContent = t("No encontrado");
  if (similar) similar.classList.add("d-none");

  document.title = t("Camión no encontrado | TruckFleet");
}

function updateTruckMeta(truck) {
  const fullName = getFullName(truck);

  document.title = `${fullName} | TruckFleet`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) {
    meta.setAttribute(
      "content",
      t(
        "{name} {condition} en venta. {mileage}, {transmission}, {fuel}. Unidad #{stock}.",
        {
          name: fullName,
          condition: t(truck.condition === "new" ? "nuevo" : "usado"),
          mileage: formatMileage(truck.mileage),
          transmission: t(truck.transmission),
          fuel: t(truck.fuel),
          stock: getStockNumber(truck),
        }
      )
    );
  }
}

/* ===================================
   Datos complementarios (demo)
   =================================== */

function isElectric(truck) {
  return (
    truck.fuelType === "electric" ||
    truck.fuel === "Electric" ||
    truck.fuel === "Eléctrico"
  );
}

function isNaturalGas(truck) {
  return (
    truck.fuelType === "natural-gas" ||
    truck.fuel === "Natural Gas" ||
    truck.fuel === "Gas Natural"
  );
}

/**
 * Nombre comercial completo de la unidad.
 * El catálogo ya incluye la marca en `name` (p. ej. "Mack Anthem"),
 * por eso no se antepone `makeName` para evitar duplicados.
 */
function getFullName(truck) {
  if (truck.fullName) return truck.fullName;
  return `${truck.year} ${truck.name}`;
}

function getStockNumber(truck) {
  if (truck.stockNumber) return truck.stockNumber;
  return `TF-${1000 + truck.id * 37}`;
}

function getLocation(truck) {
  if (truck.location) return truck.location;
  const locations = ["Miami, FL", "Houston, TX", "Atlanta, GA", "Phoenix, AZ"];
  return locations[truck.id % locations.length];
}

function getColor(truck) {
  if (truck.color) return truck.color;

  const colors = ["Blanco", "Negro", "Azul", "Rojo", "Gris", "Plata"];
  return colors[truck.id % colors.length];
}

function getEngine(truck) {
  if (truck.engine) return truck.engine;
  if (isElectric(truck)) return t("Detroit ePowertrain (eléctrico)");
  if (isNaturalGas(truck)) return "Cummins Westport ISX12N 11.9L";

  const engines = {
    freightliner: "Detroit DD13 12.8L",
    kenworth: "PACCAR MX-13 12.9L",
    peterbilt: "PACCAR MX-13 12.9L",
    volvo: "Volvo D13 12.8L",
    mack: "Mack MP8 13.0L",
  };

  return engines[truck.make] || t("Motor diésel 12.8L");
}

function getPower(truck) {
  if (truck.power) return truck.power;
  if (isElectric(truck)) return "291 kW (391 hp)";
  if (isNaturalGas(truck)) return "400 hp";
  return truck.type === "sleeper" ? "505 hp" : "450 hp";
}

function getTorque(truck) {
  if (truck.torque) return truck.torque;
  if (isElectric(truck)) return "1,800 lb-ft";
  if (isNaturalGas(truck)) return "1,450 lb-ft";
  return truck.type === "sleeper" ? "1,850 lb-ft" : "1,650 lb-ft";
}

function getGvwr(truck) {
  if (truck.gvwr) return truck.gvwr;
  if (truck.type === "semi") return "80,000 lb";
  if (truck.type === "sleeper") return "53,000 lb";
  return "35,000 lb";
}

function getWheelbase(truck) {
  if (truck.wheelbase) return truck.wheelbase;
  if (truck.type === "semi") return "240 in";
  if (truck.type === "sleeper") return "232 in";
  return "190 in";
}

function getFuelCapacity(truck) {
  if (truck.fuelCapacity) return truck.fuelCapacity;
  if (isElectric(truck)) return "438 kWh";
  if (isNaturalGas(truck)) return t("100 gal GNC");
  return "120 gal";
}
