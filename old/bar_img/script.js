const locale = {
  decimal: ',',
  thousands: '.',
  grouping: [3],
};
d3.formatDefaultLocale(locale);

// Function to update the chart based on the selected domicilio_barrio
function updateChart(domicilio_barrio) {
  d3.csv('merged.csv', d3.autoType).then((data) => {
    data = data.filter((d) => {
      return d.domicilio_barrio == domicilio_barrio;
    });

    // make a filter for the data to get the total count of each domicilio_barrio
    let domicilio_barrioCount = d3. rollup(
      data,
      (v) => v.length,
      (d) => d.domicilio_barrio
    );
    console.log(domicilio_barrioCount.value);


    let chart = Plot.plot({
      marks: [
        Plot.dot(
          data,
          Plot.dodgeY({
            x: (d) => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
            r: 10,
            fill: (d) =>
              d.subcategoria == 'RUIDOS MOLESTOS, EMANACIONES O DERRAMES'
                ? 'orange'
                : 'green',
          }),
        ),
        Plot.image(
          data,
          Plot.dodgeY({
            x: (d) => d3.timeParse('%H:%M:%S')(d.hora_ingreso),
            r: 10,
            src: (d) =>
              d.subcategoria == 'RUIDOS MOLESTOS, EMANACIONES O DERRAMES'
                ? './iconmonstr-audio-5.svg'
                : './rat.svg',
          }),
        ),
      ],
      x: {
        grid: true,
        tickFormat: d3.timeFormat('%H'),
        label: 'horas',
      },
      width: 600,
      height: 800,
    });

    // Remove the previous chart before appending the new one
    d3.select('#chart').selectAll('*').remove();
    d3.select('#chart').append(() => chart);
  });
}

// Initialize the chart with the default domicilio_barrio
updateChart('Parque Avellaneda');

// Add an event listener to update the chart when the domicilio_barrio selection changes
document.getElementById('domicilio-barrio-select').addEventListener('change', (event) => {
  updateChart(event.target.value);
});