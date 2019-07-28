import React, { useState, useEffect } from 'react';
import Map from '../Map/Map'
import Display from '../Display/Display'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'
import * as topojson from 'topojson'
import * as d3 from 'd3';

const useStyles = makeStyles(theme => ({
  // gif: {
  //   marginBottom: theme.spacing(4)
  // },
  // display: {
  //   marginBottom: theme.spacing(4)
  // }
}))


export default function Viz(props) {
  const [data, setData] = useState([])
  const [country, setCountry] = useState(null)

  useEffect(() => {
    (async function() {
      const jdata = await d3.json('./data/world-countries.json')
      const cdata = await d3.csv('./data/2017.csv')
      let countries = topojson.feature(jdata, jdata.objects.countries1).features
      let filteredData =  countries.map((d) => {        
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
      setData(filteredData)
    }
    )()
  },[])

  const classes = useStyles();
  return (
    <div className="Viz">
      {/* <Grid container>
        <Header reset={this.reset}/>
      </Grid> */}
      <Grid container >
        <Grid className={classes.gif} item xs={12} md={6}>
          <Map setCountry={setCountry} data={data} />
        </Grid>
        <Grid item className={classes.display} xs={12} md={6}>
          <Display data={data} country={country} />
        </Grid>
      </Grid>
    </div>
  );
}
