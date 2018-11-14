import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import PlayIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
})

const icon = paused => (
  paused ? <PlayIcon /> : <PauseIcon />
)

class PlayButton extends React.Component {
  handleButtonClick = () => {
    this.props.onClick(this.props.paused)
  }

  render () {
    const { classes, paused } = this.props
    return (
      <div>
        <Button variant='contained' color='secondary' className={classes.button} onClick={this.handleButtonClick} aria-label={paused ? 'Pause Button' : 'Play Button'}>
          {icon(this.props.paused)}
          {paused ? 'Play' : 'Paused'}
        </Button>
      </div>
    )
  }
}

PlayButton.propTypes = {
  classes: PropTypes.object.isRequired,
  paused: PropTypes.bool,
  onClick: PropTypes.func
}

export default withStyles(styles)(PlayButton)
