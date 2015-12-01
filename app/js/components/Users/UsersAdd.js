import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';

var UsersAdd = React.createClass({
  render: function() {
    return (
      <div className="animated fadeIn">
        <Row className="desc">
          <Col sm={12}>
            <span>Select which station you would like to add this user to</span>
          </Col>
        </Row>
        <Row className="column-titles">
          <Col sm={2} className="vert-align-middle">
            <span>Application Icon</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Application Name</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Station ID</span>
          </Col>
          <Col sm={3} className="vert-align-middle">
            <span>Station Title</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
          </Col>
          <Col sm={1} className="vert-align-middle">
          </Col>
        </Row>

        <hr />

        <Row className="details station" onClick={this.nextStep}>
          <Col sm={2} className="vert-align-middle">
            <img src="http://placehold.it/80x80" />
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Go Pro</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>235142314245</span>
          </Col>
          <Col sm={3} className="vert-align-middle">
            <span>Action Sports</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
          </Col>
          <Col sm={1} className="vert-align-middle">
          </Col>
        </Row>
        <Row className="details station" onClick={this.nextStep}>
          <Col sm={2} className="vert-align-middle">
            <img src="http://placehold.it/80x80" />
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>Go Pro</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
            <span>235142314245</span>
          </Col>
          <Col sm={3} className="vert-align-middle">
            <span>Action Sports</span>
          </Col>
          <Col sm={2} className="vert-align-middle">
          </Col>
          <Col sm={1} className="vert-align-middle">
          </Col>
        </Row>
      </div>
    )
  },
  nextStep: function(e) {
    e.preventDefault()

    this.props.nextStep('role');
  },
  previousStep:function() {
    this.this.props.previousStep('add');
  }
});

export default UsersAdd;
