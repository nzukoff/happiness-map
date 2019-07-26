import React, { useState } from 'react';
import Map from '../Map/Map'
import Display from '../Display/Display'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
  // gif: {
  //   marginBottom: theme.spacing(4)
  // },
  // display: {
  //   marginBottom: theme.spacing(4)
  // }
}))


export default function Viz(props) {
  const [country, setCountry] = useState(null)
  const classes = useStyles();
  return (
    <div className="Viz">
      {/* <Grid container>
        <Header reset={this.reset}/>
      </Grid> */}
      <Grid container >
        <Grid className={classes.gif} item xs={12} md={6}>
          <Map setCountry={setCountry}/>
        </Grid>
        <Grid item className={classes.display} xs={12} md={6} container justify='space-around'>
          <Display country={country}/>
        </Grid>
      </Grid>
    </div>
  );
}
