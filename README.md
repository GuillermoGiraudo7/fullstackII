# 🏰 Login System - Angular + Django
---

## 🚀 Funcionalidades

- ✔ Registro de usuarios  
- ✔ Login con JWT  
- ✔ Recordarme (localStorage / sessionStorage)  
- ✔ Protección de rutas (AuthGuard)  
- ✔ Recuperación de contraseña con OTP  
- ✔ Reset de contraseña  
- ✔ UI global 

---

## 🧱 Tecnologías utilizadas

### 🔙 Backend
- Python 3
- Django
- Django REST Framework
- SimpleJWT

### 🎨 Frontend
- Angular 17+
- TypeScript
- Reactive Forms

---

## ⚙️ Instalación del Backend (Django)

### 1. Crear entorno virtual

```bash
python -m venv .venv
.venv\Scripts\activate      
```

### 2. Instalar dependencias

```bash
pip install django djangorestframework djangorestframework-simplejwt
```

### 3. Aplicar migraciones

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Ejecutar servidor

```bash
python manage.py runserver
```

📍 Backend disponible en:  
http://127.0.0.1:8000/

---

## ⚙️ Instalación del Frontend (Angular)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar Angular

```bash
ng serve
```

📍 Frontend disponible en:  
http://localhost:4200/

---

## 🔐 Autenticación

### Login

**Endpoint:**
```
POST /api/login/
```

**Body:**
```json
{
  "username": "guille",
  "password": "123456"
}
```

---

## 🔁 Recuperación de contraseña (OTP)

### 1. Solicitar OTP

```
POST /api/request-otp/
```

**Body:**
```json
{
  "username": "guille"
}
```

⚠️ **IMPORTANTE:**  
El OTP se muestra en la **consola del servidor Django**.

Ejemplo:
```
OTP: 483921
```

---

### 2. Resetear contraseña

```
POST /api/reset-password/
```

**Body:**
```json
{
  "username": "guille",
  "otp_code": "123456",
  "new_password": "nueva_password"
}
```

---

## 🔒 Protección de rutas

El sistema utiliza un **AuthGuard** que verifica:

```ts
localStorage.getItem('access_token') ||
sessionStorage.getItem('access_token')
```

Si no existe token → redirige al login.

---

## 💾 Recordarme

- ✔ Activado → guarda token en `localStorage`  
- ✔ Desactivado → guarda token en `sessionStorage`  

---

## 📁 Estructura del proyecto

```
frontend/
 ├── src/
 │   ├── app/
 │   │   ├── login/
 │   │   ├── home/
 │   │   ├── reset-password/
 │   │   ├── guards/
 │   │   ├── app.routes.ts
 │   │
 │   ├── styles.css

backend/
 ├── api/
 ├── models.py
 ├── views.py
 ├── serializers.py
 ├── urls.py
```

---

## 🧪 Cómo probar el sistema

### Flujo completo:

1. Ingresar con usuario existente  
2. Click en "Olvidé mi contraseña"  
3. Ingresar username  
4. Generar OTP  
5. Ver OTP en consola Django  
6. Ingresar OTP + nueva contraseña  
7. Volver al login  
8. Iniciar sesión con la nueva contraseña  

---
