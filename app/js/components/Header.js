'use strict';

import React from 'react';
import {Link}        from 'react-router';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';

const Header = React.createClass({

  render(title) {
    return (
      <header>
        <div className="container-fluid">
          <Row>
            <Col sm={8}>
              <h1>{this.props.title}</h1>
              <h5>Home / {this.props.title}</h5>
            </Col>
            <Col sm={4}>
              <h5 className="text-right">Logged in as: @USERNAME</h5>
            </Col>
          </Row>
        </div>
      </header>
    );
  }

});

export default Header;
