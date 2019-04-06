function buildCharts(player) {
var marksCanvas = document.getElementById("marksChart");

d3.json(`/player_name/${player}`).then((data) => {
var pname = data.Player_Name;
var y40 = data.Yard_40
var bpress = data.Bench_Press;
var vleap = data.Vert_Leap_in;
var bjump = data.Broad_Jump_in;
var ay40 = data.Averageof40_Yard;
var abpress = data.AverageofBench_Press;
var avleap = data.AverageofVert_Leap_in;
var abjump  = data.AverageofBroad_Jump_in;

  var marksData = {
  labels: ["40 Yard Dash", "Bench Press", "Vert Leap", "Broad Jump", "Round Picked"],
  datasets: [{
    label: pname,
    backgroundColor: "transparent",
    borderColor: "rgba(200,0,0,0.6)",
    fill: false,
    radius: 6,
    pointRadius: 6,
    pointBorderWidth: 3,
    pointBackgroundColor: "orange",
    pointBorderColor: "rgba(200,0,0,0.6)",
    pointHoverRadius: 10,
    data: [y40, bpress, vleap, bjump]
  }, {
    label: "Average at Position",
    backgroundColor: "transparent",
    borderColor: "rgba(0,0,200,0.6)",
    fill: false,
    radius: 6,
    pointRadius: 6,
    pointBorderWidth: 3,
    pointBackgroundColor: "cornflowerblue",
    pointBorderColor: "rgba(0,0,200,0.6)",
    pointHoverRadius: 10,
    data: [ay40, abpress, avleap, abjump]
  }]
};

var chartOptions = {
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 150,
        stepSize: 25
      },
      pointLabels: {
        fontSize: 50
      }
    },
    legend: {
      position: 'left'
    }
  };

var radarChart = new Chart(marksCanvas, {
  type: 'radar',
  data: marksData
});
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/players_names").then((playerNames) => {
    playerNames.forEach((player) => {
      selector
        .append("option")
        .text(player)
        .property("value", player);
    });

    // Use the first sample from the list to build the initial plots
    const firstPlayer = playerNames[0];
    buildCharts(firstPlayer);
//       buildPosdata(firstSample);
  });
}

function optionChanged(newPlayer) {
  
  buildCharts(newPlayer);
}

// Initialize the dashboard
init();
