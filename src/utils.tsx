export const filtrarPorPeriodo = <T extends { fecha: string }>(
  data: T[],
  anios: string[],
  meses: string[]
) => {
  return data.filter((item) => {
    const [anio, mes] = item.fecha.split("-");
    const anioOk = anios.length === 0 || anios.includes(anio);
    const mesOk = meses.length === 0 || meses.includes(mes);
    return anioOk && mesOk;
  });
};

// Utilidad para mostrar nombres de meses
export const mesesNombres = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// Formatea un número en miles y con dos decimales (ej: 1,234.56)
export function formatMilesDecimal(value: number): string {
  if (isNaN(value)) return "-";
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
