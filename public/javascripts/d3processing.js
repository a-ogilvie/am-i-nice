function drawGraph(sentimentality) {
  const width = 360;
  const height = 360;
  const radius = Math.min(width, height) / 2;
  const donutWidth = 75;

  const svg = d3
    .select("#result")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const arc = d3
    .arc()
    .innerRadius(radius - donutWidth)
    .outerRadius(radius);

  const pie = d3
    .pie()
    .value((d) => d.count)
    .sort(null);

  const path = svg
    .selectAll("path")
    .data(pie(sentimentality))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => {
      console.log(d);
      return d.data.colour;
    });
}
