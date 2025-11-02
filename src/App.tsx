import { filtrarPorPeriodo } from "./utils";
import { highchartsTheme } from "./theme";
import { Typography, Stack } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import ChartContainer from "./components/Charts/ChartContainer";
import FiltersChips from "./components/FiltersChips";
import FiltrosPeriodo from "./components/FiltrosPeriodo";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Highcharts from "highcharts";
import KpiContainer from "./components/Kpis/KpiContainer";
import type { Ingreso, Gasto } from "./types/types";

Highcharts.setOptions(highchartsTheme);
function App() {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnios, setSelectedAnios] = useState<string[]>([]);
  const [selectedMeses, setSelectedMeses] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([fetch("/data/ingresos.json"), fetch("/data/gastos.json")])
      .then(async ([ingresosRes, gastosRes]) => {
        if (!ingresosRes.ok) throw new Error("Falló al cargar ingresos.json");
        if (!gastosRes.ok) throw new Error("Falló al cargar gastos.json");

        const ingresosData = await ingresosRes.json();
        const gastosData = await gastosRes.json();

        setIngresos(ingresosData);
        setGastos(gastosData);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filtrar datos según selección
  const ingresosFiltrados = useMemo(
    () => filtrarPorPeriodo(ingresos, selectedAnios, selectedMeses),
    [ingresos, selectedAnios, selectedMeses]
  );
  const gastosFiltrados = useMemo(
    () => filtrarPorPeriodo(gastos, selectedAnios, selectedMeses),
    [gastos, selectedAnios, selectedMeses]
  );

  return (
    <>
      <Header>
        <FiltrosPeriodo
          data={[...ingresos, ...gastos]}
          selectedAnios={selectedAnios}
          selectedMeses={selectedMeses}
          onChangeAnios={setSelectedAnios}
          onChangeMeses={setSelectedMeses}
        />
      </Header>
      {loading && <Typography>Cargando datos...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}
      {(selectedAnios.length > 0 || selectedMeses.length > 0) && (
        <FiltersChips
          selectedAnios={selectedAnios}
          selectedMeses={selectedMeses}
          ingresos={ingresos}
          gastos={gastos}
          onClearAnios={() => setSelectedAnios([])}
          onClearMeses={() => setSelectedMeses([])}
        />
      )}
      {!loading && !error && (
        <Stack
          sx={{
            backgroundColor: (theme) => theme.palette.background.default,
            boxSizing: "border-box",
            gap: 2,
            height: "calc(100vh - 64px - 64px)",
            mx: "auto",
            overflow: "auto",
            px: { xs: 4, sm: 6, md: 6, lg: 10 },
            pb: 2,
            pt: (selectedAnios.length > 0 || selectedMeses.length > 0) ? 4 : 2,
            width: "100%",
          }}
        >
          <KpiContainer
            marginTop={selectedAnios.length > 0 || selectedMeses.length > 0}
            ingresos={ingresosFiltrados}
            gastos={gastosFiltrados}
          />
          <ChartContainer
            ingresos={ingresosFiltrados}
            gastos={gastosFiltrados}
          />
        </Stack>
      )}
      <Footer />
    </>
  );
}

export default App;
