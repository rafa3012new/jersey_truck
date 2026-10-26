/**
 * TruckFleet - Internacionalización (i18n)
 *
 * El HTML está escrito en español (idioma fuente) y este módulo aplica las
 * traducciones al inglés cuando el idioma activo es "en" (predeterminado).
 *
 * - Traduce nodos de texto y atributos visibles (placeholder, alt, aria-label,
 *   data-desc y meta description) de forma automática.
 * - Expone `t(clave, variables)` para las cadenas generadas por JavaScript.
 * - Guarda el idioma elegido en localStorage y lo comparte entre páginas.
 * - Emite el evento `truckfleet:languagechange` para que los componentes
 *   dinámicos (inventario, detalle, carruseles, formulario) se vuelvan a pintar.
 *
 * Convención: las claves del diccionario son el propio texto en español,
 * normalizado (espacios múltiples y saltos de línea colapsados).
 */

const I18N_STORAGE_KEY = "truckfleet-language";
const I18N_DEFAULT_LANGUAGE = "en";
const I18N_SUPPORTED_LANGUAGES = ["en", "es"];

/**
 * Diccionario español -> inglés.
 * Incluye textos estáticos de las páginas y cadenas dinámicas de los scripts.
 */
const I18N_EN = {
  /* ===========================
     Navegación y pie de página
     =========================== */
  "Inicio": "Home",
  "Nosotros": "About Us",
  "Inventario": "Inventory",
  "Contacto": "Contact",
  "Alternar navegación": "Toggle navigation",
  "Idioma": "Language",
  "Soluciones profesionales en camiones para empresas de transporte. Calidad, confianza y experiencia en cada venta.":
    "Professional truck solutions for transportation companies. Quality, trust and experience in every sale.",
  "Enlaces Rápidos": "Quick Links",
  "Servicios": "Services",
  "Venta de Camiones y Trailers": "Truck and Trailers Sales",
  "Venta de Camiones": "Truck Sales",
  "Camiones Nuevos y Usados": "New and Used Trucks",
  "Asesoría para Flotas": "Fleet Consulting",
  "Financiamiento": "Financing",
  "New York, EE. UU.": "New York, USA",
  "Lun - Vie: 8:00 AM - 6:00 PM": "Mon - Fri: 8:00 AM - 6:00 PM",
  "TruckFleet. Todos los derechos reservados. | Demo Full-Stack":
    "TruckFleet. All rights reserved. | Full-Stack Demo",

  /* ===========================
     Metadatos y títulos
     =========================== */
  "TruckFleet | Inicio": "TruckFleet | Home",
  "TruckFleet | Nosotros": "TruckFleet | About Us",
  "TruckFleet | Inventario": "TruckFleet | Inventory",
  "TruckFleet | Renta de Trucks": "TruckFleet | Truck Rental",
  "TruckFleet | Venta de Spare Parts": "TruckFleet | Spare Parts",
  "TruckFleet | Repuestos": "TruckFleet | Spare Parts",
  "TruckFleet | Contacto": "TruckFleet | Contact",
  "TruckFleet | Detalle del Camión": "TruckFleet | Truck Details",
  "TruckFleet - Demo de sitio web para camiones. Inventario, venta y soluciones para flotas.":
    "TruckFleet - Demo truck website. Inventory, sales and fleet solutions.",
  "TruckFleet - Conoce nuestra historia, misión, visión y valores.":
    "TruckFleet - Learn about our history, mission, vision and values.",
  "TruckFleet - Inventario completo de camiones nuevos y usados.":
    "TruckFleet - Complete inventory of new and used trucks.",
  "TruckFleet - Renta de trucks para empresas, proyectos y flotas.":
    "TruckFleet - Truck rentals for companies, projects and fleets.",
  "TruckFleet - Repuestos, filtros y componentes para mantener tu flota en movimiento.":
    "TruckFleet - Parts, filters and components to keep your fleet moving.",
  "TruckFleet - Ponte en contacto con nosotros para solicitar información sobre camiones.":
    "TruckFleet - Contact us to request information about trucks.",
  "TruckFleet - Detalle de la unidad, especificaciones y fotografías.":
    "TruckFleet - Unit details, specifications and photos.",

  /* ===========================
     Inicio (Home)
     =========================== */
  "Camiones de Calidad para Impulsar tu Negocio":
    "Quality Trucks to Power Your Business",
  "Soluciones confiables en camiones nuevos y usados. Amplio inventario, precios competitivos y asesoría especializada para ayudarte a encontrar el vehículo ideal para tu flota.":
    "Reliable new and used truck solutions. A wide inventory, competitive prices and expert advice to help you find the ideal vehicle for your fleet.",
  "Explorar Inventario": "Truck Sales",
  "Truck Sales": "Truck Sales",
  "Habla con Nosotros": "Talk to Us",
  "Camiones en Stock": "Trucks in Stock",
  "Años de Experiencia": "Years of Experience",
  "Clientes Satisfechos": "Satisfied Customers",
  "Camión semi-remolque profesional": "Professional semi-trailer truck",
  "¿Por Qué Elegir TruckFleet?": "Why Choose TruckFleet?",
  "Nos enfocamos en ofrecer la mejor experiencia de compra, con transparencia, calidad y soporte post-venta.":
    "We focus on delivering the best buying experience, with transparency, quality and after-sales support.",
  "Amplio Inventario": "Extensive Inventory",
  "Gran variedad de camiones nuevos y usados para cubrir cualquier necesidad de transporte.":
    "A wide variety of new and used trucks to cover any transportation need.",
  "Precios Competitivos": "Competitive Prices",
  "Ofrecemos tarifas justas y opciones flexibles para ajustarnos a tu presupuesto.":
    "We offer fair rates and flexible options to fit your budget.",
  "Calidad Garantizada": "Guaranteed Quality",
  "Cada unidad es revisada para asegurar su estado óptimo antes de la entrega.":
    "Every unit is inspected to ensure optimal condition before delivery.",
  "Asesoría Especializada": "Expert Advice",
  "Nuestro equipo te guía en cada paso para encontrar el camión perfecto para tu operación.":
    "Our team guides you every step of the way to find the perfect truck for your operation.",
  "Nuestros Servicios": "Our Services",
  "Nuestras Marcas":
    "Our Brands",
  "Compra, renta y refacciones para mantener tu flota siempre en marcha.":
    "Sales, rentals and parts to keep your fleet moving.",
  "Venta": "Sales",
  "Renta": "Rental",
  "Rentas": "Rentals",
  "Renta de Camiones": "Truck Rental",
  "Alquiler de Camiones": "Truck Rental",
  "Alquiler": "Rental",
  "Repuestos": "Parts",
  "Venta de Trucks": "Truck Sales",
  "Renta de Trucks": "Truck Rental",
  "Renta de Camiones": "Truck Rental",
  "Repuestos": "Spare Parts",
  "Venta de Spare Parts": "Spare Parts",
  "Venta de Repuestos": "Spare Parts",
  /*Card#1 Truck Sales*/
  "Amplia Flota lista para operar":"Large Fleet Ready to Operate",
  "Planes Flexibles":"Flexible Plans",
  "Encuentra camiones nuevos y usados de las principales marcas, carga pesada, carga media y carga ligera con opciones de financiamiento y garantía.":
  "Find new and used trucks from leading brands—heavy-duty, medium-duty, and light-duty—with financing and warranty options.",
  "Unidades nuevas y usadas": "New and used units",
  "Marcas Reconocidas": "Recognized Brands",
  "Financiamiento a tu Medida": "Financing Tailored to You",
  "Diferentes Opciones de Financiamiento":"Flexible Financing Options",
  "Diferentes Opciones de Garantía y Soporte": "Diverse Warranty & Support Options",
  "Asistencia en carretera 24/7": "24/7 Roadside Assistance",
  "Garantía y Soporte en Repuestos": "Warranty & Support for Spare Parts",
  "Garantía y Soporte en Unidades":"Warranty & Support for Units",
  "Renta camiones por día, semana, mes o incluso mas tiempo, mutiples opciones de camiones y trailers disponibles, y cubre tu operación con o sin una inversión inicial.":
    "Rent trucks daily, weekly, monthly, or long-term. Multiple trucks and trailers available to run your operations with zero or low down payment options.",
  "Planes flexibles": "Flexible plans",
  "Mantenimiento incluido": "Maintenance included",
  "Flota lista para operar": "Fleet ready to operate",
  "Amplio Inventario de Refacciones y repuestos originales para mantener el rendimiento de tu flota, con asesoria tecnica y garantia":
    "Wide inventory of original spare parts to maintain your fleet's performance, complete with technical advice and warranty coverage.",
  "Amplio Stock de Repuestos originales": "Extensive Inventory of Genuine OEM Parts",
  "Amplio Stock de Repuestos genericos": "Large Stock of Aftermarket Parts",
  "Asesoría Técnica": "Technical advice",
  "Solicitar Información": "Request Information",
  "Ver Información": "View Information",
  "Solicitar Cotización": "Request a Quote",
  "Ver Todo el Inventario": "View All Inventory",
  "¿Listo para Encontrar tu Próximo Camión?":
    "Ready to Find Your Next Truck?",
  "Nuestro equipo está listo para ayudarte. Solicita asesoría gratuita y encuentra la unidad que mejor se adapta a tu operación.":
    "Our team is ready to help. Request free advice and find the unit that best fits your operation.",
  "Contactar Ahora": "Contact Us Now",
  "Ver Inventario": "View Inventory",
  "Chat With Us": "Chat With Us",
  "Chatea con Nosotros": "Chat With Us",
  "Diferentes Opciones de Compra en Camiones":
    "Different Truck Purchase Options",
  "Las Mejores Marcas del Mercado": "The Best Brands on the Market",
  "Amplia Flota que se ajusta a tu necesidad": "Extensive Fleet Tailored to Your Needs",
  "Planes ajustados a su necesidad": "Plans tailored to your needs",
  "Continuidad Operativa sin Interrupciones":"Uninterrupted Operational Continuity",
  "Continuidad Operativa Garantizada": "Guaranteed Operational Continuity",
  "Tecnología e Inteligencia de Datos": "Technology and Data Intelligence",
  "Tecnología de vanguardia":"Cutting-edge technology",
  "Asesoria Tecnica especializada en repuestos":
    "Specialized technical advice on spare parts",
  "Venta de Repuestos - Inventario y asesoría":
    "Spare Parts Sales - Inventory and advice",
  "Amplio Stock de Repuestos originales":
    "Wide Stock of Original Spare Parts",
  "Repuestos Originales de Marcas Reconocidas":
   "Original Spare Parts from Well-Known Brands",
  "Repuestos Homologados (Calidad OEM)":
  "Aftermarket Spare Parts (OEM Quality)",
  "Amplio Stock de Repuestos Homologados":
    "Wide Stock of Aftermarket Spare Parts",

  /* ===========================
     Nosotros (About)
     =========================== */
  "Lo que dicen nuestros clientes": "What our customers say",
  "Opiniones reales compartidas en Google por empresas que confían en TruckFleet.":
    "Real opinions shared on Google by companies that trust TruckFleet.",
  "Sobre Nosotros": "About Us",
  "Impulsando el transporte con confianza, calidad y experiencia desde hace más de 15 años.":
    "Driving transportation forward with trust, quality and experience for over 15 years.",
  "Nuestra Historia": "Our Story",
  "En TruckFleet nos especializamos en conectar a empresas de transporte con los camiones ideales para sus operaciones.":
    "At TruckFleet we specialize in connecting transportation companies with the ideal trucks for their operations.",
  "Nacimos con la misión de simplificar la compra de camiones comerciales, ofreciendo un inventario curado, precios transparentes y asesoría honesta. Nos inspiramos en los mejores referentes del mercado para brindar una experiencia profesional, moderna y confiable.":
    "We were born with the mission of simplifying commercial truck buying, offering a curated inventory, transparent prices and honest advice. We are inspired by the best benchmarks in the market to deliver a professional, modern and reliable experience.",
  "Ya sea que busques un solo camión o ampliar toda tu flota, nuestro equipo trabaja contigo para encontrar la mejor solución adaptada a tus necesidades y presupuesto.":
    "Whether you are looking for a single truck or expanding your entire fleet, our team works with you to find the best solution for your needs and budget.",
  "Trabaja con Nosotros": "Work With Us",
  "Flota de camiones profesionales": "Professional truck fleet",
  "Misión, Visión y Valores": "Mission, Vision and Values",
  "Los pilares que guían cada decisión y servicio que ofrecemos.":
    "The pillars that guide every decision and service we offer.",
  "Misión": "Mission",
  "Proporcionar camiones de alta calidad a precios justos, ofreciendo una experiencia de compra transparente, ágil y personalizada para cada cliente.":
    "To provide high-quality trucks at fair prices, offering a transparent, agile and personalized buying experience for every customer.",
  "Visión": "Vision",
  "Ser la referencia en venta de camiones comerciales, reconocidos por nuestra integridad, servicio al cliente y compromiso con el crecimiento de nuestros clientes.":
    "To be the benchmark in commercial truck sales, recognized for our integrity, customer service and commitment to our customers' growth.",
  "Valores": "Values",
  "Honradez, transparencia, profesionalismo, calidad y enfoque total en satisfacer las necesidades de cada cliente y su operación.":
    "Honesty, transparency, professionalism, quality and a total focus on meeting the needs of each customer and their operation.",
  "Camiones Vendidos": "Trucks Sold",
  "Satisfacción Cliente": "Customer Satisfaction",
  "Soporte y Asesoría": "Support and Advice",
  "¿Listo para Empezar?": "Ready to Get Started?",
  "Descubre por qué cientos de empresas de transporte confían en TruckFleet para sus necesidades de camiones.":
    "Discover why hundreds of transportation companies trust TruckFleet for their truck needs.",
  "Hablemos Ahora": "Let's Talk Now",

  /* ===========================
     Inventario
     =========================== */
  "Inventario de Camiones": "Truck Inventory",
  "Repuestos, filtros y componentes para mantener tu flota en movimiento.":
    "Parts, filters and components to keep your fleet moving.",
  "Explora nuestro amplio catálogo de camiones nuevos y usados, listos para trabajar.":
    "Browse our wide catalog of new and used trucks, ready to work.",
  "Filtros": "Filters",
  "Buscar": "Search",
  "Marca, modelo...": "Brand, model...",
  "Estado": "Condition",
  "Todos": "All",
  "Todas": "All",
  "Nuevo": "New",
  "Usado": "Used",
  "Marca": "Brand",
  "Año": "Year",
  "Tipo de Combustible": "Fuel Type",
  "Tipo de Trabajo": "Duty Type",
  "Tipo": "Type",
  "Semi Remolque": "Semi Trailer",
  "Aplicar Filtros": "Apply Filters",
  "Limpiar": "Clear",
  "Más recientes": "Most recent",
  "Precio: Menor a Mayor": "Price: Low to High",
  "Precio: Mayor a Menor": "Price: High to Low",
  "Año: Más reciente": "Year: Most recent",
  "Kilometraje: Menor": "Mileage: Lowest",
  "Paginación inventario": "Inventory pagination",
  "Paginación de repuestos": "Parts pagination",
  "Anterior": "Previous",
  "Siguiente": "Next",
  "¿No Encuentras lo que Buscas?": "Can't Find What You're Looking For?",
  "Te ayudamos a localizar el camión específico que necesitas. Déjanos tus requerimientos y te avisamos cuando lo tengamos.":
    "We help you locate the specific truck you need. Leave us your requirements and we will let you know when we have it.",
  "Solicitar Búsqueda": "Request a Search",
  "Mostrando <strong>{from}-{to}</strong> de <strong>{total}</strong> resultados":
    "Showing <strong>{from}-{to}</strong> of <strong>{total}</strong> results",
  "No se encontraron <strong>{total}</strong> resultados": "No results found",
  "No encontramos camiones": "No trucks found",
  "No encontramos repuestos": "No spare parts found",
  "Ajusta los filtros o contáctanos para buscar la unidad que necesitas.":
    "Adjust the filters or contact us to find the unit you need.",
  "Ajusta los filtros o contáctanos para encontrar el repuesto que necesitas.":
    "Adjust the filters or contact us to find the part you need.",
  "Ver detalle": "View details",
  "Anterior imagen": "Previous image",
  "Siguiente imagen": "Next image",

  /* ===========================
     Renta de Trucks
     =========================== */
  "Trucks listos para tu operación. Encuentra la unidad ideal para tu proyecto, ruta o flota.":
    "Trucks ready for your operation. Find the ideal unit for your project, route or fleet.",
  "Tipo de Camión": "Truck Type",
  "Tarifa: Menor a Mayor": "Rate: Low to High",
  "Tarifa: Mayor a Menor": "Rate: High to Low",
  "Paginación de camiones": "Truck pagination",
  "Reservar": "Reserve",
  "por día": "per day",
  "Cuéntanos qué tipo de truck necesitas y te ayudamos a encontrar la unidad ideal para tu operación.":
    "Tell us what kind of truck you need and we'll help you find the ideal unit for your operation.",

  /* ===========================
     Detalle del camión
     =========================== */
  "Detalle": "Details",
  "Detalle del camión": "Truck Details",
  "Cargando información de la unidad...": "Loading unit information...",
  "Camión no encontrado": "Truck not found",
  "La unidad que buscas no está disponible o el enlace es incorrecto.":
    "The unit you are looking for is unavailable or the link is incorrect.",
  "Volver al inventario": "Back to inventory",
  "Especificaciones": "Specifications",
  "Descripción": "Description",
  "Equipamiento": "Equipment",
  "Camiones similares": "Similar Trucks",
  "Otras unidades que pueden ajustarse a tu operación.":
    "Other units that may fit your operation.",
  "Unidad nueva": "New unit",
  "Unidad usada": "Used unit",
  "{type} · {condition} · Unidad #{stock}": "{type} · {condition} · Unit #{stock}",
  "nueva": "new",
  "usada": "used",
  "nuevo": "new",
  "usado": "used",
  "Sin imagen disponible": "No image available",
  "Clic en la foto para ampliar": "Click the photo to enlarge",
  "Ver imagen {n}: {desc}": "View image {n}: {desc}",
  "Precio de venta · Unidad #{stock}": "Sale price · Unit #{stock}",
  "Solicitar información": "Request information",
  "Financiamiento disponible sujeto a aprobación.":
    "Financing available subject to approval.",
  "Resumen de la unidad": "Unit Summary",
  "Agendar una visita": "Schedule a Visit",
  "Información general": "General Information",
  "Unidad": "Unit",
  "Condición": "Condition",
  "Modelo": "Model",
  "Categoría": "Category",
  "Categoría de carga": "Load Category",
  "Color exterior": "Exterior Color",
  "Kilometraje": "Mileage",
  "Motor": "Engine",
  "Motor y tren motriz": "Engine and Drivetrain",
  "Combustible": "Fuel",
  "Transmisión": "Transmission",
  "Potencia": "Power",
  "Cilindrada": "Displacement",
  "No aplica": "Not applicable",
  "Norma de emisiones": "Emissions Standard",
  "Cero emisiones": "Zero emissions",
  "Transmisión y ejes": "Transmission and Axles",
  "Ejes": "Axles",
  "Relación final": "Final Drive Ratio",
  "Quinta rueda": "Fifth Wheel",
  "No incluida": "Not included",
  "Incluida": "Included",
  "Dimensiones y capacidad": "Dimensions and Capacity",
  "Distancia entre ejes": "Wheelbase",
  "Capacidad de combustible": "Fuel Capacity",
  "Cabina y confort": "Cab and Comfort",
  "Tipo de cabina": "Cab Type",
  "Aire acondicionado": "Air conditioning",
  "Sí": "Yes",
  "Asientos": "Seats",
  "2 (con litera)": "2 (with sleeper berth)",
  "Entretenimiento": "Entertainment",
  "Esta unidad <strong>{name}</strong> {condition} se encuentra disponible en TruckFleet con <strong>{mileage}</strong> y un motor <strong>{engine}</strong>. Su configuración <strong>{type}</strong> la hace ideal para {use}.":
    "This <strong>{name}</strong> {condition} unit is available at TruckFleet with <strong>{mileage}</strong> and a <strong>{engine}</strong> engine. Its <strong>{type}</strong> configuration makes it ideal for {use}.",
  "distribución urbana y entregas de corta distancia":
    "urban distribution and short-haul deliveries",
  "transporte de larga distancia y rutas interestatales":
    "long-haul transportation and interstate routes",
  "transporte de carga pesada y operaciones de flota":
    "heavy-haul transportation and fleet operations",
  "logística y reparto de mercancía": "logistics and merchandise delivery",
  "transporte de carga": "freight transportation",
  "Todas nuestras unidades pasan por una revisión mecánica antes de la entrega y cuentan con documentación verificada. El precio publicado es de venta y no incluye impuestos ni trámites.":
    "All our units undergo a mechanical inspection before delivery and come with verified documentation. The published price is a sale price and does not include taxes or fees.",
  "Inspección mecánica incluida": "Mechanical inspection included",
  "Documentación verificada": "Verified documentation",
  "Financiamiento disponible": "Financing available",
  "Entrega a nivel nacional": "Nationwide delivery",
  "Frenos ABS": "ABS brakes",
  "Control de crucero": "Cruise control",
  "Espejos eléctricos": "Power mirrors",
  "Asiento del conductor neumático": "Air-ride driver seat",
  "Bloqueo de diferencial": "Differential lock",
  "Freno de motor": "Engine brake",
  "Luces LED": "LED lights",
  "Radio AM/FM con Bluetooth": "AM/FM radio with Bluetooth",
  "Cámara de reversa": "Backup camera",
  "Control de estabilidad": "Stability control",
  "Tanque de aluminio": "Aluminum tank",
  "Detroit ePowertrain (eléctrico)": "Detroit ePowertrain (electric)",
  "Motor diésel 12.8L": "12.8L diesel engine",
  "100 gal GNC": "100 gal CNG",
  "La unidad solicitada no está disponible en este momento.":
    "The requested unit is not available at this time.",
  "No encontrado": "Not found",
  "Camión no encontrado | TruckFleet": "Truck not found | TruckFleet",
  "{name} {condition} en venta. {mileage}, {transmission}, {fuel}. Unidad #{stock}.":
    "{name} {condition} for sale. {mileage}, {transmission}, {fuel}. Unit #{stock}.",

  /* ===========================
     Datos del catálogo
     =========================== */
  "Usado - Excelente": "Used - Excellent",
  "Diésel": "Diesel",
  "Eléctrico": "Electric",
  "Gas Natural": "Natural Gas",
  "Gasolina": "Gasoline",
  "Automático": "Automatic",
  "Blanco": "White",
  "Negro": "Black",
  "Azul": "Blue",
  "Rojo": "Red",
  "Amarillo": "Yellow",
  "Gris": "Gray",
  "Plata": "Silver",
  "Vista Frontal": "Front View",
  "Vista Lateral": "Side View",
  "Vista Trasera": "Rear View",
  "Cabina": "Cab",
  "Caja/Carga": "Box/Cargo",
  "Vista Frontal Catalogo": "Front View (Catalog)",
  "Vista Lateral Catalogo": "Side View (Catalog)",
  "Vista Frontal Real": "Front View (Real)",
  "Vista Trasera Real": "Rear View (Real)",

  /* ===========================
     Contacto
     =========================== */
  "Contáctanos": "Contact Us",
  "¿Tienes alguna pregunta sobre nuestros camiones? Estamos listos para ayudarte.":
    "Do you have a question about our trucks? We are ready to help.",
  "Información de Contacto": "Contact Information",
  "Completa el formulario o escríbenos directamente. Te responderemos en menos de 24 horas hábiles.":
    "Fill out the form or write to us directly. We will respond within 24 business hours.",
  "Ubicación": "Location",
  "New York, Estados Unidos": "New York, United States",
  "Teléfono": "Phone",
  "Correo Electrónico": "Email",
  "Horario de Atención": "Business Hours",
  "Lunes - Viernes: 8:00 AM - 6:00 PM": "Monday - Friday: 8:00 AM - 6:00 PM",
  "Sábados: 9:00 AM - 1:00 PM": "Saturdays: 9:00 AM - 1:00 PM",
  "Síguenos": "Follow Us",
  "Envíanos un Mensaje": "Send Us a Message",
  "Nombre Completo": "Full Name",
  "Ej. John Doe": "e.g. John Doe",
  "ejemplo@correo.com": "example@email.com",
  "Empresa": "Company",
  "Nombre de tu empresa": "Your company name",
  "Asunto": "Subject",
  "Selecciona un asunto": "Select a subject",
  "Información sobre camiones": "Truck information",
  "Consulta de inventario": "Inventory inquiry",
  "Solicitar cotización": "Request a quote",
  "Búsqueda específica": "Specific search",
  "Otro": "Other",
  "Mensaje": "Message",
  "Cuéntanos qué camión estás buscando, presupuesto o cualquier detalle que nos ayude a ayudarte...":
    "Tell us which truck you are looking for, your budget or any detail that helps us help you...",
  "Acepto la política de privacidad y autorizo a TruckFleet a contactarme.":
    "I accept the privacy policy and authorize TruckFleet to contact me.",
  "Enviar Mensaje": "Send Message",
  "* Campos obligatorios. Este es un formulario de demo (frontend únicamente).":
    "* Required fields. This is a demo form (frontend only).",
  "Nuestra Ubicación": "Our Location",
  "Visítanos en nuestras oficinas para hablar personalmente sobre tus necesidades.":
    "Visit our offices to talk in person about your needs.",

  /* ===========================
     Formulario, alertas y zoom (main.js)
     =========================== */
  "Por favor, completa todos los campos obligatorios.":
    "Please complete all required fields.",
  "Enviando...": "Sending...",
  "¡Gracias por tu mensaje! Nos pondremos en contacto contigo muy pronto.":
    "Thank you for your message! We will contact you very soon.",
  "Hola, me interesa el {truck}. ¿Podrían darme más información?":
    "Hello, I am interested in the {truck}. Could you give me more information?",
  "Hola, me interesa el repuesto {part}. ¿Podrían darme una cotización?":
    "Hello, I am interested in the spare part {part}. Could you send me a quote?",
  "Nombre, SKU, marca...": "Name, SKU, brand...",
  "Categoría": "Category",
  "Condición": "Condition",
  "Disponibilidad": "Availability",
  "Todos": "All",
  "Todas": "All",
  "Nuevo": "New",
  "OEM": "OEM",
  "Aftermarket": "Aftermarket",
  "Reacondicionado": "Refurbished",
  "En stock": "In stock",
  "Stock limitado": "Low stock",
  "Bajo pedido": "Special order",
  "Relevancia": "Relevance",
  "Nombre: A-Z": "Name: A-Z",
  "Disponibilidad: Mayor": "Availability: Highest",
  "Cotizar": "Request Quote",
  "Solicitar Búsqueda": "Request Search",
  "¿No Encuentras lo que Buscas?": "Can't Find What You're Looking For?",
  "Cuéntanos qué repuesto necesitas y te ayudamos a localizarlo.":
    "Tell us what part you need and we'll help you locate it.",
  "Ver Repuestos": "View Parts",
  "Compatible con": "Compatible with",
  "disponibles": "available",
  "12 meses": "12 months",
  "24 meses": "24 months",
  "6 meses": "6 months",
  "Frenos": "Brakes",
  "Filtros": "Filters",
  "Motor": "Engine",
  "Sistema Eléctrico": "Electrical System",
  "Suspensión": "Suspension",
  "Llantas": "Tires",
  "Lubricantes": "Lubricants",
  "Transmisión": "Transmission",
  "Kit de pastillas de freno Bendix": "Bendix Brake Pad Kit",
  "Discos de freno ventilados Bendix": "Bendix Vented Brake Discs",
  "Filtro de aceite Fleetguard LF9080": "Fleetguard LF9080 Oil Filter",
  "Filtro de aire Donaldson PowerCore": "Donaldson PowerCore Air Filter",
  "Turbo Garrett GT4088": "Garrett GT4088 Turbocharger",
  "Bomba de agua Cummins": "Cummins Water Pump",
  "Batería Odyssey Extreme 31": "Odyssey Extreme 31 Battery",
  "Alternador Delco Remy 160A": "Delco Remy 160A Alternator",
  "Amortiguador Sachs Heavy Duty": "Sachs Heavy Duty Shock Absorber",
  "Kit de bujes de suspensión Meritor": "Meritor Suspension Bushing Kit",
  "Llanta Michelin X Line Energy": "Michelin X Line Energy Tire",
  "Aceite sintético Shell Rotella T6 15W-40": "Shell Rotella T6 15W-40 Synthetic Oil",
  "Cerrar": "Close",
  "Imagen anterior": "Previous image",
  "Imagen siguiente": "Next image",
  "Haz clic en la imagen para acercar": "Click the image to zoom in",
  "Zoom x{scale} (máximo) · clic para volver a ajustar":
    "Zoom x{scale} (max) · click to reset",
  "Zoom x{scale} · arrastra para mover · clic para acercar más":
    "Zoom x{scale} · drag to pan · click to zoom in further",
};

