// set margins and dimensions for the scatter plot
var margin = {
    top: 30,
    left: 100,
    right: 40,
    bottom: 80},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append svg object
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// call in the csv data
d3.csv("data.csv").then(function(csvdata) {
    console.log("csvdata", csvdata);

    csvdata.forEach(function(statedata){
        statedata.poverty =+ statedata.poverty;
        statedata.obesity =+ statedata.obesity;
    })

    // add axes
    var x = d3.scaleLinear().domain([21, d3.max(csvdata, d => d.obesity + 2 )]).range([height, 0]);
    var y = d3.scaleLinear().domain([7, d3.max(csvdata, d => d.poverty + 4 )]).range([height, 0]);

// set svg groups
// set y axis on left
    svg
        .append("g")
        .call(d3.axisLeft(y));

    svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y",0 - margin.left + 50)
        .attr("x", 0 - (height / 2))
        .text("Poverty %");

// set x axis on bottom
    svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .text("Obesity %");

// setting circles on graph
    svg
        .selectAll("null")
        .data(csvdata)
        .enter()
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", d => x(d.obesity))
        .attr("cy", d => y(d.poverty))
        .attr("r", "10");

    svg
        .selectAll()
        .data(csvdata)
        .enter()
        .append("text")
        .transition()  
        .text(function (d) {
            return d.abbr;
        })
        .attr("x", function (d) {
                return x(d.obesity);
            })
        .attr("y", function (d) {
            return y(d.poverty) + 3
        })
        .attr("font-size", "10px")
        .attr("class", "stateText")
        .attr("opacity", "1");
        });
