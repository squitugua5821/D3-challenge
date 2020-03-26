
var margin = {top: 20,
    right: 20,
    bottom: 100,
    left: 100
};



var width = 800 - margin.left - margin.right;

var height = 500 - margin.top - margin.bottom;

var xScale = d3.scaleLinear().range([0, width]);

var yScale = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(xScale);

var yAxis = d3.axisLeft(yScale);

var svg = d3.select(".chart")

    .append("div")

    .classed("svg-container", true) 

    .append("svg")

    .attr("preserveAspectRatio", "xMidYMid")

    .attr("viewBox", "0 0 800 600")

    .classed("svg-content-responsive", true)

    .attr("style", "background: WhiteSmoke")

    .append("g")

    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

svg.append("text")

    .attr("class", "axis-text active")

    .attr("id", "x")

    .attr("x", width/2 -50)

    .attr("y", height + 35)

    .attr("style", "font-weight:bold")

    .attr("data-axis-name", "Divorced_total_2014")

    .text("Divorced rate (%)");

svg.append("text")

    .attr("class", "axis-text")

    .attr("id", "x")

    .attr("x", width/2 -50)

    .attr("y", height + 55)

    .attr("style", "font-weight:bold")

    .attr("data-axis-name", "Poverty_rate")

    .text("Poverty rate (%)");

svg.append("text")

    .attr("class", "axis-text")

    .attr("id", "x")

    .attr("x", width/2 -50)

    .attr("y", height + 75)

    .attr("style", "font-weight:bold")

    .attr("data-axis-name", "Unemployment_rate")

    .text("Unemployment rate (%)");

svg.append("text")

    .attr("class", "axis-text active")

    .attr("id", "y")

    .attr("transform", "rotate(-90)")

    .attr("x", -height/2 - 50)

    .attr("y", -40)

    .attr("dy", ".71em")

    .attr("style", "font-weight:bold")

    .attr("data-axis-name", "Depression_total_2014")

    .text("Depression rate (%)");

svg.append("text")

    .attr("class", "axis-text")

    .attr("id", "y")

    .attr("transform", "rotate(-90)")

    .attr("x", -height/2 - 50)

    .attr("y", -60)

    .attr("dy", ".71em")

    .attr("style", "font-weight:bold")

    .attr("data-axis-name", "heart_attack_rate")

    .text("Heart attack rate (%)");

svg.append("text")

    .attr("class", "axis-text")

    .attr("id", "y")

    .attr("transform", "rotate(-90)")

    .attr("x", -height/2 - 110)

    .attr("y", -80)

    .attr("dy", ".71em")

    .attr("style", "font-weight:bold")

    .attr("data-axis-name", "Dr_visit_within_last_year")

    .text("% who visited doctor within the last year");


d3.csv("data/data.csv").get(function(data) {

    console.log(data);

});


    data.forEach(function(d) {

        d.Divorced_total_2014 = +d.Divorced_total_2014;

        d.Depression_total_2014 = +d.Depression_total_2014;

        d.Poverty_rate = +d.Poverty_rate;

        d.heart_attack_rate = +d.heart_attack_rate;

        d.Unemployment_rate = +d.Unemployment_rate;

        d.Dr_visit_within_last_year = +d.Dr_visit_within_last_year;

    });

    var tip = d3-tip()

        .attr('class', 'd3-tip')

        .offset([120, 10])

        .html(function(d) { 

            return d; 

        });

        svg.call(tip); 


    var activeX = d3

        .select("#x")

        .filter(".active").attr("data-axis-name");

    var activeY = d3

        .select("#y")

        .filter(".active").attr("data-axis-name");



    console.log("activeX: " + activeX + "; activeY: " + activeY);

    plot_data(activeX, activeY);

    var allX = d3.selectAll("#x");

    var allY = d3.selectAll("#y");



    change_active_x(allX);

    change_active_y(allY);

    function change_active_x(textLabels){

        textLabels.on("click", function(event){

            var clicked = d3.select(this)

            var currentActive = textLabels.filter(".active")

            clicked.attr("class", "axis-text active");

            currentActive.attr("class", "axis-text");



            activeX = clicked.attr("data-axis-name");

            plot_data(activeX, activeY);

        });

    }


    function change_active_y(textLabels){

        textLabels.on("click", function(event){

            var clicked = d3.select(this)

            var currentActive = textLabels.filter(".active")

            clicked.attr("class", "axis-text active");

            currentActive.attr("class", "axis-text")

            activeY = clicked.attr("data-axis-name");

            plot_data(activeX, activeY);

        });

    }


    function plot_data(x_data, y_data) {


        xScale.domain(d3.extent(data, function(d) {

            return d[x_data];

        }));

        yScale.domain(d3.extent(data, function(d){

            return d[y_data];

        }));


        if (d3.select(".dot").empty() == true){

            svg.append("g")

            .attr("class", "xaxis")

            .attr("transform", "translate(0," + height + ")")

            .call(xAxis);



            svg.append("g")

            .attr("class", "yaxis")

            .call(yAxis);

            svg.selectAll(".dot")

                .data(data)

                .enter().append("circle")

                .attr("class", "dot")

                .attr("r", 10)

                .attr("cx", function(d){

                    return xScale(d[x_data]);

                })

                .attr("cy", function(d){

                    return yScale(d[y_data])

                })

                .attr("fill", "red")

                .style("opacity", 0.5);

            var text = svg.selectAll("dot")

                .data(data)

                .enter()

                .append("text");



            var textLabels = text

                .attr("class", "label")

                .attr("x", function(d){

                    return xScale(d[x_data])-8;

                })

                .attr("y", function(d){

                    return yScale(d[y_data])+4;

                })

                .text(function(d){

                    console.log(d.State);

                    return d.State;

                })

                .style("font-size", "10px")

                .style("font-weight", "bold")

                .style("font-family", "verdana")

                .style("opacity", 0.6)

                .on('mouseover', handleMouseOver)

                .on('mouseout', tip.hide);
        }
        else { 

            xScale.domain(d3.extent(data, function(d) {

                return d[x_data];

            }));

            yScale.domain(d3.extent(data, function(d){

                return d[y_data];

            }));

            svg.select(".xaxis")

                .transition()

                .call(xAxis);

            svg.select(".yaxis")

                .transition()

                .call(yAxis);

            svg.selectAll(".dot")

                .transition()

                .attr("cx", function(d){

                    return xScale(d[x_data]);

                })

                .attr("cy", function(d){

                    return yScale(d[y_data])

                });


            svg.selectAll(".label")

                .transition()

                .attr("x", function(d){

                    return xScale(d[x_data])-8;

                })

                .attr("y", function(d){

                    return yScale(d[y_data])+4;

                })

                .text(function(d){

                    console.log(d.State);

                    return d.State;

                })


            svg.selectAll(".label")

            .on('mouseover', handleMouseOver);

        } 

        function handleMouseOver(d){

            tip.show(d.State + "<hr>" + 

                "X" + ": " + d[x_data] 

                + ", <br>" + "Y" + ": " + d[y_data]);

        }

        

    } 




        ;