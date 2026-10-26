# AGENTS.md - Guía para Agentes de IA

Este documento define las convenciones, estructura y lineamientos para trabajar en el proyecto **TruckFleet Demo**.

## 1. Objetivo del Proyecto

`TruckFleet` es una demostración de sitio web para camiones (Trucks). El objetivo es tener:

- **Frontend funcional** (HTML5, CSS3, JavaScript y Bootstrap 5). Por ahora solo este debe funcionar.
- **Backend base (esqueleto)** con Python, Flask y MySQL, preparado para ir ampliando poco a poco sin romper la estructura.

## 2. Estructura del Proyecto

```text
truckfleet-demo/
├── frontend/        # Código del front-end (cliente)
│   ├── assets/      # Recursos estáticos
│   │   ├── css/     # Hojas de estilo
│   │   ├── js/      # Lógica JavaScript
│   │   ├── img/     # Imágenes
│   │   └── fonts/   # Fuentes
│   ├── pages/       # Páginas adicionales (multipágina)
│   └── index.html   # Página principal
├── backend/         # Esqueleto backend (Python + Flask + MySQL)
│   ├── app.py       # Punto de entrada de Flask
│   ├── config.py    # Configuraciones (.env)
│   ├── requirements.txt
│   ├── .env.example # Plantilla de variables de entorno
│   ├── routes/      # Blueprints/Rutas (vacío, listo para añadir)
│   ├── models/      # Modelos SQLAlchemy (vacío, listo para añadir)
│   ├── utils/       # Utilidades/helpers (vacío, listo para añadir)
│   └── database/    # Conexión DB (vacío, listo para añadir)
├── .gitignore
├── AGENTS.md
└── README.md
```

## 3. Convenciones de Código

### Frontend

- **HTML5**: Usar etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- **CSS**: Estilos personalizados en `assets/css/styles.css`. Mantener variables CSS (`:root`) para colores, espaciados y tipografías.
- **Bootstrap 5**: Usado vía CDN (no instalado con npm por ahora). Priorizar clases utilitarias y respetar el tema personalizado.
- **JavaScript**: Vanilla JS (`assets/js/main.js`). Código modular, legible y comentado cuando sea necesario.
- **Nomenclatura**: Clases en inglés o español coherentes. Usar kebab-case para clases CSS.
- **Imágenes**: Usar placeholders si no existen (`assets/img/placeholder-truck.svg` y `placeholder-truck-en.svg` según el idioma).
- **Internacionalización (i18n)**: El español es el idioma fuente del HTML. `assets/js/i18n.js` aplica la traducción al inglés (idioma predeterminado), guarda la preferencia en `localStorage` (`truckfleet-language`) y expone `t(clave, variables)` para las cadenas generadas por JavaScript. Cargar siempre `i18n.js` **antes** de `main.js`, `inventory.js` y `truck-detail.js`. Al añadir textos, incluir la clave en el diccionario `I18N_EN`; los componentes dinámicos deben volver a renderizarse al recibir el evento `truckfleet:languagechange`.
- **Imágenes con texto incrustado**: Mantener pares de archivos `<nombre>.svg` (español) y `<nombre>-en.svg` (inglés). Los `<img>` declaran ambas versiones con `data-src-en` y `data-src-es`; `i18n.js` intercambia el `src`.

### Backend

- **Idioma**: Comentarios y nombres preferentemente en español para mantener coherencia con el frontend.
- **Framework**: Flask (mínimo, sin sobreingeniería).
- **Estructura**: Preparada para usar **Blueprints** (`routes/`) y **SQLAlchemy** (`models/`) cuando se implemente.
- **Configuración**: Toda configuración sensible debe leerse desde `.env` (nunca commitear credenciales). Usar `.env.example` como plantilla.
- **MySQL**: Conexión pensada para `PyMySQL` (URI tipo `mysql+pymysql://...`).
- **Principio**: **No implementar lógica de negocio aún**. Solo mantener el esqueleto funcional y bien organizado para futuras ampliaciones.

## 4. Cómo Ejecutar el Proyecto

### Frontend (único funcional por ahora)

Abrir directamente en el navegador:

```bash
# Ruta relativa
index.html
```

O con un servidor local ligero (recomendado para evitar problemas con rutas relativas):

```bash
# Con Python
python -m http.server 8000
# Luego abrir http://localhost:8000/frontend/
```

```bash
# Con Node (npx)
npx serve frontend
```

