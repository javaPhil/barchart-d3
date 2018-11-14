import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { setSideNavOpen } from '../actions/uiActions'

class HeaderContainer extends Component {
  render () {
    return (
      <Header drawerOpen={this.props.drawerOpen}
        setSideNavOpen={this.props.setSideNavOpen}
      />
    )
  }
}

const mapStateToProps = state => ({
  drawerOpen: state.uiReducer.drawerOpen
})

const mapDispatchToProps = dispatch => ({
  setSideNavOpen: () => {
    dispatch(setSideNavOpen(true))
  }
})

HeaderContainer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  setSideNavOpen: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderContainer)
