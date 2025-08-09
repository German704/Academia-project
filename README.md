# E-commerce Platform API

Esta es la API de una plataforma de comercio electrónico. Proporciona una interfaz robusta y escalable para gestionar productos, categorías, usuarios y archivos, siguiendo los principios de la arquitectura limpia y la inyección de dependencias.

## 🚀 Características

* **Gestión de productos y categorías**: Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para productos y categorías.

* **Autenticación de usuarios**: Registro y autenticación mediante JWT (JSON Web Tokens).

* **Autorización basada en roles**: Middleware para proteger rutas y restringir el acceso a administradores.

* **Subida de archivos**: Middleware para manejar la subida de imágenes de productos y almacenar los metadatos en la base de datos.

* **Arquitectura modular**: El proyecto está organizado en módulos que separan las responsabilidades (servicios, controladores, entidades y casos de uso).

## 🛠️ Tecnologías

* **Node.js**

* **Express.js**: Framework para el servidor web.

* **TypeScript**: Lenguaje de programación.

* **TypeORM**: ORM para interactuar con la base de datos.

* **SQLite**: Base de datos relacional sin servidor.

* **Multer**: Middleware para manejar `multipart/form-data` (subida de archivos).

* **jsonwebtoken**: Para la autenticación con JWT.

## 💻 Requisitos

Asegúrate de tener instalado lo siguiente en tu entorno de desarrollo:

* [**Node.js**](https://nodejs.org/) (versión 18 o superior)

* [**Yarn**](https://yarnpkg.com/)

## 🚀 Instalación y uso

Sigue estos pasos para poner a funcionar la aplicación en tu entorno local.

### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio



### 2. Instalar dependencias

yarn install

### 3. Inicializar la base de datos

SQLite es una base de datos basada en archivos, por lo que no necesita un servidor. La base de datos se creará automáticamente en la raíz del proyecto.

### 4. Iniciar la aplicación
yarn dev

La aplicación se ejecutará en `http://localhost:3000`.

## 🗺️ Endpoints de la API

Aquí hay una lista de los endpoints principales de la API.

### **Autenticación y Usuarios**

* `POST /api/users`: Registra un nuevo usuario.

* `POST /api/auth/login`: Inicia sesión y devuelve un token JWT.

### **Productos**

* `POST /api/products/create`: **(Admin)** Crea un nuevo producto.

* `GET /api/products`: Obtiene todos los productos.

* `GET /api/products/:id`: Obtiene un producto por su ID.

* `PUT /api/products/update/:id`: **(Admin)** Actualiza un producto existente.

* `DELETE /api/products/delete/:id`: **(Admin)** Elimina un producto.

* `POST /api/upload/:id`: **(Admin)** Sube una imagen para un producto.

### **Categorías**

* `POST /api/categories/create`: **(Admin)** Crea una nueva categoría.

* `GET /api/categories`: Obtiene todas las categorías.

* `GET /api/categories/:id`: Obtiene una categoría por su ID.

* `PUT /api/categories/update/:id`: **(Admin)** Actualiza una categoría.

* `DELETE /api/categories/delete/:id`: **(Admin)** Elimina una categoría.
