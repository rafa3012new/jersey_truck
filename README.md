# TruckFleet - Demo Web para Camiones

Demo de aplicación web full-stack para un sitio de camiones (venta, renta, inventario y flota). Desarrollado con **HTML5, CSS, JavaScript, Bootstrap 5** en el frontend y **Python, Flask y MySQL** como esqueleto base para el backend.

## 📌 Características

- **Frontend multipágina**: Home, Nosotros, Inventario, Renta de Trucks, Venta de Spare Parts, Detalle de camión y Contacto.
- **Bilingüe (ENG/SPA)**: Selector de idioma en la barra de navegación; inglés por defecto y preferencia persistente en `localStorage`. Traduce textos estáticos, contenido dinámico (inventario, renta de trucks, repuestos, detalle, paginación), metadatos y las imágenes con texto.
- **Diseño responsive**: Adaptado a desktop, tablet y móvil con Bootstrap 5.
- **Inspirado en referencias reales**: Basado en estilos de concesionarios de camiones profesionales.
- **Backend en esqueleto**: Estructura lista para ampliarse con rutas, modelos y conexión a MySQL.
- **Preparado para Git**: Incluye `.gitignore` optimizado para Python + Flask + Web.
- **Guía para agentes**: `AGENTS.md` con convenciones y pautas de trabajo.

## 🗂️ Estructura del Proyecto

```text
truckfleet-demo/
├── frontend/   # HTML5, CSS3, JS, Bootstrap 5 (funcional)
├── backend/    # Esqueleto Python + Flask + MySQL (listo para ampliar)
├── .gitignore
├── AGENTS.md
└── README.md
```

## 🚀 Cómo iniciar

### 1. Visualizar el Frontend (Recomendado)

Puedes abrirlo directamente en tu navegador o con un servidor local:

**Opción A: Abrir archivo directamente**

Abrir `index.html` con tu navegador favorito.

**Opción B: Servidor local (recomendado)**

```bash
# Desde la raíz del proyecto
python -m http.server 8000
```

