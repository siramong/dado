# 🎲 Dado - Dice Rolling App

Una aplicación moderna de React Native con Expo que simula el lanzamiento de un dado usando React Three Fiber. El dado se puede lanzar tocando un botón o sacudiendo el teléfono usando el acelerómetro.

## ✨ Características

- **Dado 3D interactivo** usando React Three Fiber
- **Detección de sacudida** mediante acelerómetro
- **Animaciones fluidas** con física realista
- **Diseño moderno** con degradados y efectos visuales llamativos
- **Feedback háptico** para mejor experiencia de usuario
- **Responsive** y optimizado para dispositivos móviles

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Expo CLI
- Dispositivo móvil con Expo Go o emulador Android/iOS

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start

# Para Android
npm run android

# Para iOS
npm run ios
```

## 📱 Uso

1. **Lanzar dado con botón**: Toca el botón "🎯 Lanzar Dado" en la parte inferior
2. **Lanzar dado sacudiendo**: Agita tu teléfono para lanzar el dado automáticamente
3. **Ver resultado**: El valor del dado se mostrará después de la animación

## 🏗️ Estructura del Proyecto

```
dado/
├── app/                    # Pantallas de la aplicación
│   ├── index.tsx          # Pantalla principal
│   └── _layout.tsx        # Layout de navegación
├── components/            # Componentes reutilizables
│   └── DiceScene.tsx     # Componente del dado 3D
├── hooks/                # Hooks personalizados
│   └── useShakeDetection.ts  # Hook para detectar sacudidas
├── models/               # Modelos 3D (si se agregan)
└── utils/                # Funciones auxiliares
```

## 🛠️ Tecnologías

- **React Native** - Framework móvil
- **Expo** - Plataforma de desarrollo
- **React Three Fiber** - Renderizado 3D
- **Three.js** - Biblioteca 3D
- **Expo Sensors** - Acelerómetro y giroscopio
- **Expo Haptics** - Feedback háptico
- **Expo Linear Gradient** - Degradados modernos

## 🎨 Diseño

La aplicación utiliza un diseño moderno con:
- Fondo degradado oscuro (modo oscuro por defecto)
- Colores vibrantes para el dado (#667eea, #764ba2, etc.)
- Animaciones suaves y transiciones
- Tipografía bold y clara
- Efectos de sombra y profundidad

## 📝 Linting y Formato

```bash
# Ejecutar linter
npm run lint
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue el formato de commits:

```
EMOJI_AQUI tipo(archivo): Descripción
```

Ejemplos:
- `✨ feat(app): Nueva característica`
- `🐛 fix(components): Corrección de bug`
- `🎨 style(app): Mejoras de diseño`
- `📝 docs(README): Actualización de documentación`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Desarrollo

Editado para uso en IDX el 07/09/12

Para más información sobre desarrollo con Expo:
- [Documentación de Expo](https://docs.expo.dev/)
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)

