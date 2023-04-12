// config. fecha español
// d3.json('https://cdn.jsdelivr.net/npm/d3-time-format@3/locale/es-ES.json').then(locale => {
//   d3.timeFormatDefaultLocale(locale)
// })

d3.csv('merged.csv', d3.autoType).then(data => {
  console.table(data)
  console.log(
    'lon max (x):',
    d3.max(data, d => d['lon']),
  )
  console.log(
    'lon min (x):',
    d3.min(data, d => d['lon']),
  )
  console.log(
    'lat max (x):',
    d3.max(data, d => d['lat']),
  )
  console.log(
    'lat min (x):',
    d3.min(data, d => d['lat']),
  )
  // Guardamos el svg generado en la variable chart
  let chart = Plot.plot({
    width: 600,
    height: 600,
    marks: [
      Plot.dot(data, {
        x: d => d['lon'],
        y: d => d['lat'],
        title: d => d['lon'] + ', ' + d['lan'],
        // fill: 'domicilio_comuna',
        strokeOpacity: 0.5,
      }),
    ],
    x: {
      label: 'Longitud'
    },
    y: {
      label: 'Latitud'
    },
  })
  // Agregamos chart al div#chart de index.html
  d3.select('#chart').append(() => chart)
})
