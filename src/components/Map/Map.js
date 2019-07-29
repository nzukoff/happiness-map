import React from 'react'
import * as d3 from 'd3';
import './Map.css';
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    wrapper: {
      position: 'relative',
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2)
    },
    map: {
      position: 'absolute'
    }
}))

export default function Map(props) {
    const classes = useStyles();
    const { data, setCountry, colorScale } = props

    let svg = d3.selectAll("#anchor1")
        // .attr("transform", `translate(0,${window.innerHeight/4})`)
    
    let sortedData = data.sort((a, b) => {
        if (a.happinessRank === undefined) {
            return 1;
        }
        else if (b.happinessRank === undefined) {
            return -1;
        }
        else { 
            return parseInt(a.happinessRank) < parseInt(b.happinessRank) ? 1 : -1;
        }
    })

    let projection = d3.geoMercator()
        .scale(100)
    
    let path = d3.geoPath()
        .projection(projection)

    svg.selectAll('.country')
    .data(sortedData)
    .enter()
        .append('path')
        .attr("class", d => `country ${d.properties.name.replace(/\s/g,'').toLowerCase()}`)
        .attr('d', path)
        .attr('fill', function(d, i) {
            if (d.happinessRank) {return colorScale(i)}
            else { return '#cccccc'}
        })
        .on('mouseover', function(d) {
            if (d.happinessRank) {
                d3.select(this).classed("selected", true)
            }                
        })
        .on('mouseout', function(d) {d3.select(this).classed("selected", false)})
        .on('click', function(d) {
            setCountry(d)
        })
    return (
        <div className={classes.wrapper}>
            <svg className={classes.map} id="anchor1"  viewBox={`165 0 ${window.innerWidth/2} ${window.innerHeight}`}/>
        </div>
    )
}