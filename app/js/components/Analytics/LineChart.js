import React         from 'react';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
var ChartistGraph = require('react-chartist')



var LineChartist = React.createClass({
  getInitialState: function() {
    return {
      from: null,
      to: null
    }
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
  render: function() {
    const { from, to } = this.state;

    const modifiers = {
      selected: day => DateUtils.isDayInRange(day, this.state)
    };
    console.log('new state is: ', this.state);

    var lineChartData = {
      labels: [1, 2, 3, 4, 5, 6, 7, 8],
      series: [
        [12, 9, 7, 8, 5, 2, 3, 9],
        [2, 1, 3.5, 7, 3, 7, 2, 5],
        [1, 3, 4, 5, 6, 9, 5, 1]
      ]
    }
    var lineChartOptions = {
      low: 0,
      showArea: true
    }

    return (
      <div>
        <Row>
          <Col sm={6}>
            <h2>Station Name Impressions</h2>
          </Col>
          <Col sm={6}>
            <div className="text-right">
              { !from && !to && <p>Please select the <strong>start</strong> of the date range.</p> }
              { from && !to && <p>Please select the <strong>end</strong> of the date range.</p> }
              { from && to &&
                <p>Date range is from <strong>{
                    moment(from).format("L") }</strong> to <strong>{
                    moment(to).format("L") }</strong>. <a
                    href="#" onClick={ this.handleResetClick.bind(this) }>Reset</a>
                </p>
              }
              <div className="date-range">
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
          <Col sm={12}>
            <ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} />
          </Col>
        </Row>
      </div>
      )
  }
});
export default LineChartist;
