import React         from 'react';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';

var UsersDetail = React.createClass({
  render: function() {
    return (
      <div className="animated fadeIn">
        <Row className="column-titles">
          <Col sm={2} className="vert-align-middle custom-st st-11">
            <span>Application Icon</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-20">
            <span>Application Name</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-20">
            <span>Station ID</span>
          </Col>
          <Col sm={3} className="vert-align-middle custom-st st-20">
            <span>Station Title</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Station Role</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-11">
            <span>Actions</span>
          </Col>
        </Row>

        <hr />

        <Row className="details">
          <Col sm={2} className="vert-align-middle custom-st st-11">
            <img src="http://placehold.it/80x80" />
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-20">
            <span>Go Pro</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-20">
            <span>235142314245</span>
          </Col>
          <Col sm={3} className="vert-align-middle custom-st st-20">
            <span>Action Sports</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Station Manager</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-11">
            <div className="icon-trans vert-align-middle ">
              <i className="zmdi zmdi-settings" onClick={this.nextStep}></i>
              <i className="zmdi zmdi-delete"></i>
            </div>
          </Col>
        </Row>
        <Row className="details">
          <Col sm={2} className="vert-align-middle custom-st st-11">
            <img src="http://placehold.it/80x80" />
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-20">
            <span>Go Pro</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-20">
            <span>235142314245</span>
          </Col>
          <Col sm={3} className="vert-align-middle custom-st st-20">
            <span>Action Sports</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Station Manager</span>
          </Col>
          <Col sm={2} className="vert-align-middle custom-st st-11">
            <div className="icon-trans vert-align-middle ">
              <i className="zmdi zmdi-settings" onClick={this.nextStep}></i>
              <i className="zmdi zmdi-delete"></i>
            </div>
          </Col>
        </Row>
      </div>
    )
  },
  nextStep: function(e) {
    e.preventDefault()

    this.props.nextStep('role')
  }
});

export default UsersDetail;
