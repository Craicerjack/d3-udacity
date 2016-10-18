var svg = d3.select('#draw')
            .append('svg')
            .attr('width', 600)
            .attr('height', 300);

var yAxis = d3.scale.linear()
                    .domain([15,90])
                    .range([250, 0]);

var xAxis = d3.scale.log()
                    .domain([250, 100000])
                    .range([0, 600]);

var rad = d3.scale.sqrt()
                    .domain([52070, 1380000000])
                    .range([10,40]);

svg.append('circle').attr('cx', xAxis(13330))
                    .attr('cy', yAxis(77))
                    .attr('r', rad(1380000000))
                    .style('fill', 'red')


