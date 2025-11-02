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
