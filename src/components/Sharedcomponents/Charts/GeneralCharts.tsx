import "./GeneralCharts.css";

type IChartTypes = {
  title?: string;
  type?: string;
  data?: any;
  options?: any;
  frameStyle?: any;
  chartHeight?: number;
};

const defaultData = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: ["#6FAB6E"],
      borderWidth: 0,
    },
  ],
};

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const defaultFrameStyle = { width: "100%", height: "260px", border: "0px" };

export const GeneralCharts: React.FC<IChartTypes> = ({
  title = "Title",
  type = "bar",
  data = defaultData,
  options = defaultOptions,
  frameStyle = defaultFrameStyle,
  chartHeight = 240,
}) => {
  const graphData = {
    type: type,
    data: data,
    options: options,
  };
  const graphHtmlString = `<div style="height: ${chartHeight}px">
  <canvas id="myChart"></canvas>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const ctx = document.getElementById("myChart");

  new Chart(ctx, ${JSON.stringify(graphData)});
</script>
`;
  return (
    <>
      <div className="w3-col w3-margin-bottom">
        <div className="w3-col chartBackground w3-padding w3-round-large">
          {/* Chart Title */}
          <div className="w3-col">
            <span className="w3-small w3-text-black myfont1">{title}</span>
          </div>
          {/* Chart */}
          <div className="w3-col">
            <iframe
              style={frameStyle}
              srcDoc={graphHtmlString}
              title="Graph"
            ></iframe>
          </div>
          {/* Chart Indicator */}
          {/* <div className="w3-col">
            <div className="w3-col w3-margin-bottom">
              <div
                className="w3-col w3-round"
                style={{ width: "20px", height: "20px", background: "#6FAB6E" }}
              ></div>
              <div className="w3-rest">
                &nbsp;
                <span className="w3-small w3-text-black"></span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default GeneralCharts;
