import { Grid } from "@mui/material";
import { theme } from "../../theme";
import { useMemo } from "react";
import ChartCard from "./ChartCard";
import type { Gasto } from "../../types/types";
import GastosPorCategoriaPieChart from "./Expenses/GastosPorCategoriaPieChart";
import GastosPorMesChart from "./Expenses/GastosPorMesChart";
import GastosEvolucionChart from "./Expenses/GastosEvolucionChart";
import GastosEspecificosChart from "./Expenses/GastosEspecificosChart";

interface ExpensesChartContainerProps {
  gastos: Gasto[];
}

export default function ExpensesChartContainer({
  gastos,
}: ExpensesChartContainerProps) {
  const gastosPorCategoria = useMemo(() => {
    const categorias: { [key: string]: number } = {};
    gastos.forEach((gasto) => {
      const cat = gasto.categoria || "Otros";
      if (!categorias[cat]) {
        categorias[cat] = 0;
      }
      categorias[cat] += gasto.monto;
    });

    return Object.entries(categorias)
      .map(([name, y]) => ({
        name,
        y,
      }))
      .sort((a, b) => b.y - a.y)
  }, [gastos]);

  const gastosPorMes = useMemo(() => {
    const movimientosPorMes: { [mes: string]: number } = {};
    gastos.forEach((gasto) => {
      const mes = gasto.fecha.substring(0, 7)
      if (!movimientosPorMes[mes]) {
        movimientosPorMes[mes] = 0;
      }
      movimientosPorMes[mes] += gasto.monto;
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
        name: "Gastos",
        data: mesesOrdenados.map((mes) => movimientosPorMes[mes]),
        color: theme.palette.error.main
      },
    ];
    return { categories, series };
  }, [gastos]);

  const evolucionGastos = useMemo(() => {
    const data: { [mes: string]: { [cat: string]: number } } = {};
    const todasCategorias = new Set<string>();

    gastos.forEach((gasto) => {
      const mes = gasto.fecha.substring(0, 7);
      const cat = gasto.categoria || "Otros";
      todasCategorias.add(cat);

      if (!data[mes]) data[mes] = {};
      if (!data[mes][cat]) data[mes][cat] = 0;

      data[mes][cat] += gasto.monto;
    });

    const categories = Object.keys(data).sort()
    const series = Array.from(todasCategorias).map((cat) => ({
      type: "area" as const,
      name: cat,
      data: categories.map((mes) => data[mes][cat] || 0)
    }));

    return { categories, series };
  }, [gastos]);

  const gastosEspecificos = useMemo(() => {
    const descripciones: { [key: string]: number } = {};
    gastos.forEach((gasto) => {
      const desc = gasto.descripcion;
      if (!descripciones[desc]) {
        descripciones[desc] = 0;
      }
      descripciones[desc] += gasto.monto;
    });

    const gastosOrdenados = Object.entries(descripciones)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    const categories = gastosOrdenados.map(([desc]) => desc).reverse()
    const data = gastosOrdenados.map(([, monto]) => monto).reverse();

    const series = [
      {
        type: "bar" as const,
        name: "Monto Total",
        data,
        color: theme.palette.warning.main,
      },
    ];
    return { categories, series };
  }, [gastos]);

  return (
    <Grid container spacing={3}>
      {/* Layout 2x2 para los gráficos */}
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Gastos por Categoría">
          <GastosPorCategoriaPieChart data={gastosPorCategoria} />
        </ChartCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Gastos por Mes">
          <GastosPorMesChart
            categories={gastosPorMes.categories}
            series={gastosPorMes.series}
          />
        </ChartCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Evolución de Gastos por Categoría">
          <GastosEvolucionChart
            categories={evolucionGastos.categories}
            series={evolucionGastos.series}
          />
        </ChartCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 12, md: 6 }}>
        <ChartCard title="Top 10 Gastos Específicos">
          <GastosEspecificosChart
            categories={gastosEspecificos.categories}
            series={gastosEspecificos.series}
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
}
