import { Grid } from "@mui/material";
import { theme } from "../../theme";
import { useMemo } from "react";
import ChartCard from "./ChartCard";
import HorasPorClienteChart from "./Sales/HorasPorClienteChart";
import type { Ingreso } from "../../types/types";
import VentasEspecificosChart from "./Sales/VentasEspecificosChart";
import VentasPorMesChart from "./Sales/VentasPorMesChart";
import VentasPorServicioPieChart from "./Sales/VentasPorServicioPieChart";

const getTipoServicio = (descripcion: string): string => {
  const desc = descripcion.toLowerCase();
  if (desc.includes("mantenimiento")) return "Mantenimiento";
  if (desc.includes("app mobile")) return "App Mobile";
  if (desc.includes("consultoría") || desc.includes("seo"))
    return "Consultoría/SEO";
  if (desc.includes("e-commerce")) return "E-commerce";
  if (
    desc.includes("web") ||
    desc.includes("landing") ||
    desc.includes("institucional") ||
    desc.includes("rediseño")
  )
    return "Diseño/Rediseño Web";
  return "Otros";
};

interface SalesChartContainerProps {
  ingresos: Ingreso[];
}

export default function SalesChartContainer({
  ingresos,
}: SalesChartContainerProps) {
  const ventasPorMes = useMemo(() => {
    const movimientosPorMes: { [mes: string]: number } = {};

    ingresos.forEach((ingreso) => {
      const mes = ingreso.fecha.substring(0, 7);
      if (!movimientosPorMes[mes]) {
        movimientosPorMes[mes] = 0;
      }
      movimientosPorMes[mes] += ingreso.monto;
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
        name: "Ventas",
        data: mesesOrdenados.map((mes) => movimientosPorMes[mes]),
        color: theme.palette.success.main,
      },
    ];

    return { categories, series };
  }, [ingresos]);

  const ventasPorTipoDeServicio = useMemo(() => {
    const servicios: { [key: string]: number } = {};
    ingresos.forEach((ingreso) => {
      const tipo = getTipoServicio(ingreso.descripcion);
      if (!servicios[tipo]) {
        servicios[tipo] = 0;
      }
      servicios[tipo] += ingreso.monto;
    });
    return Object.entries(servicios).map(([name, y]) => ({
      name,
      y,
    }));
  }, [ingresos]);

  const horasPorCliente = useMemo(() => {
    const clientes: { [key: string]: number } = {};
    ingresos.forEach((ingreso) => {
      if (!clientes[ingreso.cliente]) {
        clientes[ingreso.cliente] = 0;
      }
      clientes[ingreso.cliente] += ingreso.horasInvertidas;
    });

    const clientesOrdenados = Object.entries(clientes).sort(
      (a, b) => b[1] - a[1]
    );
    const categories = clientesOrdenados.map(([cliente]) => cliente);
    const data = clientesOrdenados.map(([, horas]) => horas);
    const series = [
      {
        type: "bar" as const,
        name: "Horas Trabajadas",
        data,
        color: theme.palette.info.main,
      },
    ];
    return { categories, series };
  }, [ingresos]);

  const ingresosEspecificos = useMemo(() => {
    const descripciones: { [key: string]: number } = {};
    ingresos.forEach((ingreso) => {
      const desc = ingreso.descripcion;
      if (!descripciones[desc]) {
        descripciones[desc] = 0;
      }
      descripciones[desc] += ingreso.monto;
    });

    const ingresosOrdenados = Object.entries(descripciones)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    const categories = ingresosOrdenados.map(([desc]) => desc);
    const data = ingresosOrdenados.map(([, monto]) => monto);

    const series = [
      {
        type: "bar" as const,
        name: "Monto Total",
        data,
        color: theme.palette.warning.main,
      },
    ];
    return { categories, series };
  }, [ingresos]);

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Ventas por Tipo de Servicio">
          <VentasPorServicioPieChart data={ventasPorTipoDeServicio} />
        </ChartCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Horas por Cliente">
          <HorasPorClienteChart
            categories={horasPorCliente.categories}
            series={horasPorCliente.series}
          />
        </ChartCard>
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Ventas por Mes">
          <VentasPorMesChart
            categories={ventasPorMes.categories}
            series={ventasPorMes.series}
          />
        </ChartCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Top 10 Ventas Específicas">
          <VentasEspecificosChart
            categories={ingresosEspecificos.categories}
            series={ingresosEspecificos.series}
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
}