### Backend (esqueleto, aún no funcional con lógica)

1. Crear y activar entorno virtual:

```bash
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

2. Instalar dependencias:

```bash
pip install -r backend/requirements.txt
```

3. Copiar variables de entorno:

```bash
cp backend/.env.example backend/.env
```

4. Configurar `.env` con credenciales de MySQL (cuando se vaya a conectar).

5. Ejecutar servidor Flask (modo desarrollo):

```bash
cd backend
flask run --debug
```

> **Nota:** Por ahora `app.py` no tiene rutas activas. Está pensado para añadir Blueprints desde `routes/` progresivamente.

## 5. Pautas para Agentes de IA

- **Respetar la estructura**: No reorganices carpetas sin justificación. Mantén separación clara entre `frontend/` y `backend/`.
- **No borrar el esqueleto backend**: Las carpetas `routes/`, `models/`, `utils/`, `database/` deben permanecer aunque estén vacías (con su `__init__.py`).
- **Cambios coherentes**: Cualquier modificación debe seguir el estilo, naming y patrones ya existentes.
- **Investigar antes de sobrescribir**: Trata archivos no familiares como trabajo del usuario. No elimines código existente sin confirmar.
- **Frontend primero, backend incremental**: Mantén el frontend operativo en todo momento. Añadir backend solo de forma incremental y no invasiva.
- **No commitear secretos**: Asegúrate de que `.env` nunca se incluya en commits (está en `.gitignore`).
- **Documentar al ampliar**: Al agregar rutas/modelos, añade comentarios breves para facilitar el crecimiento ordenado del proyecto.
- **Inspiración controlada**: Al tomar referencias de las 3 URLs proporcionadas, extraer solo estructura/layout/estilo, no copiar contenido o código literal de terceros.

## 6. Alcance Actual

- **Frontend**: Completo y visualizable (Home, Nosotros, Inventario, Renta de Trucks, Venta de Spare Parts, Detalle de camión, Contacto). Sin lógica de backend conectada (uso de datos estáticos como demostración).
- **Home (servicios)**: La sección destacada de `index.html` muestra tres tarjetas de servicios (Venta de Trucks, Renta de Trucks y Venta de Spare Parts) con carrusel y zoom de imágenes. Las imágenes placeholder están en `frontend/assets/img/service-*.svg` (español) y `service-*-en.svg` (inglés); se pueden reemplazar conservando los nombres de archivo y el par bilingüe.
- **Inventario**: El listado se renderiza desde `frontend/assets/js/inventory.js` (catálogo estático + paginación + filtros + orden). Los filtros son Estado (`new`, `used`, `used-excellent`), Marca, Año, **Tipo de Combustible**, **Tipo de Trabajo** (`duty`: `heavy`, `medium`, `light`) y **Transmisión** (`transmissionType`: `automatic`, `manual`); se aplican en vivo al cambiar cada `select` (sin exigir el botón "Aplicar Filtros"). El filtro de Año se genera dinámicamente con todos los años presentes en `INVENTORY_TRUCKS` y filtra por coincidencia exacta. Cada camión declara valores canónicos independientes del idioma (`fuelType`, `duty`, `transmissionType`) para filtrar, mientras `fuel`, `dutyName` y `transmission` conservan el texto mostrado. Los controles de paginación se generan dinámicamente según el total de resultados. Cada tarjeta muestra año, kilometraje, combustible, transmisión, tipo de cabina, **color** y **categoría de carga** (`dutyName`: Light / Medium / Heavy Duty), además del enlace **"Ver detalle"** junto al nombre del camión. El enlace del menú se muestra como **Truck Sales** en inglés y **Venta de Camiones** en español.
- **Renta de Trucks**: `frontend/pages/truck-rental.html` + `frontend/assets/js/truck-rental.js`. Es un espejo del listado de Truck Sales adaptado a renta: catálogo estático de 8 trucks (6 por página), filtros en vivo por Tipo de Camión (`type`: `daycab`, `sleeper`, `semi`), Marca, Año, Tipo de Combustible, Tipo de Trabajo (`duty`: `heavy`, `medium`, `light`) y Transmisión, además de orden por tarifa/año/kilometraje. Los filtros de Marca y Año se generan dinámicamente desde `TRUCK_RENTAL_FLEET`. Cada tarjeta muestra año, kilometraje, combustible, transmisión, tipo de camión, color, categoría de trabajo y tarifa diaria; los enlaces de reserva llevan a `contact.html?unit=<unidad>` para precargar el truck de interés. Por ahora es solo un listado, sin página de detalle propia. El enlace del menú se muestra como **Truck Rental** en inglés y **Renta de Trucks** en español.
- **Detalle del camión**: `frontend/pages/truck-detail.html` + `frontend/assets/js/truck-detail.js`. Se abre con `truck-detail.html?id=<id>` (ids del catálogo `INVENTORY_TRUCKS`). Muestra galería principal, miniaturas ilimitadas (se adaptan a 1, 3, 10 o 30 imágenes), precio, resumen, especificaciones, descripción, equipamiento y camiones similares. Si el `id` no existe, muestra el estado "Camión no encontrado".
- **Galería de detalle**: Reutiliza el carrusel y el zoom existentes (`main.js`). Las miniaturas se sincronizan con el carrusel mediante los eventos `truck-carousel:go` (miniatura → carrusel) y `truck-carousel:change` (carrusel → miniaturas). Las miniaturas usan un grid responsive con scroll interno cuando hay muchas imágenes.
- **Venta de Spare Parts**: `frontend/pages/spare-parts.html` + `frontend/assets/js/spare-parts.js`. Catálogo estático de 12 repuestos (6 por página), filtros en vivo por Categoría, Marca, Condición, Disponibilidad y búsqueda, orden por relevancia/precio/nombre/disponibilidad. Cada tarjeta muestra categoría, marca, SKU, compatibilidad, stock, garantía, precio, badge de condición y CTAs "Cotizar"/"Solicitar Cotización" que llevan a `contact.html?part=<repuesto>` para precargar el repuesto de interés. Usa el mismo patrón de carrusel/zoom con una imagen por tarjeta. El enlace del menú se muestra como **Spare Parts Sales** en inglés y **Venta de Spare Parts** en español.
- **Contacto**: Si se llega desde el detalle con `contact.html?truck=<unidad>`, desde Renta de Trucks con `contact.html?unit=<unidad>` o desde Spare Parts con `contact.html?part=<repuesto>`, el mensaje del formulario se precarga con el interés solicitado (`prefillContactForm()` en `main.js`). Al cambiar de idioma, la precarga se reescribe si el usuario no la ha editado.
- **Idiomas (ENG/SPA)**: Todas las páginas incluyen un selector en la barra de navegación. El inglés es el idioma predeterminado y la preferencia se guarda en `localStorage`. `i18n.js` traduce textos estáticos, dinámicos, metadatos, `alt`, `aria-label`, `placeholder`, `data-desc` y las imágenes con texto. Los scripts `inventory.js`, `truck-rental.js`, `spare-parts.js` y `truck-detail.js` vuelven a renderizar su contenido con el evento `truckfleet:languagechange`.
- **Zoom de imágenes**: Al hacer clic en la imagen de una tarjeta (o en la imagen principal del detalle) se abre el modal de zoom (`frontend/assets/js/main.js`) que funciona como carrusel: flechas `<` (izquierda) y `>` (derecha) en blanco y sin fondo, teclado (`←` / `→`), `Esc` para cerrar y contador de posición (`1 / N`).
- **Zoom profundo**: Sobre la imagen del modal se puede acercar más la zona concreta que se está mirando. El cursor cambia a `zoom-in` / `grab` / `grabbing`; cada clic avanza un nivel de zoom (x1 → x2.5 → x6 → x1) anclado en el punto pulsado y arrastrando se desplaza la imagen ampliada.
- **Backend**: Solo **esqueleto base**. Listo para expansión futura (Flask + MySQL). No requiere conexión a BD para ejecutar el demo frontend.

## 7. Tecnologías

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla), Bootstrap 5.3
- **Backend**: Python 3.x, Flask, python-dotenv, PyMySQL (preparado para Flask-SQLAlchemy)
- **Base de datos objetivo**: MySQL 8+

## 8. Notas

- Este es un **demo/prototipo educativo** para mostrar estructura full-stack ordenada.
- El diseño está inspirado en concesionarios/trade de camiones (FloridaTrucks, CommercialTruckTrader, Bayshore Trucks), adaptado a un enfoque limpio y profesional bilingüe (inglés/español).
- El idioma fuente del HTML es el español; la interfaz arranca en inglés por defecto. Al añadir una página nueva, incluir el script de arranque de idioma en el `<head>`, el selector `.language-select` en la navbar y cargar `i18n.js` antes del resto de scripts.
