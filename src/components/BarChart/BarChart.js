import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3';
import './BarChart.css';

const useStyles = makeStyles(theme => ({
  barchart: {
    position: 'absolute'
  },
  wrapper: {
    position: 'relative',
  }
}))

export default function BarChart(props) {
  const { country, data, orderType } = props

  useEffect(() => {
    makeChart(country, data)
  },[])

  useEffect(() => {
    updateBarOrder(data, orderType)
  },[orderType])

  useEffect(() => {
    updateBarCountry(country)
  },[country])

  const margin = {top: 20, right: 0, bottom: 30, left: 40}
  const width = window.innerWidth/2
  const height = window.innerHeight*.6

  const x = d3.scaleBand()
  .domain(data.map(d => d.properties.name))
  .range([margin.left, width - margin.right])
  .padding(0.1)

  const y = d3.scaleLinear()
    .domain([0, Math.max(...data.map(d => d.happinessRank))]).nice()
    .range([height - margin.bottom, margin.top])    

  const updateBarOrder = () => {
    const xCopy = x.domain(data.map(d => d.properties.name)).copy();
    const t = d3.selectAll("#barchart").transition().duration(750);
    const delay = (d, i) => i * 20;
    
    d3.selectAll('.bar').data(data, d => d.happinessRank)

    t.selectAll(".bar")
      .delay(delay)
      .attr("x", d => xCopy(d.properties.name))

  }

  const usePrevious = (value) => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value;
    }, [value])
    return ref.current;
  }

  const prevCountry = usePrevious(country)
  const updateBarCountry = () => {
    d3.selectAll("#barchart")
      .select("#" + country.properties.name)
        .classed("countrySelected", true)
        .attr("fill", "red")
    if (prevCountry) {
      d3.selectAll("#barchart")
        .select("#" + prevCountry.properties.name)
          .classed("countrySelected", false)
          .attr("fill", "steelblue")  
    } else {
      return
    }
  }

  const makeChart = (country) => {

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
    
    let svg = d3.selectAll("#barchart")
    .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
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
    }

    const classes = useStyles();
    return (
      <div className={classes.wrapper}>
        <svg className={classes.barchart} id="barchart" />
      </div>
    );
}
