function drawGraph(sentimentality) {
  const width = 360;
  const height = 360;
  const radius = Math.min(width, height) / 2;

  const colour = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3
    .select("#result")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const arc = d3
    .arc()
    .innerRadius(0)
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
    .attr("fill", (d, i) => colour(d.data.label));
}
