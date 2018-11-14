import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BarChartIcon from '@material-ui/icons/BarChart'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import List from '@material-ui/core/List'
import Drawer from '@material-ui/core/Drawer'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: constants.DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  }
})

const SideNav = props => (
  <Drawer
    variant='permanent'
    classes={{
      paper: classNames(props.classes.drawerPaper, !props.drawerOpen && props.classes.drawerPaperClose)
    }}
    open={props.drawerOpen}
  >
    <div className={props.classes.toolbarIcon}>
      <IconButton onClick={props.setSideNavOpen}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
    <Divider />
    <List>
      <div>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
      </div>
    </List>
  </Drawer>
)

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  drawerOpen: PropTypes.bool
}

export default withStyles(styles)(SideNav)
