import { Grid } from "@mui/material";
import { useMemo } from "react";
import ChartCard from "./ChartCard";
import FacturacionClienteChart from "./Home/FacturacionClienteChart";
import FlujoCajaChart from "./Home/FlujoCajaChart";
import GastosPieChart from "./Home/GastosPieChart";
import RentabilidadClienteChart from "./Home/RentabilidadClienteChart";
import type { ChartContainerProps } from "../../types/types";

const HomeChartContainer = ({ ingresos, gastos }: ChartContainerProps) => {
  const gastosPorCategoria = useMemo(() => {
    const categorias: { [key: string]: number } = {};
    gastos.forEach((gasto) => {
      if (!categorias[gasto.categoria]) {
        categorias[gasto.categoria] = 0;
      }
      categorias[gasto.categoria] += gasto.monto;
    });

    return Object.keys(categorias).map((categoria) => ({
      name: categoria,
      y: categorias[categoria],
    }));
  }, [gastos]);

  const flujoDeCaja = useMemo(() => {
    const movimientosPorMes: {
      [mes: string]: { ingresos: number; gastos: number };
    } = {};

    ingresos.forEach((ingreso) => {
      const mes = ingreso.fecha.substring(0, 7);
      if (!movimientosPorMes[mes]) {
        movimientosPorMes[mes] = { ingresos: 0, gastos: 0 };
      }
      movimientosPorMes[mes].ingresos += ingreso.monto;
    });

    gastos.forEach((gasto) => {
      const mes = gasto.fecha.substring(0, 7);
      if (!movimientosPorMes[mes]) {
        movimientosPorMes[mes] = { ingresos: 0, gastos: 0 };
      }
      movimientosPorMes[mes].gastos += gasto.monto;
    });

    const mesesOrdenados = Object.keys(movimientosPorMes).sort();

    const categories = mesesOrdenados.map((mes) => {
      const [year, month] = mes.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleString("es-AR", { month: "short", year: "numeric" });
    });

    const series = [
      {
        type: "column" as const, 
        name: "Ingresos",
        data: mesesOrdenados.map((mes) => movimientosPorMes[mes].ingresos),
        color: "#4caf50",
      },
      {
        type: "column" as const,
        name: "Gastos",
        data: mesesOrdenados.map((mes) => movimientosPorMes[mes].gastos),
        color: "#f44336",
      },
    ];

    return { categories, series };
  }, [ingresos, gastos]);

  const facturacionPorCliente = useMemo(() => {
    const clientes: { [key: string]: number } = {};
    ingresos.forEach((ingreso) => {
      if (!clientes[ingreso.cliente]) {
        clientes[ingreso.cliente] = 0;
      }
      clientes[ingreso.cliente] += ingreso.monto;
    });

    const clientesOrdenados = Object.entries(clientes).sort(
      (a, b) => b[1] - a[1]
    );

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

  const rentabilidadPorCliente = useMemo(() => {
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

    const rentabilidad = Object.entries(clientes)
      .map(([nombre, datos]) => {
        const tarifaHora = datos.horas > 0 ? datos.monto / datos.horas : 0;
        return {
          name: nombre,
          y: Math.round(tarifaHora),
        };
      })
      .sort((a, b) => b.y - a.y);

    const categories = rentabilidad.map((c) => c.name);
    const data = rentabilidad.map((c) => c.y);

    const series = [
      {
        type: "bar" as const,
        name: "Tarifa por Hora",
        data: data,
        color: "#ff9800",
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

export default HomeChartContainer;
