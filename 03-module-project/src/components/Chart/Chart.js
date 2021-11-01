import ChartBar from "./ChartBar";

import "./Chart.css";

const Chart = ({ dataPoints }) => {
  const valueArray = dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...valueArray);

  return (
    <div className="chart">
      {dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
