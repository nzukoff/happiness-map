import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import BarChart from '../BarChart/BarChart'

const useStyles = makeStyles(theme => ({
  country: {
    // marginBottom: theme.spacing(4)
  },
  // display: {
  //   marginBottom: theme.spacing(4)
  // }
}))


export default function Display(props) {
  const classes = useStyles();
  const { data, country } = props
  // console.log(country)
  return (
    <div className="Display">
      {
        props.country ? 
        <Fragment>
          <BarChart data={data} country={country}/>
            <Typography variant="body1" className={classes.country}>
              {country.properties.name}
            </Typography>
            {/* {
              country.happinessRank ? 
                <Typography variant="body1" className={classes.country}>
                  {country.happinessRank}
                </Typography>
                :
                null
            } */}
        </Fragment>
        :
          null
      }
    </div>
  );
}
