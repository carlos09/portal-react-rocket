import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import {Chart}       from 'chart.js';
var LineChart = require("react-chartjs").Line;
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";



var StLineChart = React.createClass({
  getInitialState: function() {
    return {
      from: null,
      to: null,
      calendar: false,
      legend: null
    }
  },
  componentDidMount: function () {
    var legend = this.refs.linechart.getChart();

    console.log('line: ', legend);

    this.setState({
      legend: legend
    });
  },
  handleDayClick: function(e, day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  },
  handleResetClick: function(e) {
    e.preventDefault();
    this.setState({
      from: null,
      to: null
    });
  },
  toggleCalendar: function() {
    var state = !this.state.calendar;
    this.setState({ calendar: state })
  },
  render: function() {
    const { from, to } = this.state;

    const modifiers = {
      selected: day => DateUtils.isDayInRange(day, this.state)
    };
    console.log('new state is: ', this.state);

    var chartData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

  var chartOptions = {

      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.05)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,

      //Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,

      //Boolean - Whether the line is curved between points
      bezierCurve : true,

      //Number - Tension of the bezier curve between points
      bezierCurveTension : 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 2,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      responsive: false,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };


  console.log('show state: ', this.state);
  var calendarShow = this.state.calendar ? "" : " hidden";

    return (
      <div>
        <Row>
          <Col sm={6} className="vert-align-bottom">
            <h2>Station Name Impressions</h2>
          </Col>
          <Col sm={6} className="vert-align-bottom">
            <div className="calendar-view text-right">
              { !from && !to && <p>View impressions from <i className="zmdi zmdi-calendar" onClick={this.toggleCalendar}></i> to <i className="zmdi zmdi-calendar" onClick={this.toggleCalendar}></i>.</p> }
              { from && !to && <p>View impressions from <strong>{
                  moment(from).format("L") }</strong> to <i className="zmdi zmdi-calendar" onClick={this.toggleCalendar}></i>.</p> }
              { from && to &&
                <p>View impressions from <strong  onClick={this.toggleCalendar}>{
                    moment(from).format("L") }</strong> to <strong  onClick={this.toggleCalendar}>{
                    moment(to).format("L") }</strong>. <a
                    href="#" onClick={ this.handleResetClick.bind(this) }>Reset</a>
                </p>
              }
              <div className={"date-range" + calendarShow }>
                <DayPicker
                  ref="daypicker"
                  numberOfMonths={ 1 }
                  modifiers={ modifiers }
                  onDayClick={ this.handleDayClick.bind(this) }
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="chart-canvas">
            <LineChart data={chartData} options={chartOptions} ref="linechart" width="685" height="300" />
          </Col>
        </Row>
      </div>
      )
  }
});
export default StLineChart;
