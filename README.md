# 🧙‍♂️ Mantenedor de Cartas - MTG / Jumpseller

Este proyecto es un mantenedor de productos/cartas desarrollado con React y TypeScript, enfocado en cartas de juegos como *Magic: The Gathering*, *One Piece* y *Pokémon*, integrando datos desde Jumpseller. Permite la creación, edición, búsqueda, filtrado, exportación y gestión de stock por carta.

---

## 🚀 Funcionalidades

- 📄 **Formulario** de creación y edición de cartas.
- 🔍 **Búsqueda y filtrado** por nombre, fecha, estado e idioma.
- 📦 **Gestión de stock** por ubicación, variante y producto.
- 🌍 **Integración con Jumpseller** para crear productos y variantes.
- 📤 **Exportación a Excel** de cartas filtradas.
- 💬 **Modal de detalle** y errores por carta.
- 🛠️ **Configuración** de precios base por rareza y valor del dólar.

---

## 🛠️ Stack Técnico

- **React**
- **TypeScript**
- **Zustand** para manejo de estado
- **Tailwind CSS** (si aplica)
- **shadcn/ui** (modales, botones, inputs)
- **xlsx** + **file-saver** para exportación de datos

---

## 📦 Instalación

```bash
pnpm install

🧪 Scripts
pnpm dev          # Inicia el servidor de desarrollo
pnpm build        # Compila la app para producción
pnpm preview      # Previsualiza la versión compilada

