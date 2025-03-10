# IngJulianHolzschuh-E-commerce\_BackendI-Node.js-CoderHouse

# API para eCommerce, venta de Acero para la construcción 🔩

Esta API está diseñada para gestionar un eCommerce de venta de acero para la construcción. Se desarrolla en Node.js con JavaScript y utiliza tecnologías como MongoDB, HTTP request y WebSocket.

🚀 Tecnologías Utilizadas
- Node.js con Express.js
- MongoDB Atlas para almacenamiento de datos
- WebSocket para comunicación en tiempo real
- Handlebars para la interfaz visual básica
- Middleware JSON para manejo de datos

📂 Estructura del Proyecto

```
/api-ecommerce
│── /models
│   ├── products.js   # Modelo de productos
│   ├── carts.js      # Modelo de carritos
│── /routes
│   ├── products.js   # Rutas CRUD para productos
│   ├── carts.js      # Rutas CRUD para carritos
│── /views
│   ├── layouts/      # Plantillas Handlebars
│── connect.js        # Conexión a MongoDB Atlas
│── app.js            # Configuración principal del servidor
│── package.json      # Dependencias y scripts
```

📌 **Funcionalidades Implementadas**

### 1️⃣ Gestión de Productos 🛒

- **CRUD de productos** (Crear, Leer, Actualizar, Eliminar)
- **Paginación de productos** con `limit` y `page`
- **Filtrado por categorías** (`rebars`, `beams`, `steelsheets`, `powertools`)
- **Ordenamiento por precio** (`asc` o `desc`)

### 2️⃣ Gestión de Carritos 🛍️

- **Crear carritos** de compras
- **Agregar y eliminar productos** en un carrito
- **Obtener el detalle de un carrito** con productos agregados

### 3️⃣ Comunicación en Tiempo Real 🌐

- **WebSocket** para actualización en tiempo real de la lista de productos

### 4️⃣ Interfaz con Handlebars 🖥️

- **Visualización de productos** en una interfaz básica
- **Detalle de producto individual**
- **Paginación y filtrado dinámico**

📌 **Diagrama de Flujo del Proyecto**

```mermaid
graph TD;
    A[Cliente] -->|Request| B[Servidor Express]
    B -->|Consulta| C[MongoDB Atlas]
    C -->|Respuesta| B
    B -->|WebSocket| D[Clientes Conectados]
    B -->|Render| E[Interfaz con Handlebars]
```

✉️ **Próximas mejoras**

- Implementar autenticación de usuarios con JWT `BACKEND II`


