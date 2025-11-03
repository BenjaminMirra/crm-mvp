# CRM MVP

Dashboard financiero interactivo (MVP) para gestión y visualización de ingresos y gastos.

## Tecnologías principales

- React + TypeScript
- Vite
- Material UI (MUI)
- Highcharts
- React Router DOM

## Características

- Visualización de KPIs y gráficos de ingresos/gastos
- Filtros por año y mes
- Navegación por tabs (Home, Ventas, Gastos)
- Layout con header y footer fijos
- Estado global con Context API (DataProvider)
- Página 404 amigable

## Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/BenjaminMirra/crm-mvp.git
   cd crm-mvp
   ```
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Inicia el entorno de desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a la app en [http://localhost:5173](http://localhost:5173)

## Estructura principal

- `src/`
  - `App.tsx` — Rutas principales
  - `context/DataProvider.tsx` — Proveedor global de datos y filtros
  - `components/` — Componentes reutilizables (filtros, header, footer, charts, KPIs)
  - `views/` — Vistas principales (Home, Ventas, Gastos, 404, Layout)
  - `public/data/` — Datos mock en JSON (`ingresos.json`, `gastos.json`)

## Próximos pasos

- Agregar vistas de detalle (clientes, reportes, etc.)
- Autenticación y roles
- Integración con backend/API real
- Exportación de reportes

---

Desarrollado por Mirra Benjamín