
# CRM MVP - Resumen del Proyecto

Este proyecto es un MVP (Producto Mínimo Viable) de un CRM (Customer Relationship Management) orientado a la visualización y análisis de datos financieros (ingresos y gastos) mediante dashboards interactivos y filtros avanzados.

## Arquitectura y Tecnologías

- **Frontend:** React + TypeScript
- **Visualización:** Highcharts
- **UI:** Material UI (MUI)
- **Build:** Vite
- **Routing:** React Router DOM
- **Estado global:** Context API (DataProvider)

## Estructura del Proyecto

- `src/` - Código fuente principal
  - `App.tsx` - Define las rutas principales y la estructura general
  - `context/DataProvider.tsx` - Provee datos y estado global a toda la app (ingresos, gastos, filtros, loading, error)
  - `components/` - Componentes reutilizables (filtros, header, footer, charts, KPIs)
  - `views/` - Vistas principales: `HomeView`, `SalesView`, `ExpensesView`, `NotFoundView`, `MainLayout`
  - `utils.tsx` - Funciones utilitarias (ej: filtrado por periodo)
  - `theme.ts` - Tema de Highcharts
  - `types/` - Tipos TypeScript para ingresos y gastos
- `public/data/` - Datos mock en JSON (`ingresos.json`, `gastos.json`)
- Configuración: `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, etc.

## Funcionalidad Actual

- Carga de datos de ingresos y gastos desde archivos JSON (mock)
- Filtros por año y mes (con chips para limpiar filtros)
- Visualización de KPIs y gráficos interactivos (Highcharts)
- Navegación por tabs (HOME, VENTAS, GASTOS) usando React Router
- Layout general con header y footer siempre visibles, y scroll solo en el contenido
- Manejo de errores y loading global
- Página 404 amigable

## Arquitectura de Componentes

- **DataProvider:** Contexto global para datos y filtros, evita prop drilling
- **MainLayout:** Estructura base con header, footer y outlet scrollable
- **Vistas:**
  - `HomeView`: Tablero general (KPIs y gráficos de ingresos/gastos)
  - `SalesView`: Vista específica de ventas (en desarrollo)
  - `ExpensesView`: Vista específica de gastos (en desarrollo)
  - `NotFoundView`: Página de error 404

## Ideas para Mejoras

- Agregar más vistas (detalle de clientes, reportes personalizados, etc.)
- Autenticación de usuarios
- Integración con backend/API real
- Exportación de reportes
- Mejorar la gestión de permisos y roles
- Tests unitarios y de integración

---

Este archivo puede ser actualizado a medida que el proyecto crece o se agregan nuevas vistas y funcionalidades.