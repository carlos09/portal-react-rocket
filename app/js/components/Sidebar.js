'use strict';

import React from 'react/addons';
import {Link}        from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';

const Sidebar = React.createClass({

  render() {
    return (
      <div id="sidebar" role="navigation" className="col-sm-3 col-md-2 sidebar-offcanvas">

        <div className="container-fluid nav">

          <Row>
            <Col xs={12} className="text-center profile-welcome">
              <Link to="/"><img className="st-logo" src="/images/logos/station-logo.png" /></Link>
                <div className="avatar"></div>

                <div className="welcome">Hello, Private Label</div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="text-center">
              <ul id="nav-list">
                <li><Link to="/search"><i className="material-icons md-24">wifi_tethering</i> Search</Link></li>
                <li><Link to="/users"><i className="material-icons md-24">people</i> Users</Link></li>
                <li><Link to="/payments"><i className="material-icons md-24">credit_card</i> Payments</Link></li>
                <li><Link to="/dashboard"><i className="material-icons md-24">dashboard</i> Dashboard</Link></li>
                <li><Link to="/login"><i className="material-icons md-24">keyboard_tab</i> Login</Link></li>
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

});

export default Sidebar;
