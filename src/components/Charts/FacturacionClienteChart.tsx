import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

// Definimos la estructura de las props
interface FacturacionClienteChartProps {
  categories: string[];
  series: {
    type: "bar";
    name: string;
    data: number[];
  }[];
}

const FacturacionClienteChart: React.FC<FacturacionClienteChartProps> = ({
  categories,
  series,
}) => {
  const options: Highcharts.Options = {
    chart: {
      type: "bar", // Gráfico de Barras horizontales
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories, // Eje X con los nombres de clientes
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Facturación ($)",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    tooltip: {
      valuePrefix: "$",
      valueDecimals: 0,
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
          format: "${y:,.0f}", // Muestra el valor en la barra
        },
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false, // Ocultamos la leyenda, es obvio
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default FacturacionClienteChart;
