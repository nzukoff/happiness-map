import React, {Fragment, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Menu, MenuItem } from '@material-ui/core/'
import Sort from '@material-ui/icons/Sort'


const useStyles = makeStyles(theme => ({
  country: {
    // marginBottom: theme.spacing(4)
  },
  // display: {
  //   marginBottom: theme.spacing(4)
  // }
}))


export default function ChartMenu(props) {
  const classes = useStyles();
  const { changeOrder } = props
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null) 
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget )
  }

  return (
    <div style={{'border':'black solid'}}>
      <IconButton onClick={(e) => handleClick(e)} id="SortButton">
        <Sort />
      </IconButton>
      <Menu
        id='SortMenu'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
      >
        <MenuItem id='random' onClick={() => {handleClose();changeOrder('random')}}>Random</MenuItem>
        <MenuItem id='ascending' onClick={() => {handleClose();changeOrder('ascending')}}>Ascending</MenuItem>
        <MenuItem id='descending' onClick={() => {handleClose();changeOrder('descending')}}>Descending</MenuItem>
      </Menu>
    </div >
  );
}
