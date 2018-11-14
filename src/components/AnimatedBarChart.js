import React from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
import constants from '../helpers/constants'

class AnimatedBarChart extends React.Component {
  componentDidMount () {
    window.addEventListener('resize', this.handleWindowResize)
    this.initChart()
    if (this.props.data) this.renderChart(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const hasPauseChanged = this.props.paused !== nextProps.paused
    if (nextProps.data && !hasPauseChanged) {
      this.clearChart()
      this.initChart()
      this.renderChart(nextProps)
    }
  }

  // don't update the component via react
  // instead utilize componentWillReceieveProps to update the chart
  shouldComponentUpdate () {
    return false
  }

  handleWindowResize = () => {
    this.clearChart()
    this.initChart()
    this.renderChart(this.props)
  }

  initChart = () => {
    const chartWidthMargin = 100
    const width = window.innerWidth - (constants.DRAWER_WIDTH + chartWidthMargin) || constants.DEFAULT_CHART_WIDTH
    const height = this.props.height || constants.DEFAULT_CHART_HEIGHT

    const margin = {
      top: 60,
      bottom: 100,
      left: 80,
      right: 40
    }

    // setup SVG
    this.svg = d3.select('#pig-bar-chart')
      .append('svg')
      .attr('id', 'chart')
      .attr('width', width)
      .attr('height', height)

    // setup chart
    this.chart = this.svg.append('g')
      .classed('display', true)
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // setup tooltip
    this.toolTip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('z-index', 10)
      .style('background', '#fff')
      .style('padding', '5px')
      .style('position', 'absolute')
      .style('border', '1px solid gray')
      .style('border-radius', '3px')

    // colorscale for pretty bars
    this.colorScale = d3.scaleOrdinal(d3.schemeSpectral[8])

    this.chartWidth = width - margin.left - margin.right
    this.chartHeight = height - margin.top - margin.bottom
  }

  renderBars = (props) => {
    const { data } = props

    const barYLinear = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.pigPopulation)])
      .range([0, this.chartHeight])

    this.bars = this.chart
      .selectAll('.bar')
      .data(data)

    // enter and update
    this.bars
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', d => this.xScale(d.island))
      .attr('y', d => this.chartHeight)
      .attr('height', 0)
      .attr('width', d => this.xScale.bandwidth())
      .on('mouseover', function (d) {
        this.toolTip
          .transition()
          .duration(100)
          .style('opacity', 0.9)
        this.toolTip
          .html(`Pig Population: ${d.pigPopulation}`)
      }.bind(this))
      .on('mousemove', function () {
        this.toolTip
          .style('top', (d3.event.pageY - 10) + 'px')
          .style('left', (d3.event.pageX + 10) + 'px')
      }.bind(this))
      .on('mouseout', function (d) {
        this.toolTip.transition()
          .duration(100)
          .style('opacity', 0)
      }.bind(this))
      .style('fill', (d, i) => this.colorScale(i))
      .transition()
      .delay((d, i) => { return ((i * 200 / 2)) })
      .attr('y', (d, i) => { return this.chartHeight - barYLinear(d.pigPopulation) })
      .attr('height', (d) => { return barYLinear(d.pigPopulation) })

    // remove
    this.bars
      .exit().remove()
  }

  renderAxis = (props) => {
    const { data, year } = props

    this.xScale = d3.scaleBand()
      .domain(data.map(d => d.island))
      .range([0, this.chartWidth])

    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.pigPopulation)])
      .range([this.chartHeight, 0])

    const xAxis = d3.axisBottom()
      .scale(this.xScale)

    this.chart.append('g')
      .classed('x axis', true)
      .attr('transform', `translate(0,${this.chartHeight})`)
      .call(xAxis)

    const yAxis = d3.axisLeft()
      .ticks(5)
      .scale(this.yScale)

    this.chart.append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(0,0)')
      .call(yAxis)

    this.chart.select('.x.axis')
      .append('text')
      .attr('x', this.chartWidth / 2)
      .attr('y', 60)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text(`${year} Hawaiian Islands`)

    this.chart.select('.x.axis')
      .exit().remove()

    this.chart.select('.y.axis')
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(-50, ${this.chartHeight / 2}) rotate(-90)`)
      .attr('fill', '#000')
      .style('font-size', '20px')
      .style('text-anchor', 'middle')
      .text('Pig Population')

    this.chart.select('.y.axis')
      .exit().remove()
  }

  renderGridLines = () => {
    const yGridlines = d3.axisLeft()
      .scale(this.yScale)
      .ticks(5)
      .tickSize(-this.chartWidth, 0, 0)
      .tickFormat('')

    this.chart.append('g')
      .call(yGridlines)
      .classed('gridline', true)

    this.chart.selectAll('gridline')
      .exit().remove()
  }

  renderChart = (props) => {
    this.renderAxis(props)
    this.renderGridLines()
    this.renderBars(props)
  }

  clearChart = () => {
    d3.select('#pig-bar-chart').selectAll('*').remove()
    d3.selectAll('.tooltip').remove()
  }

  render () {
    return (
      <div id='pig-bar-chart' />
    )
  }
}

AnimatedBarChart.propTypes = {
  data: PropTypes.array,
  year: PropTypes.string,
  paused: PropTypes.bool
}

export default AnimatedBarChart
