import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ViewEncapsulation
} from '@angular/core';

import * as d3 from 'd3';

import * as moment from 'moment';

@Component({
  selector: 'app-charts',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() chartData;
  @ViewChild('container') element: ElementRef;

  private margin; host; htmlElement; legend
  private width;
  private height;
  private line; chart; gx; gy; gyr
  private mouseG; mousePerLine; lines; mouse; data



  constructor() { }

  ngOnInit() {

    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.htmlElement)


    var parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");
    this.chartData.map(prvi => {
      prvi.values.map(drugi => {
        drugi.date = parseDate(drugi.date)
      })
    })

    this.margin = {
      top: 20,
      right: 50,
      bottom: 100,
      left: 50
    };

    this.width = 1200 - this.margin.left - this.margin.right,
      this.height = this.width * 0.66 - this.margin.top - this.margin.bottom;

    var barRawWidth = this.width / (this.chartData[0].values.length + 2);
    var barPadding = 1,

      barWidth = barRawWidth - (barPadding * 2)


    var minDate = this.chartData[0].values[0].date,
      maxDate = this.chartData[0].values[this.chartData[0].values.length - 1].date,
      maxYLeft = +d3.max(this.chartData.map((chart: any) => {
        return d3.max(chart.values.map((value: any) => value.temperature))
      })),
      minYLeft = +d3.min(this.chartData.map((chart: any) => {
        return d3.min(chart.values.map((value: any) => value.temperature))
      })),

      minYRight = + d3.min(this.chartData[0].values.map(d => d.temperature)),

      maxYRight = + d3.max(this.chartData[0].values.map(d => d.temperature)),

      k = maxYLeft / maxYRight,
      //Math.abs(maxYRight - maxYLeft)/Math.abs(minYRight-minYLeft),

      n = minYRight;

    var zoom = d3.zoom()
      .scaleExtent([1, 15])
      .translateExtent([[this.margin.left, this.margin.top], [this.width - this.margin.right, this.height]])
      .extent([[this.margin.left, this.margin.top], [this.width - this.margin.right, this.height]])
      .on("zoom", zoomed)




    var x = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([this.margin.left, this.width - this.margin.right])

    var y = d3.scaleLinear()
      .domain([0.9 * minYLeft, 1.1 * maxYLeft])
      .range([this.height, 0]);

    var y2 = d3.scaleLinear()
      .domain([0.9 * minYRight, 1.1 * maxYRight])
      .range([this.height, 0])


    var svg = d3.select('body')
      .append("svg")
      .call(zoom)
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)

      /*     .call( d3.zoom().on('zoom', () =>{
            svg.attr('transform', d3.event.transform)
          })) */
      .append('g')

      .attr("transform", "translate(" + this.margin.left + ", " + this.margin.top + ")")



    svg.append('clipPath')
      .attr("id", "clip")
      .append("rect")
      .attr("x", this.margin.left)
      .attr("y", 0)
      .attr("width", this.width - (2 * this.margin.right))
      .attr("height", this.height);

    var clipping = svg.append("g")
      .attr("clip-path", "url(#clip)");

    var xAxis = d3.axisBottom(x)
      .tickFormat(d3.timeFormat("%d.%b-%H:%M"))

    var yAxis = d3.axisLeft(y)

    var yAxisRight = d3.axisRight(y2)

    //.ticks(20);

    this.gx = svg.append('g')
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(xAxis)
      .selectAll("text")


    this.gy = svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + this.margin.left + ", 0 )")
      .call(yAxis)
      .append("text")
      .text("Vrednosti")
      .style("text-anchor", "end")
      .style("font-size", '20px')
      .attr("y", 0 - (this.height / 2))
      .attr('x', 0)
      .attr('dy', '-.1em')
      .attr("transform", "rotate(-90)")

    this.gyr = svg.append("g")
      .attr("class", "y2 axis")
      .attr("transform", "translate(" + (this.width - this.margin.right) + ", 0 )")
      .call(yAxisRight)
      .append("text")
      .text("Vrednosti 2")
      .attr('dx', '.2em')
      .style("text-anchor", "start")
      .style("font-size", '20px')
      .attr("y", 0 - (this.height / 2))
      .attr('x', 0)
      .attr('dy', '-.1em')
      .attr("transform", "rotate(-90)")



    //LINE CHART
    this.line = d3.line()
      .x((d: any) => {
        return x(d.date);
      })
      .y((d: any) => {
        return y2(d.temperature);
      });



    //uredimo array, da je bar graf prvi( id ==3)
    this.chartData.sort( (id1, id2) => {return (id1.name.graph_type.id > id2.name.graph_type.id) ? 1 : ((id1.name.graph_type.id < id2.name.graph_type.id) ? -1 : 0) })
    
    this.chartData.reverse().forEach((element, i) => {
      if (element.name.graph_type.id === 3) {
        var bar = clipping.selectAll("bar")
          .data(element.values)
          .enter().append("rect")
          .attr('class', 'charts')
          //animacija
          .attr("height", 0)
          .attr('y', this.height)
          /*             .transition().duration(10) //trajanje
                      .delay((d, i) => { return i * 10 }) */
          .style("fill", '#' + this.chartData[i].name.color.description)
          .attr("x", (d: any) => {
            return (x(d.date) - (barWidth)/2);
          })
          .attr("width", barWidth)
          .attr("y", (d: any) => { return y(d.temperature); })
          .attr("height", (d: any) => { return this.height - y(d.temperature); })
          .attr('class', 'barChart')

      }
      else if (element.name.graph_type.id === 2) {
        var dot = clipping.selectAll('dot')
          .data(element.values)
          .enter().append('circle')
          .attr('class', 'charts')
          /*             .transition().duration(10) //trajanje
                      .delay((d, i) => { return i * 10 })
                       */
          .attr('r', 2.5)
          .attr('cx', (d: any) => {
            return x(d.date)
          })
          .attr('cy', (d: any) => {
            return y(d.temperature)
          })
          .style('fill', '#' + this.chartData[i].name.color.description)
          .attr('class', 'dotChart')
      }
      else if (element.name.graph_type.id === 1) {
        //Nariše linijski graf
        clipping.selectAll(".line-chart")
          .data(this.chartData)
          .enter().append('path')
          .attr('class', 'charts')
          .attr('class', 'line')
          .attr('d', (d: any) => {
            if (d.name.graph_type.id === 1) {
              return this.line(d.values)
            }
          }
          )
          .style('stroke', (d: any) => {
            return d.name.color.description
          })
      }
    })


    this.mouseG = clipping.append('g')
      .attr('class', 'mouse-over-effects');

    //navpična črta
    this.mouseG.append('path')
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "3px")
      .style("opacity", "0");

    this.lines = document.getElementsByClassName('line');

    this.mousePerLine = this.mouseG.selectAll('.mouse-per-line')
      .data(this.chartData)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    this.mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", (d: any) => {
        return d.name.color.description;
      })
      .style("fill", "none")
      .style("stroke-width", "3px")
      .style("opacity", "0");

    this.mousePerLine.append('text')
      .attr("transform", "translate(0,30)")




    this.mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', this.width) // can't catch mouse events on a g element
      .attr('height', this.height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', () => { // on mouse out hide line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      })
      .on('mouseover', () => { // on mouse in show line, circles and text
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      })
      .on('mousemove', function (d) { // mouse moving over canvas
        //this.mouse = d3.mouse(this);
      d3.selectAll(".mouse-per-line")
          .attr("transform", (d: any, i) => {

            var xDate = x.invert(d3.mouse(this)[0]);
            var datumi = d.values.map(pod => { return pod.date })
            //  var temp = d.values.map(pod => { return pod.temperature })
            i = 0
            while (!(datumi[i] < xDate)) {
              if (i > datumi.length - 1) { break }
              i++
            }


            //var  bisect = d3.bisector( ( d: any) => {return d.date; }).left;
            //d = d.map( da => { return da.date})

            //to i => index is not out of range
            if (i >= d.values.length) { i = d.values.length - 1 }
            var idx = i;
            let parse2 = d3.timeFormat("%H:%M")
            d3.selectAll('.mouse-per-line text')
              .attr("transform", "translate(0,-20)")
              .text((d: any) => {

                return 'Vrednost: ' + d.values[i].temperature + ', ura: ' + parse2(d.values[i].date)
              })

            d3.select(".mouse-line")
              .style("stroke-width", "0.5px")
              .attr("d", () => {

                this.data = "M" + x(datumi[i]) + "," + visina;
                this.data += " " + x(datumi[i]) + "," + 0;
                return this.data;
              });
            if (d.name.graph_type.id === 1) {
              return "translate(" + x(d.values[i].date) + "," + y2(d.values[i].temperature) + ")";
            }
            return "translate(" + x(d.values[i].date) + "," + y(d.values[i].temperature) + ")";

          });


      }

      )

    var visina = this.height,
        top = this.margin.top,
        sirina = this.width,
        left = this.margin.left
    var chartData = this.chartData;
  //console.log(chartData)
    var miska = this.mouse;
    var bisektor = d3.bisector((d: any) => { return d.date }).right

    function zoomed(): void {


      var t = d3.event.transform
      var xt = t.rescaleX(x),
        yt = d3.scaleLinear(),
        yt2 = d3.scaleLinear();
      //vrne prvo vrednost skale

//console.log(chartData)
      var i1 = 0, i2 = chartData[0].values.length - 1;
      while (chartData[0].values[i1].date > xt.domain()[0]) {
          i1++;
       // console.log('i1 --->')
     //   console.log(i1, chartData[0].values[i1])
        if (i1 > chartData[0].values.length-1) { break }
      }
      while (!(chartData[0].values[i2].date > xt.domain()[1])) {
        i2--;
        if (i2 === 0) {i2=1; break }
      }



      var chartData1 = chartData.map( oneData => { 
        return{
        name: oneData.name,
        values: oneData.values.slice(i1,i2)
      }
      })

      var vrednosti = chartData1.map(chart => { return chart.values.map(v => { return v.temperature }) })

      //dobi maksimalen in minimalen y v tistem okencu
      var yMax = +d3.max(vrednosti.map(d => {
        return d3.max(d)
      })),
      yMin = + d3.min(vrednosti.map(d => {
        return d3.min(d)
      }))
      
      n = (minYLeft*maxYRight + minYRight*maxYLeft)/ (maxYLeft - minYLeft)

      k = (maxYRight- n)/maxYLeft


      yt.domain([0.9*yMin,1.1* yMax]).range([visina, 0])
      yt2.domain([yt.domain()[0]*k+n, yt.domain()[1]*k+n]).range([visina, 0])
      d3.selectAll('.x').call(xAxis.scale(xt));
      d3.selectAll('.y').call(yAxis.scale(yt));

      d3.selectAll('.y2').call(yAxisRight.scale(yt2));

      // console.log(d3.event.sourceEvent.x)
      //console.log(t.invert(x))

      var line2 = d3.line()
        .x((d: any) => { return xt(d.date) })
        .y((d: any) => { return yt2(d.temperature) })
      //še enkrat nariše grafe


      svg.selectAll('.barChart')
        .attr('y', visina)
        /*             .transition().duration(10) //trajanje
                    .delay((d, i) => { return i * 10 }) */
        .attr("x", (d: any) => {
          return (xt(d.date) - (barWidth*t.k )/2);
        })
        .attr("width", barWidth * t.k)
        .attr("y", (d: any) => { return yt(d.temperature); })
        .attr("height",
        (d: any) => {
          if ((visina - yt(d.temperature)) > 0) {
            return visina - yt(d.temperature);
          }
          else { return 0 }
        })

      svg.selectAll('.dotChart')
        .attr('r', 2.5)
        .attr('cx', (d: any) => {
          return xt(d.date)
        })
        .attr('cy', (d: any) => {
          return yt(d.temperature)
        })

      svg.selectAll('.line')
        .attr('d', (d: any) => {
          if (d.name.graph_type.id === 1) {
            return line2(d.values)
          }
        })



      svg.selectAll('.mouse-per-line')
        .data(chartData)
        .enter()
        .append("g")
        .attr("class", "mouse-per-line");

      svg.selectAll('.mouse-per-line')
        .append("circle")
        .attr("r", 7)
        .style("stroke", (d: any) => {
          return d.name.color.description;
        })
        .style("fill", "none")
        .style("stroke-width", "3px")
        .style("opacity", "1")

      svg.selectAll('.mouse-per-line')
        .append('text')
        .attr("transform", "translate(0,30)")


      d3.selectAll('.mouse-over-effects')
      .append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', sirina) // can't catch mouse events on a g element
      .attr('height', visina)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', function premik() {
 // mouse moving over canvas
        d3.selectAll('.mouse-per-line')
        //.data(chartData)
        .attr("transform",(d: any) => {
                      //console.log(d,i)
          
                      var xDate = xt.invert(d3.event.clientX-left);
                      //var datumi = d.values.map(pod => { return pod.date })
                      //  var temp = d.values.map(pod => { return pod.temperature })
                      var i = 0
                      while (d.values[i].date >= xDate) { 
                        i++                       
                        if (i >= d.values.length - 1) { break }
                        
                      }
          
                      //var  bisect = d3.bisector( ( d: any) => {return d.date; }).left;
                      //d = d.map( da => { return da.date})
          
                      //to i => index is not out of range
                    //  if (i >= d.values.length) { i = d.values.length -1  }
                      var idx = i;
                      let parse2 = d3.timeFormat("%H:%M")
                      d3.selectAll('.mouse-per-line text')
                        .attr("transform", "translate(0,-20)")
                        .text((d: any) => {
                         // if (i >= d.values.length) { i = d.values.length -1  }    
                          return 'Vrednost: ' + d.values[i].temperature + ', ura: ' + parse2(d.values[i].date)
                        })
                        .style("font-size", '14px')
          
                      d3.select(".mouse-line")
                        .style("stroke-width", "0.5px")
                        .attr("d", () => {
                          var data = "M" + xt(d.values[i].date) + "," + visina;
                          data += " " + xt(d.values[i].date) + "," + 0;
                          return data;
                        });
                      if (d.name.graph_type.id === 1) {
                        return "translate(" + xt(d.values[i].date) + "," + yt2(d.values[i].temperature) + ")";
                      }
                      return "translate(" + xt(d.values[i].date) + "," + yt(d.values[i].temperature) + ")";
          
                    }); 

          
                }
              
              )
            
            }
    }
  



  public najdiMaxPoY(datuma: Date[]): number {
    var bisektor = d3.bisector((d: any) => { return d.date }).left;
    var maxY = 0;
    this.chartData.forEach(element => {
      //indeksa prvega in zadnjega podatka
      var i1 = bisektor(element.values, datuma[0]),
        i2 = bisektor(element.values, datuma[1])
      var y = +d3.max(element.values[i1].temperature, element.values[i2].temperature)
      if (y > maxY) { maxY = y }
    });


    return maxY
  }
}

