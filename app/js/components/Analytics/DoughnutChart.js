import React         from 'react';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import {Chart}       from 'chart.js';
var DoughnutChart = require("react-chartjs").Doughnut;

var StDoughnutChart = React.createClass({
  getInitialState: function() {
    return {
      legend: null
    }
  },
  componentDidMount: function () {
    var legend = this.refs.dchart.getChart().generateLegend();

    this.setState({
      legend: legend
    });
  },
  render: function() {

    var chartData = [
      {
          value: 300,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "US"
      },
      {
          value: 50,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "MX"
      },
      {
          value: 100,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "AS"
      }
  ];

  var chartOptions = {
      //Boolean - Whether we should show a stroke on each segment
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2,

      //Number - The percentage of the chart that we cut out of the middle
      percentageInnerCutout : 50, // This is 0 for Pie charts

      //Number - Amount of animation steps
      animationSteps : 50,

      //String - Animation easing effect
      animationEasing : "easeOut",

      //Boolean - Whether we animate the rotation of the Doughnut
      animateRotate : true,

      //Boolean - Whether we animate scaling the Doughnut from the centre
      animateScale : true,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>; display: inline-block; width: 15px; height: 15px; margin-right: 5px; border-radius: 2px;\"></span><%if(segments[i].label){%><span style=\"display: inline-block; width: 12%;\"><%=segments[i].label%></span><%}%></li><%}%></ul>"

  };

  var legend = this.state && this.state.legend || '';

  return (
    <div>
      <Row>
        <Col sm={12}>
          <h2>Geo Breakdown</h2>
        </Col>
        <Col sm={12} className="chart-canvas">
          <DoughnutChart data={chartData} options={chartOptions} ref="dchart" width="160" height="160"/>
          <div dangerouslySetInnerHTML={{ __html: legend }} />
        </Col>
      </Row>
    </div>
    )
  }
});
export default StDoughnutChart;
