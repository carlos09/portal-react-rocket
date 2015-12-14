import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, DropdownButton,MenuItem, Button } from 'react-bootstrap';
import {Link}        from 'react-router';
import StLinearChart  from './Analytics/Chart';
import LineChartist  from './Analytics/LineChart';
import StDoughnutChart  from './Analytics/DoughnutChart';
import StatsTable  from './Analytics/StatsTable';
import Stations    from './Stations';
import DocumentTitle from 'react-document-title';
import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";

var TextSelect = require('react-textselect');

/** Controller View */
const Dashboard = React.createClass({
  getInitialState: function() {
    var yesterday = moment().subtract(1, 'days').format('YYYY, MM, DD');
    return {
      dateRange: 'Yesterday',
      from: new Date(yesterday),
      to: new Date(yesterday),
      calendar: false,
      selectedOption: 1
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
  onTextSelectChange: function(func, key, val) {
    console.log('new change', val);
    this.setState({
      selectedOption: key
    })

    var currentDay = moment().format('YYYY, MM, DD');
    var Days7 = moment().subtract(7, 'days').format('YYYY, MM, DD');
    var Days30 = moment().subtract(30, 'days').format('YYYY, MM, DD');
    var Days90 = moment().subtract(90, 'days').format('YYYY, MM, DD');

    switch(val) {
      case '7 Days':
        this.setState({
          from: new Date(Days7),
          to: new Date(currentDay)
        })
        break;
      case '14 Days':
        this.setState({
          from: new Date(Days14),
          to: new Date(currentDay)
        })
        break;
      case '30 Days':
        this.setState({
          from: new Date(Days30),
          to: new Date(currentDay)
        })
        break;
      case '90 Days':
        this.setState({
          from: new Date(Days90),
          to: new Date(currentDay)
        })
        break;
      case 'Yesterday':
        var yesterday = moment().subtract(1, 'days').format('YYYY, MM, DD');
        this.setState({
          from: new Date(yesterday),
          to: new Date(yesterday)
        })
        break;
      case 'Custom':
        this.toggleCalendar();
        break;
    }
  },
  toggleCalendar: function() {
    var state = !this.state.calendar;
    this.setState({ calendar: state })
  },
  componentDidMount: function() {
    // var currentDay = moment().format('YYYY, MM, DD');
    // var TenDays = moment().subtract(10, 'days').format('YYYY, MM, DD');
    //
    // this.setState({
    //   from: new Date(TenDays),
    //   to: new Date(currentDay)
    // })
    //
    // console.log('today is: ' + currentDay + ' 10 days ago was: ' + TenDays);

    // this.setDateRange();

  },
  handleDropDown: function(val) {
    console.log('val is: ', val);
  },
  render: function() {
    var hideBtn = false;
    var calendarShow = this.state.calendar ? "" : " hidden";

    const { from, to } = this.state;

    const modifiers = {
      selected: day => DateUtils.isDayInRange(day, this.state)
    };

    console.log('this state', this.state);
    console.log('options should be: ', this.state.selectedOption);

    var inlineStyle= {display: 'inline'}

    return (
      <DocumentTitle title="Dashboard">
      <section className="analytics">
        <div className="container-fluid">
          <Row className="date-picker">
            <Col sm={6}>
              <div className="dropdown">
                <div className="date-range-container">

                    <p style={{display: 'inline'}}>
                      {(() => {
                        switch (this.state.selectedOption) {
                          case "0":   return "";
                          case "5":   return "";
                          default:    return "Last ";
                        }
                      })()}

                      <TextSelect
                        options={['Yesterday', '7 Days', '14 Days', '30 Days', '90 Days', 'Custom']}
                        active={this.state.selectedOption}
                        onChange={this.onTextSelectChange} />

                      { from && to && this.state.selectedOption == 5 && <p style={inlineStyle}> Last {moment(to).diff(from, 'days')} Days </p> }
                      <div style={{marginLeft: '0px', display: 'inline'}}> ( <strong className="dates" onClick={this.toggleCalendar}> { moment(from).format("L") }</strong> - <strong className="dates" onClick={this.toggleCalendar}>{
                        moment(to).format("L") }</strong> )</div>
                    </p>

                  <div className={"date-range" + calendarShow }>
                    <DayPicker
                      ref="daypicker"
                      numberOfMonths={ 1 }
                      modifiers={ modifiers }
                      onDayClick={ this.handleDayClick.bind(this) }
                    />
                  <Button className="btn btn-st orange" onClick={this.toggleCalendar}>Close</Button>
                  </div>
                </div>

              </div>

            </Col>
          </Row>

          <Row className="monthly-stats">
            <Col xs={6} sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-money"></i>
                <h3>$0.00</h3>
                <p className="desc">REVENUE</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-eye"></i>
                <h3>0</h3>
                <p className="desc">IMPRESSIONS</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-money-box"></i>
                <h3>$0.00</h3>
                <p className="desc">ECPM</p>
              </div>
            </Col>
            <Col xs={6} sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-collection-item"></i>
                <h3>0%</h3>
                <p className="desc">CTR</p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={9}>
              <div className="st-chart">
                <StLinearChart />
              </div>
            </Col>

            <Col sm={3}>
              <div className="st-chart">
                <StDoughnutChart/>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={12} className="st-chart-stats">
              <Stations showAddBtn={hideBtn} />
            </Col>
          </Row>
        </div>

      </section>
      </DocumentTitle>
    )
  }
});


export default Dashboard;
