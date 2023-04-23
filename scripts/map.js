const mapaFetch = d3.json('../data/barrios-caba.geojson')
const dataFetch = d3.csv('../data/map_ratas_normalized.csv', d3.autoType)

Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {

  /* A cada feature del mapa le agregamos la prop DENUNCIAS */
  barrios.features.forEach(feature => {
    let nombreBarrio = feature.properties.BARRIO
    console.log('nombreBarrio', nombreBarrio)
    let cantReclamos =  data.find((d)=> d.domicilio_barrio == nombreBarrio)
    let ratioReclamos = data.find((d)=> d.domicilio_barrio == nombreBarrio)
    // d.properties.DENUNCIAS = cantReclamos.counts
    feature.properties.COUNTS = cantReclamos.counts
    feature.properties.RATIO = ratioReclamos.ratio

    console.log(nombreBarrio + ': ' + cantReclamos)
  })


  /* Mapa Coroplético */

  let chartMap = addTooltips(Plot.plot({
    // https://github.com/observablehq/plot#projection-options
    projection: {
      type: 'mercator',
      domain: barrios, // Objeto GeoJson a encuadrar
    },
    color: {
      // Use a custom color scale with red colors and different gradients
      type: 'linear',
      domain: [0, d3.max(barrios.features, d => d.properties.RATIO)],
      range: ['#ffffff', "blue"],
      label: 'Cantidad de denuncias por cada mil personas',
      legend: true,
      color: 'black',
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => d.properties.RATIO,
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
          filter: (d) => d.properties.RATIO > 2
        })
      )
    ],
    style: {
      fontFamily: 'Supreme',
      background: '#ffffff00',
      color: '#0e0e0e',
    }
  }),
    hover_styles = {
      fill: 'rgba(0, 50, 255, 0.700)',
      stroke: 'black',
  },
  )

   /* Agregamos al DOM la visualización chartMap */
   d3.select(".plot-1be9c9ca248f2")
  .style("background-color", "transparent");
   d3.select('#chart3').append(() => chartMap)
})
