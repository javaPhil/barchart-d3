import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  progressBarContainer: {
    margin: theme.spacing.unit,
    width: '700px'
  }
})

// min, max, current
const ProgressBar = props => (
  <div className={props.classes.progressBarContainer}>
    <LinearProgress variant='determinate' value={props.value} />
  </div>
)

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number
}

export default withStyles(styles)(ProgressBar)
