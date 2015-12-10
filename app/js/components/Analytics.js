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
const Analytics = React.createClass({
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


export default Analytics;
