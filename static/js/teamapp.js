function buildTeamPie(data) {
    // console.log(data);
    const team_name = data.team_names;
    const combine = data.Combine;
    console.log(team_name);
    console.log(combine);

    var combineCount = {};
    combine.forEach(combine => combineCount[combine] = (combineCount[combine] || 0) +1);
    console.log(combineCount)

    var pieData = [{
        values: combineCount,
        labels: combine,
        hovertext: team_name,
        hoverinfo: "hovertext",
        type: "pie",
        // name: 'QB',
        // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
      }];

    var pieLayout = {
      margin: {t: 0, l: 0}
    }; 
        
      
    Plotly.plot("pie", pieData, pieLayout);
  }

function buildTeamBar(data) {

    var combine = data.Combine;

    var combineCount = {};
    combine.forEach(combine => combineCount[combine] = (combineCount[combine] || 0) +1);
    console.log(combineCount)

    var barCombineCount = [];
    for(var element in combineCount) {
      barCombineCount.push({label: element, y: combineCount[element]});
    }
    console.log(barCombineCount)

    var trace1 = {
        x: barCombineCount.map(row => row.label),
        y: barCombineCount.map(row => row.y),
        type: "bar",
      };  

    var data2 = [trace1];
      
    var layout2 = {
      title: "Did Draft Pick Attend the Combine",
    };
      
      Plotly.newPlot('teamBar', data2, layout2);
  }

  function buildCharts(team) {
  
    d3.json(`/team_name/${team}`).then((data) => {
        // console.log(data);
        // fortyYard Chart
        buildTeamPie(data);
        // Bench Press Chart
        buildTeamBar(data);
    });
  } 
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selteamDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/team_names").then((teamName) => {
      teamName.forEach((team) => {
        selector
          .append("option")
          .text(team)
          .property("value", team);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstTeam = teamName[0];
      buildCharts(firstTeam);
//       buildPosdata(firstSample);
    });
  }
  
  function optionChanged(newTeam) {
    // Fetch new data each time a new position is selected
    buildCharts(newTeam);
    // buildPosdata(newPos);
  }
  
  // Initialize the dashboard
  init();

