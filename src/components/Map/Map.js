import React from 'react'
import * as topojson from 'topojson'
import * as d3 from 'd3';
import './Map.css';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    wrapper: {
      position: 'relative',
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(2)
    },
    map: {
      position: 'absolute'
    }
  });

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        filteredData: []
    }
  } 

    componentDidMount = async () => {
        const jdata = await d3.json('./data/world-countries.json')
        const cdata = await d3.csv('./data/2017.csv')
        let countries = topojson.feature(jdata, jdata.objects.countries1).features
        let filteredData = countries.map((d) => {        
            cdata.forEach((c) => {
                if (c.country === d.properties.name) {
                    d.happinessRank = c.happiness_rank
                    d.happinessScore = c.happiness_score
                    d.gdp = c.gdp_per_capita
                    d.family = c.family
                    d.lifeExpectancy = c.life_expectancy
                    d.freedom = c.freedom
                    d.generosity = c.generosity
                    d.governmentCorruption = c.government_corruption
                }  
            })
            return d
        })
        this.setState({filteredData})
    }



    componentDidUpdate(prevProps){
        let svg = d3.selectAll("#anchor")
            // .attr("transform", `translate(0,${window.innerHeight/4})`)
        
        let sortedData = this.state.filteredData.sort((a, b) => {return a.happinessRank-b.happinessRank})

        let colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0,151])
        // let colorScale = d3.scaleLinear()
        // .domain([1, 151])
        // .range(["#CE8AAF", "#450026"])
        // .interpolate(d3.interpolateHsl);
        
        let projection = d3.geoMercator()
            .scale(100)
        
        let path = d3.geoPath()
            .projection(projection)

        svg.selectAll('.country')
        .data(sortedData)
        .enter()
            .append('path')
            .attr('class', 'country')
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
                prevProps.setCountry(d)
            })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.wrapper}>
                <svg className={classes.map} ref="achor" id="anchor"  viewBox={`165 0 ${window.innerWidth/2} ${window.innerHeight}`}/>
            </div>
        )
    }
}

export default withStyles(styles)(Map)