Luego ve a: [http://localhost:8000/frontend/](http://localhost:8000/frontend/)

### 2. Preparar el Backend (Futuro)

> **Importante:** Por ahora el backend es únicamente un **esqueleto**. No contiene rutas ni lógica aún.

```bash
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar (Windows PowerShell)
.\venv\Scripts\activate

# 3. Instalar dependencias
pip install -r backend/requirements.txt

# 4. Copiar variables de entorno
cp backend/.env.example backend/.env

# 5. Editar backend/.env con tus credenciales de MySQL cuando lo implementes

# 6. Ejecutar Flask (modo desarrollo)
cd backend
flask run --debug
```

## 🛠️ Tecnologías utilizadas

| Parte | Tecnologías |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5.3 |
| **Backend** | Python 3, Flask, python-dotenv, PyMySQL, Flask-SQLAlchemy (preparado) |
| **Base de Datos** | MySQL (previsto) |
| **Otros** | Git, GitIgnore |

## 🎨 Paleta de Colores

| Color | Uso |
|---|---|
| `#0F7BFF` | Color principal (Botones, enlaces, acentos) |
| `#1F2937` | Header, Footer, textos importantes |
| `#F5F7FA` | Fondos suaves (secciones) |
| `#111111` | Textos principales |
| `#6B7280` | Textos secundarios |

## 🧩 Páginas disponibles

- **Inicio (`index.html`)**: Hero, ventajas, servicios destacados (venta, renta y spare parts) y llamada a acción.
- **Nosotros (`pages/about.html`)**: Misión, visión, valores y estadísticas.
- **Inventario (`pages/truck-sales.html`)**: Listado de camiones con paginación (2 páginas de 6), filtros (Estado: Nuevo, Usado y Usado - Excelente; Marca; Año; Tipo de Combustible: Diésel, Eléctrico, Gas Natural y Gasolina; Tipo de Trabajo: Heavy Duty, Medium Duty y Light Duty; y Transmisión: Automático y Manual) y orden por precio/año/kilometraje. Los filtros se aplican en vivo al seleccionar una opción. El filtro de Año genera automáticamente una opción por cada año presente en el catálogo (2021-2026) y filtra por coincidencia exacta. El enlace del menú se muestra como **Truck Sales** en inglés y **Venta de Camiones** en español.
- **Renta de Trucks (`pages/truck-rental.html`)**: Listado espejo de Truck Sales para renta, con paginación (8 unidades, 6 por página), filtros en vivo (Tipo de Camión: Day Cab, Sleeper y Semi Remolque; Marca; Año; Tipo de Combustible; Tipo de Trabajo; y Transmisión) y orden por tarifa/año/kilometraje. Cada tarjeta muestra año, kilometraje, combustible, transmisión, tipo de camión, color y tarifa diaria. El enlace de reserva abre Contacto con la unidad precargada (`contact.html?unit=<unidad>`). El enlace del menú se muestra como **Truck Rental** en inglés y **Renta de Trucks** en español.
- **Venta de Spare Parts (`pages/spare-parts.html`)**: Catálogo de repuestos con paginación (12 productos, 6 por página), filtros en vivo por Categoría, Marca, Condición, Disponibilidad y búsqueda, además de orden por relevancia/precio/nombre/disponibilidad. Cada tarjeta muestra categoría, marca, SKU, compatibilidad, stock, garantía, precio, badge de condición y CTA "Solicitar Cotización" que precarga el repuesto en Contacto (`contact.html?part=<repuesto>`). Las imágenes reutilizan el patrón de carrusel y zoom. El enlace del menú se muestra como **Spare Parts Sales** en inglés y **Venta de Spare Parts** en español.
- **Detalle de camión (`pages/truck-detail.html?id=<id>`)**: Galería con miniaturas ilimitadas, precio, resumen, especificaciones, descripción, equipamiento y camiones similares.
- **Contacto (`pages/contact.html`)**: Formulario de contacto, información y mapa. Si se llega desde una unidad o desde un repuesto, el mensaje se precarga con el interés solicitado.

## 🌐 Idiomas (ENG/SPA)

- El selector `.language-select` de la navbar permite alternar entre **ENG** (predeterminado) y **SPA**.
- La preferencia se guarda en `localStorage` con la clave `truckfleet-language` (`en` por defecto).
- `frontend/assets/js/i18n.js` se carga antes de `main.js`, `inventory.js`, `truck-rental.js`, `spare-parts.js` y `truck-detail.js`. Traduce textos estáticos y expone `t(clave, variables)` para el contenido generado por JavaScript.
- Los componentes dinámicos (inventario, renta de trucks, repuestos y detalle) vuelven a renderizarse con el evento `truckfleet:languagechange`.
- Las imágenes con texto incrustado tienen versión en español (`service-*.svg`) e inglés (`service-*-en.svg`); el `src` se intercambia automáticamente al cambiar de idioma.

## 📷 Assets

- `frontend/assets/img/placeholder-truck.svg` y `placeholder-truck-en.svg`: imagen temporal bilingüe de los camiones hasta añadir las reales.
- Renta de Trucks reutiliza las imágenes de camiones existentes en `frontend/assets/img/`.
- `frontend/assets/img/service-*.svg` y `service-*-en.svg`: pares bilingües de las imágenes de servicios del Home.

## 📝 Notas

- El proyecto está pensado para **crecer de forma incremental**. El backend está vacío intencionalmente para que puedas ir agregando rutas, modelos y conexión a BD cuando lo necesites.
- Este es un **demo/prototipo** con datos estáticos en el frontend.
- Las 3 referencias utilizadas para la inspiración fueron: [FloridaTrucks](https://www.floridatrucks.com/inventory/), [CommercialTruckTrader](https://www.commercialtrucktrader.com/New-York/trucks-for-sale?state=New%20York%7CNY) y [Bayshore Trucks](https://www.bayshoretrucks.com/--inventory?condition=new).

## 📄 Licencia

Proyecto demo con fines educativos/prácticos. Puedes modificarlo y usarlo libremente según tus necesidades.
