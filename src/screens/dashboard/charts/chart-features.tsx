import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, BarElement } from "chart.js";

// import { Chart, registerables } from 'chart.js'

// Chart.register(...registerables)

import annotationPlugin from "chartjs-plugin-annotation";

Chart.register(annotationPlugin);
Chart.register(LinearScale, CategoryScale, BarElement);

type ChartProps = {
  totals: {
    honouring: number;
    breaking: number;
  };
};

const FeaturesChart = ({ totals }: ChartProps) => {
  const [data, setData] = useState(null);
  const [scales, setScales] = useState(null);

  // https://venngage.com/blog/color-blind-friendly-palette/
  const zesty = ["#85C0F9", "#A95AA1", "#F5793A", "#0F2080"];

  useEffect(() => {
    setData({
      labels: ["Honoured", "Breaking"],
      datasets: [
        {
          indexAxis: "x",
          // label: `label`,
          data: [totals.honouring, totals.breaking * -1],
          backgroundColor: [zesty[0], zesty[1]],
          minBarLength: 1,
        },
      ],
    });

    setScales({
      y: {
        type: "linear",
        min: -20,
        max: 30,
      },
    });
  }, []);

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
              <div>Hello Fallback World</div>
            </Bar>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturesChart;
