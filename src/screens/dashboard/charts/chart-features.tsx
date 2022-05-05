import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
} from "chart.js";

Chart.register(annotationPlugin);
Chart.register(LinearScale, CategoryScale, BarElement, Tooltip);

type ChartProps = {
  totals: {
    honouring: number;
    breaking: number;
  };
};

const FeaturesChart = ({ totals }: ChartProps) => {
  const [data, setData] = useState(null);
  const [scales, setScales] = useState(null);

  const colours = [
    "#F5793A",
    "#FC6385",
    "#0F2080",
    "#1C3B40",
    "#85C0F9",
    "#A5C4C6",
    "#A95AA1",
  ];

  useEffect(() => {
    setData({
      labels: ["Honoured", "Breaking"],
      datasets: [
        {
          indexAxis: "x",
          label: "Snapshot total",
          data: [totals.honouring, totals.breaking * -1],
          backgroundColor: [colours[0], colours[1]],
          minBarLength: 1,
        },
      ],
    });

    setScales({
      y: {
        min: -30,
        max: 30,
      },
    });
  }, [totals]);

  const options = { scales, responsive: true };

  return (
    <>
      {data === null ? (
        <div>
          There is either no data, or you have disabled JavaScript which is
          necessary to view charts on this site.
        </div>
      ) : (
        <div>
          <div role="tabpanel">
            <Bar data={data} options={options}>
              <div>Please see data in tabular form</div>
            </Bar>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturesChart;
