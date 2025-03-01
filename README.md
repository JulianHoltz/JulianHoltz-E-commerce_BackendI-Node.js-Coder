# IngJulianHolzschuh-E-commerce_BackendI-Node.js-CoderHouse

# API para eCommerce, venta de Acero para la construccion 🔩
Esta API está diseñada para gestionar un eCommerce de venta de acero para la construcción. Se desarrolla en Node.js con JavaScript y utiliza tecnologías como MongoDB, HTTP request y WebSocket.

🚀 Tecnologías Utilizadas
Node.js con Express.js
MongoDB Atlas para almacenamiento de datos
WebSocket para comunicación en tiempo real
Handlebars para la interfaz visual básica
Middleware JSON para manejo de datos

📂 Estructura del Proyecto
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
