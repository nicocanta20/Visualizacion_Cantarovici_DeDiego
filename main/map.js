const mapaFetch = d3.json('../map/barrios-caba.geojson')
const dataFetch = d3.csv('../testing/rata_clean_total.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(feature => {
    let nombreBarrio = feature.properties.BARRIO
    console.log('nombreBarrio', nombreBarrio)
    let cantReclamos =  data.find((d)=> d.domicilio_barrio == nombreBarrio)
    // d.properties.DENUNCIAS = cantReclamos.counts
    feature.properties.COUNTS = cantReclamos.counts

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


  /* Mapa Coroplético */
  let chartMap = Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Use a custom color scale with red colors and different gradients
      type: 'linear',
      domain: [0, d3.max(barrios.features, d => d.properties.COUNTS)],
      range: ['#ffffff', '#e32929'],
      label: 'Cantidad de denuncias',
      legend: true,
      background: '#transparent',
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.COUNTS,
        stroke: 'gray',
        title: d => `${d.properties.BARRIO}\n${d.properties.COUNTS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          fill: "currentColor",
          stroke: "white",
          textAnchor: "center",
          dx: 4,
          filter: (d) => d.properties.COUNTS > 80
        })
      )
    ],
    style: {
      fontFamily: 'Supreme',
      background: '#ffffff00',
      color: '#0e0e0e',
      
    }
  })


   /* Agregamos al DOM la visualización chartMap */
   d3.select('#chart3').append(() => chartMap)
})
