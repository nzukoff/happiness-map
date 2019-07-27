import React, {Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem, Grid } from '@material-ui/core/'
import * as d3 from 'd3';
import Sort from '@material-ui/icons/Sort'
import './BarChart.css';



const styles = theme => ({
  barchart: {
    position: 'absolute'
  },
  wrapper: {
    position: 'relative',
    // paddingTop: theme.spacing(2),
    // paddingLeft: theme.spacing(2)
  },
  sortWrapper: {
    // flexGrow: 1,
  }
})


// export default function BarChart(props) {
class BarChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orderType: 'random',
      anchorEl: null,
      x: null,
      y: null,
      svg: null,
      sortedData: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.orderType !== this.state.orderType) {
      
      this.updateBarOrder(this.state.sortedData, this.state.orderType)

    }
    if (prevProps.country !== this.props.country) {
      
      this.updateBarCountry(prevProps.country)

    }
  }

  componentDidMount = async () => {
    const sortedData = this.sortData('random', this.props.data.filter(d => d.happinessRank))
    await this.setState({sortedData})
    this.makeChart(this.props.country, this.props.data)
  }

  updateBarOrder = () => {
    console.log('update')
    const xCopy = this.state.x.domain(this.state.sortedData.map(d => d.properties.name)).copy();
    const t = this.state.svg.transition().duration(750);
    const delay = (d, i) => i * 20;
    
    this.state.bar
      .data(this.state.sortedData, d => d.happinessRank)
    
    t.selectAll(".bar")
      .delay(delay)
      .attr("x", d => xCopy(d.properties.name))

  }

  updateBarCountry = (prevCountry) => {
    console.log('country')
    this.state.svg.select("#" + this.props.country.properties.name)
      .classed("countrySelected", true);      
    this.state.svg.select("#" + prevCountry.properties.name)
      .classed("countrySelected", false);     
  }

  changeOrder = (type) => {
    const sortedData = this.sortData(type, this.state.sortedData)
    this.setState({orderType: type, sortedData})
  }

  sortData = (orderType, data) => {
    const dataCopy = [...data]
    if (orderType === 'random') {
      return dataCopy
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    } else if (orderType === 'ascending') {
      return dataCopy.sort((a,b) => parseInt(a.happinessRank) > parseInt(b.happinessRank) ? 1 : -1)
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null }) 
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  makeChart = (country, data) => {

    const margin = {top: 20, right: 0, bottom: 30, left: 40}
    const height = 500
    const width = 500

    let svg = d3.selectAll("#barchart")
    .attr("viewBox", [0, 0, width, height]);

    const x = d3.scaleBand()
      .domain(this.state.sortedData.map(d => d.properties.name))
      .range([margin.left, width - margin.right])
      .padding(0.1)

    const y = d3.scaleLinear()
      .domain([0, Math.max(...this.state.sortedData.map(d => d.happinessRank))]).nice()
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
        .data(this.state.sortedData)
      .join("rect")
        .style("mix-blend-mode", "multiply")
        .attr("class", d => 'bar')
        .attr("x", d => x(d.properties.name))
        .attr("y", d => y(d.happinessRank))
        .attr("height", d => y(0) - y(d.happinessRank))
        .attr("width", x.bandwidth())
        .attr("id", d => d.properties.name)

      svg.select("#" + country.properties.name)
        .classed("countrySelected", true);      

      svg.append("g")
      .call(xAxis);

      svg.append("g")
        .call(yAxis);

      this.setState({x,y,svg,bar})
  }

  render() {
    let { data, country, classes } = this.props
    const { anchorEl } = this.state
    console.log("STATE", this.state)
    return (
      <Fragment>
        {/* <Grid container className={classes.sortWrapper} justify='flex-end'> */}
          <IconButton onClick={(e) => this.handleClick(e)} id="SortButton">
            <Sort />
          </IconButton>
          <Menu
            id='SortMenu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => this.handleClose()}
          >
            <MenuItem id='random' onClick={() => {this.handleClose();this.changeOrder('random')}}>Random</MenuItem>
            <MenuItem id='ascending' onClick={() => {this.handleClose();this.changeOrder('ascending')}}>Ascending</MenuItem>
          </Menu>
        {/* </Grid> */}
        <div className={classes.wrapper}>
          <svg className={classes.barchart} ref="barchart" id="barchart" />
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(BarChart)