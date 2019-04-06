function overViewChart(data) {
    // console.log(data);
    const ocombine = data.Combine;
    const opick = data.Pick;
    console.log(ocombine);
    console.log(opick);

    var otrace1 = {
        labels: ocombine,
        values: opick,
        type: 'pie',
        hovertext: values,
        // name: 'QB',
        // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
      };  
    
      var odata1 = [ otrace1 ];
      
      var olayout1 = { 
        title: "NFL Combine Participants Drafted",
        hovermode: "closest"
      };
      Plotly.plot("opie", odata1, olayout1);
  }

// function benchPressChart(data) {

//     var bench_press = data.Bench_Press;
//     var rnd_bp = data.Round;
 
//     var trace2 = {
//         x: rnd_bp,
//         y: bench_press,
//         mode: 'markers',
//         type: 'scatter',
//         // name: 'QB',
//         // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
//         marker: { size: 12 }
//       };  
//       console.log(bench_press);
//       console.log(rnd_bp);   

//       var data2 = [ trace2 ];
      
//       var layout2 = { 
//         xaxis: {
//           range: [ 0.75, 8.5], 
//           title: {
//             text: 'Draft Round' 
//          } 
//         },
//         yaxis: {
//           range: [0, 40], 
//           title: {
//             text: '# Reps (225 lbs)' 
//          }
//         },
//         title:'Bench Press'
//       };
      
//       Plotly.plot('bench_press', data2, layout2);
//   }

// function vertLeapinChart(data) {

//     var vert_leap_in = data.Vert_Leap_in;
//     var rnd_vli = data.Round;
 
//     var trace3 = {
//         x: rnd_vli,
//         y: vert_leap_in,
//         mode: 'markers',
//         type: 'scatter',
//         // name: 'QB',
//         // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
//         marker: { size: 12 }
//       };  
//       console.log(vert_leap_in);
//       console.log(rnd_vli);

//       var data3 = [ trace3 ];
      
//       var layout3 = { 
//         xaxis: {
//           range: [ 0.75, 8.5], 
//           title: {
//             text: 'Draft Round' 
//          } 
//         },
//         yaxis: {
//           range: [0, 50], 
//           title: {
//             text: 'Height (In)' 
//          }
//         },
//         title:'Vert leap'
//       };
      
//       Plotly.plot('vert_leap_in', data3, layout3);
//   }

// function broadJumpinChart(data) {

//     var broad_jump_in = data.Broad_Jump_in;
//     var rnd_bji = data.Round;
 
//     var trace4 = {
//         x: rnd_bji,
//         y: broad_jump_in,
//         mode: 'markers',
//         type: 'scatter',
//         // name: 'QB',
//         // text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
//         marker: { size: 12 }
//       };  
//       console.log(broad_jump_in);
//       console.log(rnd_bji);       

//       var data4 = [ trace4 ];
      
//       var layout4 = { 
//         xaxis: {
//           range: [ 0.75, 8.5], 
//           title: {
//             text: 'Draft Round' 
//          } 
//         },
//         yaxis: {
//           range: [0, 150], 
//           title: {
//             text: 'Distance (In)' 
//          }
//         },
//         title:'Broad Jump'
//       };
      
//       Plotly.plot('broad_jump_in', data4, layout4);
//   }

  function buildCharts(data) {
  
    d3.json(`/overview`).then((data) => {
        // console.log(data);
        // fortyYard Chart
        overViewChart(data);
        // Bench Press Chart
        // benchPressChart(data);
        // // Vert Leap In Chart
        // vertLeapinChart(data);
        // // Broad Jump In Chart
        // broadJumpinChart(data)

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
//       buildPosdata(firstSample);
    });
  }
  
  function optionChanged(newPos) {
    // Fetch new data each time a new position is selected
    buildCharts(newPos);
    // buildPosdata(newPos);
  }
  
  // Initialize the dashboard
  init();

