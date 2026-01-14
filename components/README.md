# Estructura de Componentes - Diseño Atómico

Este proyecto utiliza **Atomic Design** para organizar los componentes UI de manera escalable y mantenible.

## 📁 Estructura

```
components/
├── atoms/           # Componentes básicos e indivisibles
├── molecules/       # Combinaciones simples de átomos
├── organisms/       # Componentes complejos de UI
└── templates/       # Layouts de página
```

## 🔬 Átomos (Atoms)

Componentes UI más básicos. No se pueden dividir sin perder su función.

- **Button**: Botón con gradiente y estados
- **DecorativeCircle**: Círculo decorativo de fondo
- **GradientBackground**: Fondo con degradado
- **Heading**: Títulos con diferentes niveles (h1, h2, h3)

## 🧬 Moléculas (Molecules)

Grupos de átomos que funcionan juntos como una unidad.

- **Header**: Encabezado con emoji, título y subtítulo
- **ResultDisplay**: Tarjeta que muestra el resultado del dado
- **ShakeIndicator**: Indicador animado de sacudir dispositivo
- **DiceContainer**: Contenedor del dado 3D con efecto glassmorphism

## 🦠 Organismos (Organisms)

Secciones complejas de la interfaz compuestas de moléculas y/o átomos.

- **Background**: Composición del fondo (gradiente + círculos decorativos)
- **DiceGameContent**: Contenido completo del juego (header, dado, resultado, botón, indicador)

## 📄 Templates

Estructura de la página que define el layout general.

- **DiceGameTemplate**: Template principal con StatusBar y Background

## 🎯 Beneficios

1. **Reutilización**: Los componentes son modulares y reutilizables
2. **Mantenibilidad**: Fácil ubicar y modificar componentes
3. **Escalabilidad**: Agregar nuevas características es más simple
4. **Consistencia**: Diseño uniforme en toda la aplicación
5. **Testing**: Componentes pequeños son más fáciles de probar

## 📝 Uso

```typescript
// Importar desde niveles específicos
import { Button } from '@/components/atoms';
import { Header } from '@/components/molecules';
import { Background } from '@/components/organisms';
import { DiceGameTemplate } from '@/components/templates';

// O importar directamente
import { Button } from '@/components/atoms/Button';
```

## 🎨 Jerarquía Visual

```
DiceGameTemplate (Template)
└── Background (Organism)
    ├── GradientBackground (Atom)
    └── DecorativeCircles (Atom)
└── DiceGameContent (Organism)
    ├── Header (Molecule)
    │   └── Heading (Atoms)
    ├── DiceContainer (Molecule)
    │   └── DiceScene (Special 3D Component)
    ├── ResultDisplay (Molecule)
    │   └── Gradient + Text (Atoms)
    ├── Button (Atom)
    └── ShakeIndicator (Molecule)
        └── Animated View + Text (Atoms)
```
