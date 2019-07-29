import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import * as d3 from 'd3';
// import './RadarPlot.css';
import RadarChart from './RadarChart'
import { normalize } from 'path';

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
    RadarChart(".radarChart", [test], radarChartOptions)
  }, [country])

  const margin = {top: 20, right: 0, bottom: 30, left: 40}
  const width = window.innerWidth/2
  const height = window.innerHeight*.7

  const norm = (array) => {
    const arrayCopy = [...array]
    var i;
    var max = Number.MIN_VALUE;
    var min = Number.MAX_VALUE;
    for (i = 0; i < arrayCopy.length; i++)
    {
      if(arrayCopy[i]>max)
      {
          max = arrayCopy[i];
      }
    }

    for (i = 0; i < arrayCopy.length; i++)
    {
      if(arrayCopy[i]<min)
      {
          min = arrayCopy[i];
      }
    }

    for (i = 0; i < arrayCopy.length; i++)
    {
      var norm = (arrayCopy[i]-min)/(max-min);
      arrayCopy[i] = norm;
    }

    max = Number.MIN_VALUE;
    min = Number.MAX_VALUE;
    for (i = 0; i < arrayCopy.length; i++) {
        if(arrayCopy[i]>max) {
            max = arrayCopy[i];
        }
    }

    for (i = 0; i < arrayCopy.length; i++) {
        if(arrayCopy[i]<min) {
            min = arrayCopy[i];
        }
    }

    return arrayCopy
  }

  const valuesObjectArray = data.map(d => Object.values((({ family, freedom, gdp, generosity, governmentCorruption, lifeExpectancy }) => ({family, freedom, gdp, generosity, governmentCorruption, lifeExpectancy }))(d))).flat()
  const values = valuesObjectArray.map(v => parseFloat(v))
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  // const color = d3.scaleOrdinal()
    // .range([`"#EDC951","#CC333F","#00A0B0"`]);

    const color = d3.selectAll(`.${country.properties.name.replace(/\s/g,'').toLowerCase()}`).attr("fill")

    

  //normalize1
  const picked = (({ family, freedom, gdp, generosity, governmentCorruption, lifeExpectancy }) => ({family, freedom, gdp, generosity, governmentCorruption, lifeExpectancy }))(country)
  const radData = Object.keys(picked).map(key => {return {axis: key, value: picked[key]}})
  const normValues = norm(radData.map(d => d.value))
  const rData = radData.map((d,i) => {return{...d, value: normValues[i]}})

  const normalizze = (newMax, newMin, max, min, value) => {
    const a = (newMax-newMin)/(max-min)
    const b = newMax - a * max
    return a * value + b
  }

   //normalize2
  const test = radData.map(d => {return{...d, value: normalizze(1,0.5,maxValue,minValue,d.value)}})

  const radarChartOptions = {
    w: width,
    h: height,
    margin: margin,
    maxValue,
    levels: 5,
    roundStrokes: true,
    color: color
  };
      
  // console.log("reg", rData.map(d => d.value))
  // console.log("norm", norm(rData.map(d => d.value)))
  

    const classes = useStyles();
    return (
      <div className={classes.wrapper}>
        <svg className={classes.radarplot} id="radarplot" />
      </div>
    );
}
