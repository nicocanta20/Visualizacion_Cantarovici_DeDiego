function createChart() {
  //initialize margin start
  var margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    tooltip = { width: 100, height: 100, x: 10, y: -30 };
  //initialize margin end

  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var pie = d3.pie()
    .sort(null)
    .value(d => d.counts);

  var arc = d3.arc()
    .innerRadius(Math.min(width, height) / 2 - 100)
    .outerRadius(Math.min(width, height) / 2 - 1)
    .cornerRadius(10);

  var arcLabel = function () {
    const radius = Math.min(width, height) / 2 * 0.8;
    return d3.arc().innerRadius(radius).outerRadius(radius);
  }

  // Load the data
  d3.csv("../data/rata_clean.csv").then(function (data) {
    // Process the data with an alternative rollup function
    let domicilio_barrioCount = d3.group(data, d => d.domicilio_barrio);
    let counts = Array.from(domicilio_barrioCount, ([key, value]) => ({ key, counts: d3.sum(value, d => parseInt(d.counts)) }));

    var color = d3.scaleOrdinal()
      .domain(counts.map(d => d.key))
      .range(d3.quantize(t => d3.interpolateTurbo(t * 0.8 + 0.1), counts.length).reverse())
      // .range(["#AFEEEE", "#00FFFF", "#00CED1", "#ADD8E6", "#87CEFA", "#6495ED", "#1E90FF", "#008080", "#006400", "#2E8B57", "#008000", "#003366"]);

    const arcs = pie(counts);

    svg.append("g")
      .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .enter().append("path")
      .attr("fill", d => color(d.data.key))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.key}: ${d.data.counts.toLocaleString()}`);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .enter().append("text")
      .attr("transform", d => `translate(${arcLabel().centroid(d)})`)
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.key))
      .call(text => text.append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.counts.toLocaleString() ));
  }).catch(function (error) {
    console.log(error);
  });
}

// Call the createChart function
createChart();