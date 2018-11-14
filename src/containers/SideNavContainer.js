import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SideNav from '../components/SideNav'
import { setSideNavOpen } from '../actions/uiActions'

class SideNavContainer extends Component {
  render () {
    return (
      <SideNav drawerOpen={this.props.drawerOpen}
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
    dispatch(setSideNavOpen(false))
  }
})

SideNavContainer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  setSideNavOpen: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavContainer)
