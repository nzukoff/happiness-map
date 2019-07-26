import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'

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
  const { country } = props
  return (
    <div className="Display">
      {
        props.country ? 
        <Typography variant="body1" className={classes.country}>
          {country.properties.name}
        </Typography>
        :
          <Typography >
            no country
          </Typography>
      }
    </div>
  );
}
