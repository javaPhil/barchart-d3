import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import HeaderContainer from '../containers/HeaderContainer'
import SideNavContainer from '../containers/SideNavContainer'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#085572'
    },
    secondary: {
      main: '#d81b60'
    }
  }
}
)

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    margin: '75px 50px'
  }
})

class Layout extends React.Component {
  render () {
    const { classes, children } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <HeaderContainer />
          <SideNavContainer />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
        </div>
      </MuiThemeProvider>

    )
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Layout)
