d3.csv('../data/ranking_barrios.csv', d3.autoType).then(data => {

  const data2 = []
  const monthData = ['','1 - Enero','2 - Febrero','3 - Marzo','4 - Abril','5 - Mayo']
  // Iterate over the data object
  for (barrio of data) {
    // Iterate over the months
    for (let i = 1; i <= 5; i++) {
      // Add barrio, month, and count to the data2 array
      data2.push({
        barrio: barrio.domicilio_barrio,
        month: monthData[i],
        count: Number(barrio[Object.keys(barrio)[i]])
      })
    }
  }

  // Plot the data
  // X axis: month
  // Y axis: quantity of barrios
  // Color: domicilio_barrio
  // On hover, the title of each line is the domicilio_barrio
  let chart = Plot.plot({
    marks: [
      Plot.line(data2, {
        x: 'month',
        y: 'count',
        stroke: 'barrio',
        title: 'barrio',
        strokeWidth: 5,
      }), 
      Plot.dot(data2, {
        x: 'month',
        y: 'count',
        stroke: 'barrio',
        fill: 'barrio',
        size: 10,
        title: 'barrio'
      }),
    ],
    line:true,
    x: {
      label: '',

    },
    y: {
      label: 'Cantidad por Barrios',
    },
    color: {
      scheme: 'category10',
      // range: ["#ADD8E6", "#00BFFF", "#008080", "#006400", "#003366"],
      type: 'categorical',
      legend: true,

    
      
    },
    style: {
      fontFamily: 'Supreme',
      fontSize:20,
      background: '#ffffff00',
      color: '#0e0e0e',
  
      
    },
    height: 600,
    width: 1200,
    fontSize: 20,
    marginBottom: 70,
  },
    {
      stroke: '#0e0e0e',
      strokeWidth: 10,
    }
  );

  // Apply the hover effect to the lines
  d3.select(chart)
    .selectAll("path")
    .on("pointerenter", function () {
      d3.select(chart).selectAll("path").attr("opacity", 0.2);
      d3.select(this).attr("opacity", 1);
    });
  d3.select(chart).on("pointerleave", function () {
    d3.select(chart).selectAll("path").attr("opacity", 1);
  });


  d3.select('#chart2').append(() => chart)

});