/* ===================================
   Estado y utilidades
   =================================== */

let i18nLanguage = I18N_DEFAULT_LANGUAGE;
let i18nTextRecords = [];
let i18nAttrRecords = [];
let i18nInitialized = false;

/**
 * Normaliza un texto: colapsa espacios, saltos de línea y recorta extremos.
 * @param {string} value
 * @returns {string}
 */
function normalizeI18nText(value) {
  return String(value).replace(/\s+/g, " ").trim();
}

/**
 * Devuelve el idioma activo ("en" o "es").
 * @returns {string}
 */
function getLanguage() {
  return i18nLanguage;
}

/**
 * Traduce una clave en español al idioma activo.
 * Las claves son el propio texto en español; si no existe traducción se
 * devuelve la clave original (fallback seguro).
 *
 * @param {string} key - Texto en español (puede incluir {variables})
 * @param {Object} [vars] - Valores para reemplazar {variables}
 * @returns {string}
 */
function t(key, vars) {
  const source = String(key);
  const normalized = normalizeI18nText(source);
  let output = source;

  if (i18nLanguage === "en" && I18N_EN[normalized] !== undefined) {
    output = I18N_EN[normalized];
  }

  if (vars) {
    output = output.replace(/\{(\w+)\}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(vars, name)
        ? String(vars[name])
        : match
    );
  }

  return output;
}

