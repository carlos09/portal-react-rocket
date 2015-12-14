'use strict';

import React            from 'react';
import ReactDOM         from 'react-dom';
import {Link}           from 'react-router';
import DocumentTitle    from 'react-document-title';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import LoginActions     from '../actions/LoginActions';
import LoginStore       from '../stores/LoginStore';
//import StationLogo      from './stationlogo';
import UserLogin       from './LoginForm';


var apiKey = "21922323610bcce1f91d8c272d71a4a7299aabef";

function getLogins(){
  return {
    token: LoginStore.getToken(),
    recipes: LoginStore.getLogins(),
    errors: LoginStore.checkLogin()
  }
}

var Login = React.createClass({
  mixins: [LoginStore.mixin],
  getInitialState() {
    return getLogins();
  },
  componentDidMount() {
    LoginActions.tokenAction(apiKey);
  },
  storeDidChange: function() {
    this.setState(getLogins());
  },
  loginAction: function() {
    console.log('refs are: ', this.refs);
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var token = ReactDOM.findDOMNode(this.refs.token).value;

    console.log('values are: ' + username + password + token);

    LoginActions.loginAction(username, password, token, apiKey);
  },
  render() {
    console.log('state: ', this.state);
    var sessToken = this.state.token;

    return (
      <DocumentTitle title="Station Login">
        <section className="login">

            <div className='container-fluid login-area'>
              <Col sm={10} smOffset={1}>

                <Row className="section-heading">
                  <Col sm={12} className="text-center">
                    <img className="st-logo" src="/images/logos/station-logo.png" />
                    <h2 className="heading">Sign In</h2>
                  </Col>
                </Row>

                <Row className="section-content">
                  <Col sm={4} smOffset={4} className="text-center">
                    <UserLogin token={sessToken} />
                    <a href="#" className='forgot-link'>Forgot Password</a>
                  </Col>
                </Row>

            </Col>
          </div>
        </section>
      </DocumentTitle>
    );
  }

});

module.exports = Login;
