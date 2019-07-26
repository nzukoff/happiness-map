import React from 'react'
import * as topojson from 'topojson'
import * as d3 from 'd3';
import './Map.css';

export default class Map extends React.Component {
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



    componentDidUpdate(){
        let {width, height, margin} = this.props
        console.log("W IS ", width)
        console.log("H IS ", height)
        console.log("M IS ", margin)


        let svg = d3.selectAll("#anchor")
            .attr("transform", `translate(${margin.left},${margin.top})`)
        
        let sortedData = this.state.filteredData.sort((a, b) => {return a.happinessRank-b.happinessRank})

        let colorScale = d3.scaleSequential(d3.interpolateViridis).domain([0,151])
        // let colorScale = d3.scaleLinear()
        // .domain([1, 151])
        // .range(["#CE8AAF", "#450026"])
        // .interpolate(d3.interpolateHsl);
        
        let projection = d3.geoMercator()
            .translate([width/2, height/2])
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
                console.log(d.properties.name, d.happinessRank)
            })


    }

  render() {
    const filteredData = this.state
    if (!filteredData) {
        return null
    }
    return <g ref="achor" id="anchor" />
      }
}
