# Aplicación Móvil - Práctica Evaluada

Esta es una aplicación móvil desarrollada con React Native Expo y Firebase que implementa registro de usuarios, inicio de sesión y edición de información del usuario.

## Características

- **Splash Screen**: Pantalla de carga al iniciar la aplicación
- **Registro de Usuarios**: Registro con autenticación por correo electrónico
- **Inicio de Sesión**: Login con Firebase Authentication
- **Home Screen**: Pantalla principal con información del usuario
- **Edición de Perfil**: Modificación de información del usuario

## Información del Usuario

La aplicación guarda la siguiente información de cada usuario:
- Nombre
- Correo electrónico
- Contraseña
- Edad
- Especialidad

## Configuración de Firebase

**📋 IMPORTANTE**: Antes de ejecutar la aplicación, debes configurar Firebase. Sigue la guía detallada en [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

### Resumen rápido:

1. **Crear proyecto en Firebase Console**
2. **Habilitar Authentication** (Email/Password)
3. **Configurar Firestore Database** (modo de prueba)
4. **Obtener configuración** del proyecto
5. **Actualizar** `src/config/firebase.js` con tus datos reales

### Configuración mínima requerida:

```javascript
// En src/config/firebase.js
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com", 
  projectId: "tu-proyecto-id-real",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id-real"
};
```

### Reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar la aplicación

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
```

## Estructura del Proyecto

```
src/
├── components/
│   └── AppNavigator.js      # Navegación principal
├── config/
│   └── firebase.js          # Configuración de Firebase
├── context/
│   └── AuthContext.js       # Contexto de autenticación
└── screens/
    ├── SplashScreen.js      # Pantalla de carga
    ├── LoginScreen.js       # Pantalla de login
    ├── RegisterScreen.js    # Pantalla de registro
    ├── HomeScreen.js        # Pantalla principal
    └── EditProfileScreen.js # Pantalla de edición
```

## Tecnologías Utilizadas

- **React Native**: Framework para desarrollo móvil
- **Expo**: Plataforma para desarrollo React Native
- **Firebase**: Backend como servicio (Authentication + Firestore)
- **React Navigation**: Navegación entre pantallas
- **React Context**: Manejo de estado global

## Funcionalidades Implementadas

### Autenticación
- Registro de usuarios con validación
- Inicio de sesión seguro
- Cierre de sesión
- Persistencia de sesión

### Gestión de Datos
- Almacenamiento en Firestore
- Actualización de información del usuario
- Validación de formularios

### Interfaz de Usuario
- Diseño moderno y responsivo
- Navegación fluida entre pantallas
- Mensajes de error y éxito
- Pantalla de carga

## Notas Importantes

- Asegúrate de configurar correctamente Firebase antes de ejecutar la aplicación
- La aplicación requiere conexión a internet para funcionar
- Los datos se almacenan de forma segura en Firebase
- La autenticación está protegida con las mejores prácticas de seguridad

## Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request

## Licencia

Este proyecto es parte de una práctica evaluada académica.
