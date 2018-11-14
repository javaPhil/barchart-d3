import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import pigData from '../wild-pig-data.json'
import parsePigJson from '../helpers/parsePigJson'
import getQueryParam from '../helpers/getQueryParam'
import constants from '../helpers/constants'

import { setURLParam, setPigData } from '../actions/dashboardActions'

import AnimatedBarChart from '../components/AnimatedBarChart'
import PlayButton from '../components/PlayButton'
import ProgressBar from '../components/ProgressBar'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  chartToolsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  noDataContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  barChartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconPadding: {
    padding: '0 5px'
  }
})

class DashboardContainer extends Component {
  state = {
    timer: null
  }

  componentDidMount () {
    this.props.setPigData(parsePigJson(pigData))
    this.getUrlParams()
  }

  componentWillReceiveProps (nextProps) {
    const pausedChanged = this.props.urlParams.paused !== nextProps.urlParams.paused

    if (pausedChanged) {
      if (nextProps.urlParams.paused && this.state.timer !== null) {
        clearInterval(this.state.timer)
      } else {
        let timer = setInterval(this.tick, 2000)
        this.setState({ timer })
      }
    }
  }

  componentWillUnmount () {
    if (this.props.urlParams.paused) {
      clearInterval(this.state.timer)
    }
  }

  tick = () => {
    const { data, urlParams, setURLParam, year } = this.props
    const dataKeys = data ? Object.keys(data) : []

    if (dataKeys && !urlParams.paused) {
      const currentDataIndex = dataKeys.indexOf(year)
      if (dataKeys[currentDataIndex + 1]) {
        setURLParam(constants.URL_PARAM_YEAR, dataKeys[currentDataIndex + 1])
      } else {
        setURLParam(constants.URL_PARAM_YEAR, dataKeys[0])
      }
    }
  }

  getUrlParams = () => {
    // explicitly only get the two params we care about
    const year = getQueryParam(constants.URL_PARAM_YEAR) || this.props.urlParams.year
    const paused = getQueryParam(constants.URL_PARAM_PAUSED) || this.props.urlParams.paused

    this.props.setURLParam(constants.URL_PARAM_YEAR, year)
    // query params come out of URL as strings and
    // since paused is a bool by default cast it to bool using built in JSON
    this.props.setURLParam(constants.URL_PARAM_PAUSED, JSON.parse(paused))
  }

  renderNoDataSection = () => {
    const { data, year, classes } = this.props
    return !data[year] &&
    <div className={classes.noDataContainer}>
      <div>No data for specified year. Try another!</div>
      <div className={classes.iconPadding}><SentimentDissatisfied /></div>
    </div>
  }

  renderAnimatedChart = () => {
    const { classes, year, data, urlParams, togglePaused } = this.props

    const dataKeys = data ? Object.keys(data) : []
    const progressValue = dataKeys.length > 0 ? (dataKeys.indexOf(year) / (dataKeys.length - 1)) * 100 : 0

    return data[year] && <div className={classes.barChartContainer}>
      <AnimatedBarChart data={data[year]}
        year={year}
        paused={urlParams.paused} />
      <div className={classes.chartToolsContainer}>
        <PlayButton paused={urlParams.paused}
          onClick={togglePaused} />
        <ProgressBar value={progressValue} />
      </div>
    </div>
  }

  render () {
    return (
      <div className='dashboard-container'>
        {this.renderNoDataSection()}
        {this.renderAnimatedChart()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  urlParams: state.dashboardReducer.urlParams,
  data: state.dashboardReducer.data,
  year: state.dashboardReducer.urlParams.year
})

const mapDispatchToProps = dispatch => ({
  setURLParam: (name, value) => {
    dispatch(setURLParam(name, value))
  },
  setPigData: (data) => {
    dispatch(setPigData(data))
  },
  togglePaused: (bool) => {
    dispatch(setURLParam(constants.URL_PARAM_PAUSED, !bool))
  }
})

DashboardContainer.propTypes = {
  urlParams: PropTypes.object,
  data: PropTypes.object,
  year: PropTypes.string,
  setURLParam: PropTypes.func,
  setPigData: PropTypes.func,
  togglePaused: PropTypes.func,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashboardContainer))
