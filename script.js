d3.csv("astronautas.csv", d3.autoType).then((data) => {
  console.log(data);

  data = data.filter((d) =>
    [
      "U.S.S.R/Rusia",
      "EE.UU.",
      "Japon",
      "Italia",
      "Alemania",
      "Canada",
      "Reino Unido",
      "Francia",
    ].includes(d["nacionalidad"])
  );

  let chart = Plot.plot({
    marks: [
      Plot.barY(
        data,
        Plot.groupX(
          { y: "sum" },
          {
            x: "nacionalidad",
            y: "mision_hs",
            fill: (d) =>
              d.ocupacion == "ingeniero aeroespacial" ? "red" : "grey",

            fillOpacity: 0.8,
            title: (d) => `${d.ocupacion}`,
            sort: { x: "y", reverse: true },
            // filter: (d) => d["nacionalidad"] > "EE.UU.",
          }
        )
      ),
      
    ],
    style: {
      "font-size": "14px",
      "font-family": "Supreme",
    },
    grid: true,
    line: true,
    zero: true,
    nice: true,
    width: 1200,
    height: 500,
    marginLeft: 100,
    marginBottom: 80,
    marginTop: 40,
    style: {
      "background-color": "black",
      color: "white",
      "font-family": "Supreme",
      "font-size": "14px",
      "margin-top": "30px",
      "margin-right": "50px",
    },
    color: {
      legend: true,
      style: {
        "font-size": "14px",
        "font-family": "Supreme",
        color: "white",
      },
    },
    x: {
      round: true,
      label: "Nacionalidad",
      tickRotate: 0,
      
    },
    y: { ticks: 5,
      label: "Horas en mision" ,tickFormat:d3.format('~s')},
  });

  d3.select("#chart").append(() => chart);
});
