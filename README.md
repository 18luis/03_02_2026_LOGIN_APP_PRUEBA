# Proyecto Fullstack: Autenticación con NestJS y React

Este proyecto es una **aplicación fullstack** que implementa un **sistema básico de autenticación (login y signup)** usando:

* **Backend:** NestJS + MongoDB
* **Frontend:** React

Está pensado como base para proyectos más grandes (microservicios, roles, seguridad, etc.).

---

## 📁 Estructura del proyecto

```text
root/
├── backend/        # API en NestJS
└── frontend/       # Aplicación React
```

---

## 🚀 Backend (NestJS)

### 📌 Tecnologías usadas

* NestJS
* MongoDB
* Mongoose
* bcrypt

---

### ▶️ Instalar dependencias

```bash
npm i
```

### ▶️ Ejecutar el backend

```bash
npm run start:dev
```

El backend quedará disponible en:

```
http://localhost:4000
```

---

## 🎨 Frontend (React)

### 📌 Tecnologías usadas

* React
* Axios

---

### ▶️ Instalar dependencias

```bash
npm i
```

### ▶️ Ejecutar el frontend

```bash
npm start
```

La aplicación estará disponible en:

```
http://localhost:3000
```

---

🐳 MongoDB con Docker (Desarrollo local)

Este proyecto incluye un archivo docker-compose.yml para levantar MongoDB fácilmente usando Docker, sin necesidad de instalar MongoDB directamente en tu sistema.

▶️ Levantar MongoDB con Docker

Desde la raíz del proyecto (donde está el docker-compose.yml):

```bash
docker compose up -d
```

Verificar que el contenedor esté corriendo:

```bash
docker ps
```

🧹 Detener y limpiar contenedores

Detener MongoDB:

```bash
docker compose down
```

Eliminar contenedor y datos:

```bash
docker compose down -v
```

⚠️ Esto borrará completamente la base de datos.

---

## 🧠 Notas importantes

* El frontend se comunica con el backend mediante **Axios**
* MongoDB debe estar corriendo antes de iniciar el backend
* El sistema guarda ubicación del usuario al iniciar sesión
