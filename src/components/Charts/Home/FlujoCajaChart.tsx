import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface FlujoCajaChartProps {
  categories: string[];

  series: {
    type: "column";
    name: string;
    data: number[];
    color: string;
  }[];
}

const FlujoCajaChart: React.FC<FlujoCajaChartProps> = ({
  categories,
  series,
}) => {

  const options: Highcharts.Options = {
    chart: {
      type: "column",
      height: 300,
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Monto ($)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>${point.y:,.0f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: series,
    credits: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default FlujoCajaChart;
