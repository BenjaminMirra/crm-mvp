import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PieChartData {
  name: string;
  y: number;
}

interface GastosPorCategoriaPieChartProps {
  data: PieChartData[];
}

const GastosPorCategoriaPieChart: React.FC<
  GastosPorCategoriaPieChartProps
> = ({ data }) => {
  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      height: 300,
    },
    title: {
      text: "",
    },
    tooltip: {
      pointFormat:
        "{series.name}: <b>${point.y:,.0f}</b> ({point.percentage:.1f}%)",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f} %",
          distance: 5,
          style: {
            fontSize: "11px",
            textOutline: "none",
            color: "#333",
          },
        },
        showInLegend: false,
      },
    },
    series: [
      {
        type: "pie",
        name: "Monto",
        data: data,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GastosPorCategoriaPieChart;
