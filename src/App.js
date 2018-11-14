import React, { Component } from 'react'
// import pigData from './wild-pig-data.json'
import './App.css'

import { Provider } from 'react-redux'
import configureStore from './store'

import Layout from './components/Layout'
import DashboardContainer from './containers/DashboardContainer'

class App extends Component {
  render () {
    return (
      <Provider store={configureStore()}>
        <Layout>
          <DashboardContainer />
        </Layout>
      </Provider>
    )
  }
}

export default App
