
  
  function plotBarrios(dataPromise, divId) {
    dataPromise.then(data => {
  
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
            title: 'barrio'
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
        x: {
          label: 'Month',
          order: monthData.slice(1),
        },
        y: {
          label: 'Quantity of Barrios',
        },
        color: {
          scheme: 'blues',
          type: 'categorical',
          legend: true,
        },
        style: {
          fontFamily: 'Supreme',
          fontSize: 10,
          background: '#ffffff00',
          color: '#0e0e0e',
          padding: '50px',
          width: '86.5%',
        },
      },
        {
          stroke: '#0e0e0e',
        }
      );
  
      d3.select(divId).append(() => chart)
    })
  }