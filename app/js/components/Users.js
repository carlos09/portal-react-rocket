import React         from 'react/addons';
import { Grid, Row, Col, Form } from 'react-bootstrap';
var ColorPicker = require('react-color-picker');

var COLOR = '#000000';

const Users = React.createClass ({
  getInitialState() {
    return {
      isActive: false,
      overlayState: false
     }
  },
  overlayClick: function() {
    //this.setState({ overlayState: !this.state.overlayState });
    this.handleCpBox();
  },
  render() {
    var overlayClass = this.state.overlayState === false ? 'hidden' : '';

    console.log('state is: ', this.state);

    return (
      <section className="users">
        <div className={"st-overlay light " + overlayClass} onClick={ this.overlayClick }></div>

        <div className="container-fluid users-info">
          <Col sm={10} smOffset={1}>

            <Row className="section-heading">
              <Col sm={12}>
                <h2 className="heading">Station Name 1</h2>
              </Col>
            </Row>

            <Row className="section-content info heading">
              <Col sm={3} className="vert-align-middle">
                <span className="username title"><i className="fa fa-at"></i> Username</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span className="email title"><i className="fa fa-envelope"></i> Email Address</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span className="role title"><i className="fa fa-user"></i> User Type</span>
              </Col>
              <Col sm={4} className="vert-align-middle">
                <span className="role title"><i className="material-icons md-18">wifi_tethering</i> Stations</span>
              </Col>
            </Row>

            <Row className="section-content info">
              <Col sm={3} className="vert-align-middle">
                <span className="username">@username1</span>
              </Col>

              <Col sm={3} className="vert-align-middle">
                <span className="email">email@stationlocal.com</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span className="role">Admin</span>
              </Col>
              <Col sm={4} className="vert-align-middle">
                <span className="stations"><span className="sub-heading">Go Pro:</span> Action Sports, Dogs, Surfing</span>
              </Col>
            </Row>

            <Row className="section-content info">
              <Col sm={3} className="vert-align-middle">
                <span className="username">@username1</span>
              </Col>

              <Col sm={3} className="vert-align-middle">
                <span className="email">email@stationlocal.com</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span className="role">Admin</span>
              </Col>
              <Col sm={4} className="vert-align-middle">
                <span className="stations"><span className="sub-heading">Go Pro:</span> Action Sports, Dogs, Surfing</span>
              </Col>
            </Row>

            <Row className="section-content addNew">
              <Col sm={12}>
                <span className="add"><i className="fa fa-plus"></i> Add a User</span>
              </Col>
            </Row>

          </Col>
        </div>

      </section>
    );
  }

});

export default Users;
