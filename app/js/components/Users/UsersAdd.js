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
            <span>ADD: Select which station you would like to add this user to</span>
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
            <span>Station Role</span>
          </Col>
          <Col sm={1} className="vert-align-middle">
            <span>Actions</span>
          </Col>
        </Row>

        <hr />

        <Row className="details">
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
            <span>Station Manager</span>
          </Col>
          <Col sm={1} className="vert-align-middle">
            <div className="icon-trans vert-align-middle ">
              <i className="zmdi zmdi-settings" onClick={this.detailsModal}></i>
              <i className="zmdi zmdi-delete"></i>
            </div>
          </Col>
        </Row>
        <Row className="details">
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
            <span>Station Manager</span>
          </Col>
          <Col sm={1} className="vert-align-middle">
            <div className="icon-trans vert-align-middle ">
              <i className="zmdi zmdi-settings" onClick={this.detailsModal}></i>
              <i className="zmdi zmdi-delete"></i>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
});

export default UsersAdd;
