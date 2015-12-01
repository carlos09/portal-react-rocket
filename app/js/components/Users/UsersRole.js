import React         from 'react/addons';
import ReactDOM      from 'react-dom';
import { Grid, Row, Col, Form, Modal,DropdownButton, MenuItem, Button } from 'react-bootstrap';
import {Link}        from 'react-router';
var TextSelect = require('react-textselect');

var UsersRole = React.createClass({
  getInitialState: function() {
    console.log('props are: ', this.props);
    return {
      selectedOption: 1
    }
  },
  onTextSelectChange: function(func, key, val) {
    console.log('new change', val);
    this.setState({
      selectedOption: key
    })
  },
  render: function() {
    console.log('options should be: ', this.state.selectedOption);
    return (
      <div className="animated fadeIn">
        <Row className="desc">
          <Col sm={12}>
            <span>Role: Select which station you would like to add this user to</span>
            <span onClick={this.previousStep}>Back</span>
          </Col>
        </Row>
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
          <Col sm={1} className="vert-align-middle custom-st st-11">
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
            <TextSelect
              options={['Station Manager', 'Listener', 'Contributor']}
              active={this.state.selectedOption}
              onChange={this.onTextSelectChange} />
          </Col>
          <Col sm={1} className="vert-align-middle custom-st st-11">
            <Button className="btn btn-st orange" bsSize="small">Save</Button>
          </Col>
        </Row>
      </div>
    )
  },
  nextStep: function(e) {
    e.preventDefault()

    this.props.nextStep('add')
  },
  previousStep:function() {
    console.log('this.props ', this.props);
    //this.this.props.previousStep('add');
  }
});

export default UsersRole;
