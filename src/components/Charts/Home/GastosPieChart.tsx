import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface GastosPieChartProps {
  data: {
    name: string;
    y: number;
  }[];
}

const GastosPieChart: React.FC<GastosPieChartProps> = ({ data }) => {
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
        },
        showInLegend: false,
      },
    },
    series: [
      {
        type: "pie",
        name: "Monto gastado",
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GastosPieChart;
