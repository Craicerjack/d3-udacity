////////////////////////////////////
// horizontal bar chart
////////////////////////////////////
var data = [4,8,15,16,23,42], 
    width = 420, 
    barHeight = 20;


var x = d3.scale.linear()
                .domain([0, d3.max(data)])
                .range([0, width]);

var chart = d3.select(".chart1")
                .attr("width", width)
                .attr("height", barHeight * data.length)
                .style('padding', '1em');

var bar = chart.selectAll("g")
                .data(data)
            .enter().append("g")
                .attr('transform', function(d, i) { return "translate(0," + i * barHeight + ")"; })

bar.append("rect")
    .attr('width', x)
    .attr('height', barHeight-1);

bar.append("text")
    .attr('x', function(d) { return x(d) - 3; })
    .attr('y', barHeight/2)
    .attr('dy', ".35em")
    .text(function(d) { return d; });


////////////////////////////////////
// column chart
////////////////////////////////////
var margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
}
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var xax = d3.scale.ordinal().rangeRoundBands([0, width], .1);
var yax = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(xax).orient('bottom');
var yAxis = d3.svg.axis().scale(yax).orient('left').ticks(10, '%');

var chart = d3.select('.chart2')    
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

function drawChart(error, data) {
    xax.domain(data.map(function(d) { return d.name; }));
    yax.domain([ 0, d3.max(data, function(d) { return d.value; }) ]);

    //////////////////////////////////////////
    // chart part 2 https://bost.ocks.org/mike/bar/2/
    //////////////////////////////////////////
    // var bar = chart.selectAll('g')
    //                 .data(data)
    //             .enter().append('g')
    //                 //.attr('transform', function(d, i) { return 'translate(' + i * barWidth + ', 0)'; });
    //                 .attr('transform', function(d) { return 'translate(' + xax(d.name) + ', 0)'; });

    // bar.append('rect')
    //     .attr('y', function(d) { return yax(d.value); })
    //     .attr('height', function(d) { return height - yax(d.value); })
    //     .attr('width', xax.rangeBand());

    // bar.append('text')
    //     .attr('x', xax.rangeBand()  )
    //     .attr('y', function(d) { return yax(d.value) + 5; })
    //     .attr('dy', '.75em')
    //     .text(function(d) { return d.value; });

    chart.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0, ' + height + ')')
            .call(xAxis);

    chart.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
        .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Frequency');

    chart.selectAll('.bar')
            .data(data)
        .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', function(d) { return xax(d.name); })
            .attr('y', function(d) { return yax(d.value); })
            .attr('height', function(d) { return height - yax(d.value); })
            .attr('width', xax.rangeBand());
}

function type(d) {
    d.value = +d.value; //coerce to number
    return d;
}


d3.tsv("data/columnData.tsv", type, drawChart);

