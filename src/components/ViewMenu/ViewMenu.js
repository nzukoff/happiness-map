import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core/'
import Sort from '@material-ui/icons/Sort'

const useStyles = makeStyles(theme => ({
  country: {
    marginLeft: theme.spacing(2)
  },
  // display: {
  //   marginBottom: theme.spacing(4)
  // }
}))

export default function ViewMenu(props) {
  const classes = useStyles();
  const { country } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null) 
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget )
  }

  return (
    <Fragment>
      <Grid container direction="row" alignItems="center" style={{'border':'black solid'}}>
        <Grid item xs={6} >
          <Typography variant="h5" align='justify' className={classes.country}>
            {country.properties.name}
          </Typography>
        </Grid>
        <Grid item xs={6} >
          <IconButton onClick={(e) => handleClick(e)} id="SortButton">
            <Sort />
          </IconButton>
          <Menu
            id='SortMenu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem id='nothing' onClick={() => {return}}>nothing</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Fragment>
  );
}
