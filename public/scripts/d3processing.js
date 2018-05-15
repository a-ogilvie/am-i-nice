function drawGraph(sentimentality) {
  const width = 360;
  const height = 360;
  const radius = Math.min(width, height) / 2;
  const donutWidth = 75;
  const legendRectSize = 18;
  const legendSpacing = 4;

  const positiveColour = "#008000";
  const neutralColour = "#C0C0C0";
  const negativeColour = "#FF0000";

  const colour = d3
    .scaleOrdinal()
    .range([positiveColour, neutralColour, negativeColour]);

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
    .attr("fill", (d) => colour(d.data.label));

  const legend = svg
    .selectAll(".legend")
    .data(colour.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => {
      const height = legendRectSize + legendSpacing;
      const offset = height * colour.domain().length / 2;
      const horizontal = -2 * legendRectSize;
      const vertical = i * height - offset;
      return `translate(${horizontal},${vertical})`;
    });

  legend
    .append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .style("fill", colour)
    .style("stroke", colour);

  legend
    .append("text")
    .attr("x", legendRectSize + legendSpacing)
    .attr("y", legendRectSize - legendSpacing)
    .text((d) => d);
}
