import { Grid } from "@mui/material";
import { useMemo } from "react";
import ChartCard from "./ChartCard";
import FacturacionClienteChart from "./FacturacionClienteChart";
import FlujoCajaChart from "./FlujoCajaChart";
import GastosPieChart from "./GastosPieChart";
import RentabilidadClienteChart from "./RentabilidadClienteChart";
import type { ChartContainerProps } from "../../types/types";

const ChartContainer = ({ ingresos, gastos }: ChartContainerProps) => {
  const gastosPorCategoria = useMemo(() => {
    const categorias: { [key: string]: number } = {};
    gastos.forEach((gasto) => {
      if (!categorias[gasto.categoria]) {
        categorias[gasto.categoria] = 0;
      }
      categorias[gasto.categoria] += gasto.monto;
    });

    // Formato para Highcharts Pie [ { name: 'Impuestos', y: 50000 }, ... ]
    return Object.keys(categorias).map((categoria) => ({
      name: categoria,
      y: categorias[categoria],
    }));
  }, [gastos]);

  // KPI 3: Datos para Gráfico de Flujo de Caja (Column Chart)
  const flujoDeCaja = useMemo(() => {
    // 1. Agrupamos todos los movimientos por mes (YYYY-MM)
    const movimientosPorMes: {
      [mes: string]: { ingresos: number; gastos: number };
    } = {};

    ingresos.forEach((ingreso) => {
      const mes = ingreso.fecha.substring(0, 7); // "2025-10"
      if (!movimientosPorMes[mes]) {
        movimientosPorMes[mes] = { ingresos: 0, gastos: 0 };
      }
      movimientosPorMes[mes].ingresos += ingreso.monto;
    });

    gastos.forEach((gasto) => {
      const mes = gasto.fecha.substring(0, 7); // "2025-10"
      if (!movimientosPorMes[mes]) {
        movimientosPorMes[mes] = { ingresos: 0, gastos: 0 };
      }
      movimientosPorMes[mes].gastos += gasto.monto;
    });

    // 2. Ordenamos los meses cronológicamente
    const mesesOrdenados = Object.keys(movimientosPorMes).sort();

    // 3. Formateamos para Highcharts
    const categories = mesesOrdenados.map((mes) => {
      // Convertir "2025-10" a "Oct 2025"
      const [year, month] = mes.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      // Usamos 'es-AR' para formato de fecha local
      return date.toLocaleString("es-AR", { month: "short", year: "numeric" });
    });

    const series = [
      {
        type: "column" as const, // Es importante para TypeScript
        name: "Ingresos",
        data: mesesOrdenados.map((mes) => movimientosPorMes[mes].ingresos),
        color: "#4caf50", // Verde
      },
      {
        type: "column" as const,
        name: "Gastos",
        data: mesesOrdenados.map((mes) => movimientosPorMes[mes].gastos),
        color: "#f44336", // Rojo
      },
    ];

    return { categories, series };
  }, [ingresos, gastos]);

  // KPI 4: Datos para Gráfico de Facturación por Cliente (Bar Chart)
  const facturacionPorCliente = useMemo(() => {
    const clientes: { [key: string]: number } = {};
    ingresos.forEach((ingreso) => {
      if (!clientes[ingreso.cliente]) {
        clientes[ingreso.cliente] = 0;
      }
      clientes[ingreso.cliente] += ingreso.monto;
    });

    // Ordenamos de mayor a menor facturación
    const clientesOrdenados = Object.entries(clientes).sort(
      (a, b) => b[1] - a[1]
    );

    // Formato para Highcharts Bar
    const categories = clientesOrdenados.map((cliente) => cliente[0]);
    const data = clientesOrdenados.map((cliente) => cliente[1]);

    const series = [
      {
        type: "bar" as const,
        name: "Facturación",
        data: data,
      },
    ];

    return { categories, series };
  }, [ingresos]);

  // KPI 5: Datos para Gráfico de Rentabilidad por Cliente ($/Hora)
  const rentabilidadPorCliente = useMemo(() => {
    // 1. Agrupamos monto total Y horas totales por cliente
    const clientes: {
      [key: string]: { monto: number; horas: number };
    } = {};

    ingresos.forEach((ingreso) => {
      if (!clientes[ingreso.cliente]) {
        clientes[ingreso.cliente] = { monto: 0, horas: 0 };
      }
      clientes[ingreso.cliente].monto += ingreso.monto;
      clientes[ingreso.cliente].horas += ingreso.horasInvertidas;
    });

    // 2. Calculamos $/hora y ordenamos
    const rentabilidad = Object.entries(clientes)
      .map(([nombre, datos]) => {
        const tarifaHora = datos.horas > 0 ? datos.monto / datos.horas : 0;
        return {
          name: nombre,
          y: Math.round(tarifaHora), // Redondeamos para el gráfico
        };
      })
      .sort((a, b) => b.y - a.y); // Ordenamos de mayor a menor rentabilidad

    // 3. Formato para Highcharts Bar
    const categories = rentabilidad.map((c) => c.name);
    const data = rentabilidad.map((c) => c.y);

    const series = [
      {
        type: "bar" as const,
        name: "Tarifa por Hora",
        data: data,
        color: "#ff9800", // Naranja
      },
    ];

    return { categories, series };
  }, [ingresos]);

  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}
      >
        <ChartCard title="Gastos por Categoría">
          <GastosPieChart data={gastosPorCategoria} />
        </ChartCard>
      </Grid>
      <Grid  size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}>
        <ChartCard title="Flujo de Caja (Ingresos vs. Gastos)">
          <FlujoCajaChart
            categories={flujoDeCaja.categories}
            series={flujoDeCaja.series}
          />
        </ChartCard>
      </Grid>
      <Grid  size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}>
        <ChartCard title="Facturación por Cliente">
          <FacturacionClienteChart
            categories={facturacionPorCliente.categories}
            series={facturacionPorCliente.series}
          />
        </ChartCard>
      </Grid>
      <Grid  size={{
          xs: 12,
          sm: 6,
          md: 6,
        }}>
        <ChartCard title="Rentabilidad por Cliente ($ / Hora)">
          <RentabilidadClienteChart
            categories={rentabilidadPorCliente.categories}
            series={rentabilidadPorCliente.series}
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default ChartContainer;
