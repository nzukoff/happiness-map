import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem, Grid } from '@material-ui/core/'
import * as d3 from 'd3';
import Sort from '@material-ui/icons/Sort'
import './BarChart.css';
import ChartMenu from '../ChartMenu/ChartMenu'



const styles = theme => ({
  barchart: {
    position: 'absolute'
  },
  wrapper: {
    position: 'relative',
  },
  sortWrapper: {
  }
})


// export default function BarChart(props) {
class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: null,
      y: null,
      svg: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.orderType !== this.props.orderType) {
      
      this.updateBarOrder(this.props.data, this.state.orderType)

    }
    if (prevProps.country !== this.props.country) {
      
      this.updateBarCountry(prevProps.country)

    }
  }

  componentDidMount = async () => {
    this.makeChart(this.props.country, this.props.data)
  }

  updateBarOrder = () => {
    console.log('update')
    const xCopy = this.state.x.domain(this.props.data.map(d => d.properties.name)).copy();
    const t = this.state.svg.transition().duration(750);
    const delay = (d, i) => i * 20;
    
    this.state.bar
      .data(this.props.data, d => d.happinessRank)
    
    t.selectAll(".bar")
      .delay(delay)
      .attr("x", d => xCopy(d.properties.name))

  }

  updateBarCountry = (prevCountry) => {
    console.log('country')
    this.state.svg.select("#" + this.props.country.properties.name)
      .classed("countrySelected", true)
      .attr("fill", "red")
    this.state.svg.select("#" + prevCountry.properties.name)
      .classed("countrySelected", false)
      .attr("fill", "steelblue")  
  }

  makeChart = (country, data) => {

    const margin = {top: 20, right: 0, bottom: 30, left: 40}
    // const height = 400
    // const width = 400
    const width = window.innerWidth/2
    const height = window.innerHeight*.6

    let svg = d3.selectAll("#barchart")
    .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
      .domain(this.props.data.map(d => d.properties.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, Math.max(...this.props.data.map(d => d.happinessRank))]).nice()
      .range([height - margin.bottom, margin.top])    

    const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    // .call(d3.axisBottom(x).tickSizeOuter(0))
    // .selectAll("text")	
    //     .style("text-anchor", "end")
    //     // .attr("dx", "-.8em")
    //     // .attr("dy", ".15em")
    //     .attr("transform", "rotate(-65)")

    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove())
      

    const bar = svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(this.props.data)
      .join("rect")
        .style("mix-blend-mode", "multiply")
        .attr("class", d => 'bar')
        .attr("x", d => x(d.properties.name))
        .attr("y", d => y(d.happinessRank))
        .attr("height", d => y(0) - y(d.happinessRank))
        .attr("width", x.bandwidth())
        .attr("id", d => d.properties.name)

      svg.select("#" + country.properties.name)
        .classed("countrySelected", true)
        .attr("fill", "red")    

      svg.append("g")
      .call(xAxis);

      svg.append("g")
        .call(yAxis);

      this.setState({x,y,svg,bar})
  }

  render() {
    let { data, country, classes } = this.props
    return (
      <Fragment>
        <div className={classes.wrapper}>
          <svg className={classes.barchart} ref="barchart" id="barchart" />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(BarChart)