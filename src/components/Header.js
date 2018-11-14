import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import constants from '../helpers/constants'

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: constants.DRAWER_WIDTH,
    width: `calc(100% - ${constants.DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  appBarSpacer: theme.mixins.toolbar
})

const Header = props => (
  <AppBar
    position='absolute'
    className={classNames(props.classes.appBar, props.drawerOpen && props.classes.appBarShift)}
  >
    <Toolbar disableGutters={!props.drawerOpen} className={props.classes.toolbar}>
      <IconButton
        color='inherit'
        aria-label='Open drawer'
        onClick={props.setSideNavOpen}
        className={classNames(
          props.classes.menuButton,
          props.drawerOpen && props.classes.menuButtonHidden
        )}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component='h1'
        variant='h6'
        color='inherit'
        noWrap
        className={props.classes.title}
      >
        Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool
}

export default withStyles(styles)(Header)
