import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Typography } from '@material-ui/core/'
import BarChart from '@material-ui/icons/BarChart'
import PieChart from '@material-ui/icons/PieChart'

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
  const { country, setChartType } = props
  // const [anchorEl, setAnchorEl] = useState(null)

  // const handleClose = () => {
  //   setAnchorEl(null) 
  // }

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget )
  // }

  return (
    <Fragment>
      <Grid container direction="row" alignItems="center" style={{'border':'black solid'}}>
        <Grid item xs={6} >
          <Typography variant="h5" align='justify' className={classes.country}>
            {country.properties.name}
          </Typography>
        </Grid>
        <Grid item xs={6} >
          {/* <IconButton onClick={(e) => handleClick(e)} id="BarChart"> */}
          <IconButton onClick={() => setChartType('bar')} id="BarChart">
            <BarChart />
          </IconButton>
          <IconButton onClick={() => setChartType('radar')}>
            <PieChart />
          </IconButton>
          {/* <Menu
            id='SortMenu'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
          >
            <MenuItem id='nothing' onClick={() => {return}}>nothing</MenuItem>
          </Menu> */}
        </Grid>
      </Grid>
    </Fragment>
  );
}
