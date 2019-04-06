function fortyYardChart(data) {
    // console.log(data);
    const yard_40 = data.Yard_40;
    const rnd_y40 = data.Round;
    const player_name = data.Player_Name;
    const pos_nfl = data.Pos_NFL;
    console.log(yard_40);
    console.log(rnd_y40);

    var trace1 = {
        x: rnd_y40,
        y: yard_40,
        mode: 'markers',
        type: 'scatter',
        name: pos_nfl,
        text: player_name,
        marker: { size: 12 }
      };  
    
      var data1 = [ trace1 ];
      
      var layout1 = { 
        xaxis: {
         range: [ 0.75, 9], 
         title: {
            text: 'Draft Round' 
         }
        },
        yaxis: {
          range: [3, 5.5], 
          title: {
            text: 'Time in sec' 
         }
        },
        title:'40 Yard Dash'
      };
      
      Plotly.newPlot('40_yard', data1, layout1); 
  }

function benchPressChart(data) {

    var bench_press = data.Bench_Press;
    var rnd_bp = data.Round;
    const player_name = data.Player_Name;
    const pos_nfl = data.Pos_NFL;
 
    var trace2 = {
        x: rnd_bp,
        y: bench_press,
        mode: 'markers',
        type: 'scatter',
        name: pos_nfl,
        text: player_name,
        marker: { size: 12 }
      };  
      console.log(bench_press);
      console.log(rnd_bp);   

      var data2 = [ trace2 ];
      
      var layout2 = { 
        xaxis: {
          range: [ 0.75, 8.5], 
          title: {
            text: 'Draft Round' 
         } 
        },
        yaxis: {
          range: [0, 40], 
          title: {
            text: '# Reps (225 lbs)' 
         }
        },
        title:'Bench Press'
      };
      
      Plotly.newPlot('bench_press', data2, layout2);
  }

function vertLeapinChart(data) {

    var vert_leap_in = data.Vert_Leap_in;
    var rnd_vli = data.Round;
    const player_name = data.Player_Name;
    const pos_nfl = data.Pos_NFL;
 
    var trace3 = {
        x: rnd_vli,
        y: vert_leap_in,
        mode: 'markers',
        type: 'scatter',
        name: pos_nfl,
        text: player_name,
        marker: { size: 12 }
      };  
      console.log(vert_leap_in);
      console.log(rnd_vli);

      var data3 = [ trace3 ];
      
      var layout3 = { 
        xaxis: {
          range: [ 0.75, 8.5], 
          title: {
            text: 'Draft Round' 
         } 
        },
        yaxis: {
          range: [0, 50], 
          title: {
            text: 'Height (In)' 
         }
        },
        title:'Vert leap'
      };
      
      Plotly.newPlot('vert_leap_in', data3, layout3);
  }

function broadJumpinChart(data) {

    var broad_jump_in = data.Broad_Jump_in;
    var rnd_bji = data.Round;
    const player_name = data.Player_Name;
    const pos_nfl = data.Pos_NFL;
 
    var trace4 = {
        x: rnd_bji,
        y: broad_jump_in,
        mode: 'markers',
        type: 'scatter',
        name: pos_nfl,
        text: player_name,
        marker: { size: 12 }
      };  
      console.log(broad_jump_in);
      console.log(rnd_bji);       

      var data4 = [ trace4 ];
      
      var layout4 = { 
        xaxis: {
          range: [ 0.75, 8.5], 
          title: {
            text: 'Draft Round' 
         } 
        },
        yaxis: {
          range: [0, 150], 
          title: {
            text: 'Distance (In)' 
         }
        },
        title:'Broad Jump'
      };
      
      Plotly.newPlot('broad_jump_in', data4, layout4);
  }

  function buildCharts(pos) {
  
    d3.json(`/position_test/${pos}`).then((data) => {
        // console.log(data);
        // fortyYard Chart
        fortyYardChart(data);
        // Bench Press Chart
        benchPressChart(data);
        // Vert Leap In Chart
        vertLeapinChart(data);
        // Broad Jump In Chart
        broadJumpinChart(data)

    });
  } 
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/pos_names").then((posNames) => {
      posNames.forEach((pos) => {
        selector
          .append("option")
          .text(pos)
          .property("value", pos);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstPos = posNames[0];
      buildCharts(firstPos);
    });
  }
  
  function optionChanged(newPos) {
    // Fetch new data each time a new position is selected
    buildCharts(newPos);
  }
  
  // Initialize the dashboard
  init();