/**
 * Traduce descripciones de imágenes del catálogo ("Marca - Vista Frontal").
 * Se traduce cada segmento por separado para conservar el nombre del camión.
 *
 * @param {string} desc
 * @returns {string}
 */
function localizeImageDesc(desc) {
  const source = String(desc);
  if (i18nLanguage !== "en") return source;

  return source
    .split(" - ")
    .map((part) => t(part.trim()))
    .join(" - ");
}

/* ===================================
   Captura de textos originales
   =================================== */

/**
 * Guarda una copia del texto/atributo original en español para poder
 * restaurarlo al volver a "es".
 */
function collectI18nOriginals() {
  i18nTextRecords = [];
  i18nAttrRecords = [];

  const skipTags = new Set([
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "TEXTAREA",
    "CODE",
    "PRE",
    "SVG",
  ]);

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue || !node.nodeValue.trim()) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node;
  while ((node = walker.nextNode())) {
    i18nTextRecords.push({ node, original: node.nodeValue });
  }

  // El <title> está en <head>, fuera de document.body.
  const title = document.querySelector("title");
  if (title && title.firstChild) {
    i18nTextRecords.push({
      node: title.firstChild,
      original: title.firstChild.nodeValue,
    });
  }

  const attributes = ["placeholder", "aria-label", "alt", "data-desc", "title"];
  const nodesWithAttributes = document.querySelectorAll(
    "[placeholder], [aria-label], [alt], [data-desc], [title]"
  );

  nodesWithAttributes.forEach((element) => {
    attributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const original = element.getAttribute(attribute);
      if (!original || !original.trim()) return;
      i18nAttrRecords.push({ element, attribute, original });
    });
  });

  // Descripción para buscadores de cada página.
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    const original = metaDescription.getAttribute("content") || "";
    if (original.trim()) {
      i18nAttrRecords.push({
        element: metaDescription,
        attribute: "content",
        original,
      });
    }
  }
}

