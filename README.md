# ☕ Proyecto de Gestión de Productos de Café 
https://img.shields.io/badge/Bulma-00D1B2?style=for-the-badge&logo=bulma&logoColor=white https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black https://img.shields.io/badge/MockAPI-FF6B6B?style=for-the-badge&logo=json&logoColor=white https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white

<img width="1895" height="887" alt="Captura de pantalla 2025-09-24 084420" src="https://github.com/user-attachments/assets/9fc40e03-d211-4643-a6d3-e4974fe9a393" />

## 📖 Descripción Sistema web elegante para gestionar productos de café, desarrollado con Bulma CSS y JavaScript vanilla. La aplicación permite visualizar, crear, filtrar y buscar productos de café conectados a una API RESTful mockeada.

## ✨ Características Principales 🎨 Interfaz de Usuario Diseño responsive con Bulma CSS

Modo claro con interfaz elegante y moderna

Tarjetas interactivas para mostrar productos

Modal para agregar/editar productos

Sistema de notificaciones integrado

## ⚙️ Funcionalidades CRUD CREATE: 
Agregar nuevos productos de café

READ: Visualizar todos los productos

Filtrado avanzado por múltiples criterios

Búsqueda en tiempo real

## 🔍 Sistema de Filtrado Búsqueda por nombre en tiempo real

Filtrado por tipo de café (Arábicos, Robustos, Mezclas)

Filtrado por tueste (Blonde, Medium, Dark)

Botón para limpiar todos los filtros

## 🚀 Demo Puedes probar la aplicación aquí o clonando el repositorio y abriendo el archivo index.html en tu navegador.

## 🛠️ Tecnologías Utilizadas HTML5 - Estructura semántica del proyecto

Bulma CSS 1.0.4 - Framework CSS para el diseño

JavaScript ES6+ - Funcionalidad y lógica de la aplicación

Font Awesome 6.4.0 - Iconografía y elementos visuales

MockAPI.io - API mock para persistencia de datos

## 🎯 Uso Visualización de Productos La página principal muestra todos los productos de café en tarjetas organizadas con:

Imagen del producto

Nombre y precio

Tipo de café y tueste

Diseño responsive

Agregar Nuevos Productos Haz clic en el botón "Agregar"

Completa el formulario en el modal:

Nombre del café

URL de la imagen (opcional)

Precio

Tipo de café (Arábicos, Robustos, Mezclas)

Tipo de tueste (Blonde, Medium, Dark)

Haz clic en "Crear Producto"

Filtrar Productos Buscar por nombre: Escribe en el campo de búsqueda

Filtrar por tipo: Selecciona un tipo de café

Filtrar por tueste: Selecciona un tipo de tueste

Limpiar filtros: Haz clic en el botón "Limpiar filtros"

🔌 API Integration Endpoints Utilizados javascript const API_URL = 'https://68b6233fe5dc090291b0f238.mockapi.io/articulos'; Método Endpoint Descripción GET /articulos Obtener todos los productos POST /articulos Crear nuevo producto PUT /articulos/:id Actualizar producto DELETE /articulos/:id Eliminar producto Estructura de Datos json { "id": "1", "name": "Café Colombiano Premium", "price": 12.99, "type": "Arábicos", "roast": "Medium", "category": "Coffee", "avatar": "https://..." } 🎨 Personalización Modificar Estilos El proyecto usa exclusivamente clases de Bulma. Para personalizar:

Colores: Modifica las variables CSS de Bulma

Layout: Usa las clases de spacing de Bulma

Componentes: Utiliza los componentes de Bulma existentes

Agregar Nuevos Campos Para agregar nuevos campos a los productos:

Añade el campo en el formulario del modal

Actualiza la función handleSave

Modifica la renderización de las tarjetas

📱 Responsive Design La aplicación está diseñada para funcionar en:

📱 Móviles (320px+)

📟 Tablets (768px+)

💻 Desktop (1024px+)

🖥️ Large Screens (1440px+)

## 🤝 Agradecimientos Bulma CSS por el excelente framework de CSS

MockAPI por el servicio de API mocking

Font Awesome por los iconos

📞 Contacto Si tienes preguntas o sugerencias, no dudes en contactarme:

GitHub: https://github.com/RadhaBerjman

Email: radhaberjman@gmail.com
