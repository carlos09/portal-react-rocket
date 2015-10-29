'use strict';

import React            from 'react/addons';
import ReactDOM         from 'react-dom';
import {Link}           from 'react-router';
import DocumentTitle    from 'react-document-title';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import LoginActions     from '../actions/LoginActions';
import LoginStore       from '../stores/LoginStore';

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
    var username = ReactDOM.findDOMNode(this.refs.username).value;
    var password = ReactDOM.findDOMNode(this.refs.password).value;
    var token = ReactDOM.findDOMNode(this.refs.token).value;

    console.log('values are: ' + username + password + token);

    LoginActions.loginAction(username, password, token, apiKey);
  },
  render() {
    var sessToken = this.state.token;

    return (
      <DocumentTitle title="Station Login">
        <section className="login">

          <Row>
            <div className='container-fluid'>
              <Col sm={6} smOffset={3} className="text-center">
                <img id='station-logo' src='/imgs/logos/station/station-logo.svg' className="img-responsive" />
                <h2 className='page-title'>Client Dashboard</h2>

                <div id="login" className='st-initial-form'>
                  <input type="text" name="username" ref='username' placeholder='Login' />
                  <input type="password" name="password" ref='password' placeholder='Password' />
                  <input type="hidden" name="token" ref="token" value={sessToken} />

                  <a href="#" className='forgot-link'>Forgot Password</a>
                  <div className='btn st-btn' onClick={this.loginAction}>Sign In</div>

                </div>

              </Col>
            </div>
          </Row>

        </section>
      </DocumentTitle>
    );
  }

});

module.exports = Login;