/* ===================================
   Aplicación de traducciones
   =================================== */

function applyTextRecord(record) {
  const { node, original } = record;

  // Si el nodo fue reemplazado por un componente dinámico, no hay nada que hacer.
  if (!node.parentNode) return;

  if (i18nLanguage !== "en") {
    node.nodeValue = original;
    return;
  }

  const translated = I18N_EN[normalizeI18nText(original)];
  if (translated === undefined) {
    node.nodeValue = original;
    return;
  }

  const leading = (original.match(/^\s*/) || [""])[0];
  const trailing = (original.match(/\s*$/) || [""])[0];
  node.nodeValue = `${leading}${translated}${trailing}`;
}

function applyAttrRecord(record) {
  const { element, attribute, original } = record;

  if (i18nLanguage !== "en") {
    element.setAttribute(attribute, original);
    return;
  }

  const translated = I18N_EN[normalizeI18nText(original)];
  element.setAttribute(
    attribute,
    translated === undefined ? original : translated
  );
}

/**
 * Aplica el idioma activo a los textos estáticos y a las imágenes con texto.
 */
function applyStaticTranslations() {
  i18nTextRecords.forEach(applyTextRecord);
  i18nAttrRecords.forEach(applyAttrRecord);

  // Imágenes con texto incrustado (SVG de servicios): cada una declara sus
  // dos versiones mediante data-src-en / data-src-es.
  document.querySelectorAll("img[data-src-en]").forEach((image) => {
    const target =
      i18nLanguage === "en"
        ? image.getAttribute("data-src-en")
        : image.getAttribute("data-src-es");
    if (target && image.getAttribute("src") !== target) {
      image.setAttribute("src", target);
    }
  });

  document.documentElement.lang = i18nLanguage;

  const selectors = document.querySelectorAll(".language-select");
  selectors.forEach((select) => {
    select.value = i18nLanguage;
  });
}

