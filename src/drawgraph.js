import { select } from 'd3-selection';
import { axisLeft, axisBottom } from 'd3-axis';
import { scaleLinear, scaleOrdinal, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import constants from './constants';

export function drawGraph(data, title, response) {
  const loader = select(".loader").attr('style', 'display: none');
  const svg = select("svg");
  const nav = select('nav');
  select('h1').text(title);

  nav.selectAll('*').remove();
  nav.append('ul')
      .attr('class','nav-items')
    .selectAll('li')
    .data(constants.GRAPHS)
    .enter().append('li')
        .attr('class', 'nav-item')
      .append('button')
        .on('click', (d) => {
          loader.attr('style', 'display: block');
          svg.selectAll('*').remove();
          select('h1').text(d.title);
          setTimeout(() => {
            const data = d.function(response);
            drawGraph(data, d.title, response);
          }, 10);
        })
        .text(d => d.title);

  const margin = {top: 20, right: 20, bottom: 30, left: 40};
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;
  const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x0 = scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

  const x1 = scaleBand()
      .padding(0.05);

  const y = scaleLinear()
      .rangeRound([height, 0]);

  const z = scaleOrdinal()
      .range(constants.COLOURS);

  const keys = data.keys;
  const columns = data.columns;
  const d3Data = data.data;

  x0.domain(columns);
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, max(d3Data, d => max(keys, key => d[key]))]).nice();

  g.append("g")
    .selectAll("g")
    .data(d3Data)
    .enter().append("g")
      .attr("transform", (d) => { 
        return "translate(" + x0(d.column) + ",0)"; 
      })
    .selectAll("rect")
    .data(d => keys.map(key => ({key, count: d[key]})))
    .enter().append("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.count))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - y(d.count))
      .attr("fill", d => z(d.key));

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x0));

  g.append("g")
      .attr("class", "axis")
      .call(axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Sales");

  const legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice())
    .enter().append("g")
      .attr("transform", (d, i) => "translate(0," + i * 20 + ")");

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(d => d);
};