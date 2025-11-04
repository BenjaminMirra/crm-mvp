import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface PieChartData {
  name: string;
  y: number;
}

interface VentasPorServicioPieChartProps {
  data: PieChartData[];
}

const VentasPorServicioPieChart: React.FC<VentasPorServicioPieChartProps> = ({
  data,
}) => {
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
          distance: 10,
          style: {
            fontSize: "12px",
            textOutline: "none",
          }
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

export default VentasPorServicioPieChart;