/* ===================================
   Cambio de idioma
   =================================== */

/**
 * Cambia el idioma activo, persiste la preferencia y notifica a la página.
 * @param {"en"|"es"} language
 */
function setLanguage(language) {
  const next = I18N_SUPPORTED_LANGUAGES.includes(language)
    ? language
    : I18N_DEFAULT_LANGUAGE;

  if (next === i18nLanguage) {
    applyStaticTranslations();
    return;
  }

  i18nLanguage = next;

  try {
    localStorage.setItem(I18N_STORAGE_KEY, i18nLanguage);
  } catch (error) {
    // localStorage puede no estar disponible (modo privado, file://, etc.).
  }

  applyStaticTranslations();

  document.dispatchEvent(
    new CustomEvent("truckfleet:languagechange", {
      detail: { language: i18nLanguage },
    })
  );
}

/**
 * Enlaza los selectores de idioma del navbar.
 */
function bindLanguageSelectors() {
  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = i18nLanguage;
    select.addEventListener("change", () => {
      setLanguage(select.value);
    });
  });
}

/**
 * Lee la preferencia guardada (inglés por defecto).
 * @returns {string}
 */
function readStoredLanguage() {
  let stored = null;
  try {
    stored = localStorage.getItem(I18N_STORAGE_KEY);
  } catch (error) {
    stored = null;
  }
  return I18N_SUPPORTED_LANGUAGES.includes(stored)
    ? stored
    : I18N_DEFAULT_LANGUAGE;
}

/**
 * Inicialización al cargar el documento.
 */
function initI18n() {
  if (i18nInitialized) return;

  i18nLanguage = readStoredLanguage();
  collectI18nOriginals();
  bindLanguageSelectors();
  applyStaticTranslations();
  i18nInitialized = true;

  // Retira el bloqueo visual usado para evitar el parpadeo en español.
  document.documentElement.classList.remove("i18n-pending");
}

document.addEventListener("DOMContentLoaded", initI18n);

// API pública para el resto de scripts y para depuración.
window.truckFleetI18n = {
  t,
  getLanguage,
  setLanguage,
  localizeImageDesc,
};
