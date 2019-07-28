import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'
import BarChart from '../BarChart/BarChart'
import ChartMenu from '../ChartMenu/ChartMenu'
import ViewMenu from '../ViewMenu/ViewMenu'


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
  const [orderType, setOrderType] = useState('random')
  const [chartData, setChartData] = useState([])
  const { data, country } = props
  
  useEffect(() => {
    setChartData(sortData('random', data.filter(d => d.happinessRank)))
  },[data])

  const changeOrder = (type) => {
    const sortedData = sortData(type, chartData)
    setChartData(sortedData)
    setOrderType(type)
  }

  const sortData = (orderType, data) => {
    const dataCopy = [...data]
    if (orderType === 'random') {
      return dataCopy
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
    } else if (orderType === 'ascending') {
      return dataCopy.sort((a,b) => parseInt(a.happinessRank) > parseInt(b.happinessRank) ? 1 : -1)
    } else if (orderType === 'descending') {
      return dataCopy.sort((a,b) => parseInt(a.happinessRank) < parseInt(b.happinessRank) ? 1 : -1)
    }
  }

  return (
    <div className="Display">
      {
        country ? 
        <Fragment>
          <ViewMenu country={country}/>
          <ChartMenu changeOrder={changeOrder} />
          <BarChart data={chartData} country={country} orderType={orderType}/>
        </Fragment>
        :
          null
      }
    </div>
  );
}
