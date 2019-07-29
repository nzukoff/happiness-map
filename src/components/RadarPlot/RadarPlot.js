import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3';
// import './RadarPlot.css';
import RadarChart from './RadarChart'

const useStyles = makeStyles(theme => ({
  radarplot: {
    position: 'absolute'
  },
  wrapper: {
    position: 'relative',
    marginRight: 16,
    marginTop: 16
  }
}))

export default function RadarPlot(props) {
  const { country, data } = props

  useEffect(() => {
    // d3.selectAll("#radarplot").remove()
    RadarChart(".radarChart", [rData], radarChartOptions)
  })

  // useEffect(() => {
  //   updateBarOrder(data, orderType)
  // },[orderType])

  // useEffect(() => {
  //   updateBarCountry(country)
  // },[country])

  const margin = {top: 20, right: 0, bottom: 30, left: 40}
  const width = window.innerWidth/2
  const height = window.innerHeight*.7

  // const usePrevious = (value) => {
  //   const ref = useRef()
  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value])
  //   return ref.current;
  // }

  // const prevCountry = usePrevious(country)

  const updatePlotCountries = () => {
    // d3.selectAll("#barchart")
    //   .select("#" + country.properties.name)
    //     .classed("countrySelected", true)
    //     .attr("fill", "red")
    // if (prevCountry) {
    //   d3.selectAll("#barchart")
    //     .select("#" + prevCountry.properties.name)
    //       .classed("countrySelected", false)
    //       .attr("fill", "steelblue")  
    // } else {
    //   return
    // }
  }

  const color = d3.scaleOrdinal()
		.range(["#EDC951","#CC333F","#00A0B0"]);

  const picked = (({ family, freedom, gdp, generosity, governmentCorruption, lifeExpectancy }) => ({family, freedom, gdp, generosity, governmentCorruption, lifeExpectancy }))(country)
  const rData = Object.keys(picked).map(key => {return {axis: key, value: picked[key]}})
  const maxValue = Math.max(...rData.map(d => d.value))

  const radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue,
    levels: 5,
    roundStrokes: true,
    color: color
  };
      
  
  

    const classes = useStyles();
    return (
      <div className={classes.wrapper}>
        <svg className={classes.radarplot} id="radarplot" />
      </div>
    );
}
