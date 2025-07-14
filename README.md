# Bsale-Pipedrive Frontend

Este proyecto es el frontend de la integración **Bsale-Pipedrive**, desarrollado en **React** y **TypeScript** (Next.js). Permite visualizar, buscar, filtrar y gestionar clientes y productos sincronizados entre Bsale y Pipedrive.

---

## 🧩 ¿Qué es la integración Bsale-Pipedrive?

Esta integración conecta dos sistemas empresariales clave:

- **Bsale**: Plataforma de facturación electrónica y gestión comercial. Permite administrar productos, clientes, ventas, inventario y emitir documentos tributarios electrónicos (boletas, facturas, etc.), facilitando el control y cumplimiento fiscal de los comercios.
- **Pipedrive**: CRM (Customer Relationship Management) especializado en la gestión de oportunidades de venta, seguimiento de clientes potenciales y organización del pipeline comercial. Ayuda a los equipos de ventas a priorizar y cerrar negocios de manera eficiente.

**¿Qué resuelve la integración?**

Sincroniza automáticamente los datos de clientes y personas entre Bsale y Pipedrive. Cuando se crea o actualiza un cliente en Bsale, la información se refleja en Pipedrive como contacto, y viceversa. Así, ambos sistemas mantienen la información actualizada y consistente, evitando duplicidades y trabajo manual.

**Beneficios principales:**
- Centraliza la información de clientes y oportunidades de venta.
- Automatiza la actualización de datos entre sistemas.
- Permite gestionar ventas y facturación de manera integrada.
- Facilita el seguimiento de clientes desde la captación hasta la postventa.

---

## 🚀 Características principales

- **Visualización y gestión** de clientes y productos sincronizados.
- **Búsqueda y filtrado** avanzado por nombre, fecha, estado, etc.
- **Gestión de stock** y visualización de historial.
- **Exportación a Excel** de datos filtrados.
- **Modal de detalle** y errores por registro.
- **Configuración** de parámetros de la aplicación.
- **Autenticación y gestión de usuarios**.

---

## 📁 Estructura del proyecto

- `app/`: Páginas principales y rutas.
- `components/`: Componentes reutilizables de UI y tablas.
- `hooks/`: Hooks personalizados.
- `lib/`: Utilidades y helpers.
- `public/`: Recursos estáticos.
- `docker/`: Archivos para despliegue con Docker.

---

## ⚙️ Instalación

```bash
# Clona el repositorio
git clone <url-del-repositorio>
cd Bsale-Pipedrive-Frontend

# Instala dependencias
pnpm install
# o
yarn install
```

---

## 🛠️ Configuración

1. Crea un archivo `.env.local` con las variables necesarias para la conexión al backend y autenticación.
2. Configura las URLs y credenciales según tu entorno.

---

## ▶️ Uso

### Desarrollo

```bash
pnpm dev
# o
yarn dev
```

### Producción

```bash
pnpm build
pnpm start
# o
yarn build
yarn start
```

---

## 🧰 Tecnologías utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [xlsx](https://github.com/SheetJS/sheetjs) + [file-saver](https://github.com/eligrey/FileSaver.js)
- [Radix UI](https://www.radix-ui.com/)
- [NextAuth.js](https://next-auth.js.org/)

---

## 🗂️ Estructura de Colecciones (Backend)

- **clients**: Clientes provenientes de Bsale.
- **people**: Personas sincronizadas con Pipedrive.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas!  
Por favor abre un issue o un pull request para sugerencias, mejoras o reportar errores.

---

## 📄 Licencia
> Proyecto desarrollado por Elianny Katiuska Bello

