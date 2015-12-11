import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import StLinearChart  from './Analytics/Chart';
import LineChartist  from './Analytics/LineChart';
import StDoughnutChart  from './Analytics/DoughnutChart';
import StatsTable  from './Analytics/StatsTable';
import Stations    from './Stations';
import DocumentTitle from 'react-document-title';


/** Controller View */
const Dashboard = React.createClass({
  componentDidMount: function() {
    console.log('mounted');
    $.ajax({
      method: "GET",
      url: "https://reportsapi.zoho.com/api/carlos.esquer@stationlocal.com/Database1/Reports?ZOHO_ACTION=EXPORT&ZOHO_OUTPUT_FORMAT=JSON&authtoken=d12551fd94f3fae018bec526f9ae04c0&ZOHO_API_VERSION=1.0",
      success: function(){
        console.log('data is: ', response);

      },
      error: function(data) {
        console.log('There was an error with the request.', data);
      }
    });

  },
  render: function() {
    var hideBtn = false;
    return (
      <DocumentTitle title="Dashboard">
      <section className="analytics">
        <div className="container-fluid">
          <Row className="monthly-stats">
            <Col sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-money"></i>
                <h3>$0.00</h3>
                <p className="desc">REVENUE</p>
              </div>
            </Col>
            <Col sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-eye"></i>
                <h3>0</h3>
                <p className="desc">IMPRESSIONS</p>
              </div>
            </Col>
            <Col sm={3}>
              <div className="stat-box">
                <i className="zmdi zmdi-money-box"></i>
                <h3>$0.00</h3>
                <p className="desc">ECPM</p>
              </div>
            </Col>
            <Col sm={3}>
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
