import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { filtrarPorPeriodo } from "../utils";
import type { Ingreso, Gasto } from "../types/types";

interface DataContextType {
  ingresos: Ingreso[];
  gastos: Gasto[];
  loading: boolean;
  error: string | null;
  selectedAnios: string[];
  selectedMeses: string[];
  setSelectedAnios: (a: string[]) => void;
  setSelectedMeses: (m: string[]) => void;
  ingresosFiltrados: Ingreso[];
  gastosFiltrados: Gasto[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData debe usarse dentro de DataProvider");
  return ctx;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ingresos, setIngresos] = useState<Ingreso[]>([]);
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnios, setSelectedAnios] = useState<string[]>([]);
  const [selectedMeses, setSelectedMeses] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/ingresos.json"),
      fetch("/data/gastos.json")
    ])
      .then(async ([ingresosRes, gastosRes]) => {
        if (!ingresosRes.ok) throw new Error("Falló al cargar ingresos.json");
        if (!gastosRes.ok) throw new Error("Falló al cargar gastos.json");
        const ingresosData = await ingresosRes.json();
        const gastosData = await gastosRes.json();
        setIngresos(ingresosData);
        setGastos(gastosData);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const ingresosFiltrados = useMemo(
    () => filtrarPorPeriodo(ingresos, selectedAnios, selectedMeses),
    [ingresos, selectedAnios, selectedMeses]
  );
  const gastosFiltrados = useMemo(
    () => filtrarPorPeriodo(gastos, selectedAnios, selectedMeses),
    [gastos, selectedAnios, selectedMeses]
  );

  return (
    <DataContext.Provider
      value={{
        ingresos,
        gastos,
        loading,
        error,
        selectedAnios,
        selectedMeses,
        setSelectedAnios,
        setSelectedMeses,
        ingresosFiltrados,
        gastosFiltrados,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
