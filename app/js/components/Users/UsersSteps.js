import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import UsersActions      from '../../actions/UsersActions';
import UsersStore        from '../../stores/UsersStore';

import UsersDetail        from './UsersDetail';
import UsersRole          from './UsersRole';
import UsersAdd           from './UsersAdd';

var UsersSteps = React.createClass({
  getInitialState: function(view) {
    var view = this.props.data;
    return {
      step : view
    }
  },

  saveValues: function(field_value) {
    return function() {
      fieldValues = assign({}, fieldValues, field_value)
    }.bind(this)()
  },

  nextStep: function(view) {
    console.log("next step:", view);
    this.setState({
      step : view
    })
  },

  previousStep: function(view) {
    console.log('previous: ', view);
    this.setState({
      step : view
    })
  },

  submitRegistration: function() {
    // Handle via ajax submitting the user data, upon
    // success return this.nextStop(). If it fails,
    // show the user the error but don't advance

    this.nextStep()
  },

  showStep: function(view) {
    switch (this.state.step) {
      case 'details':
        return <UsersDetail nextStep={this.nextStep}
                              previousStep={this.previousStep}
                              saveValues={this.saveValues} />
      case 'role':
        return <UsersRole nextStep={this.nextStep}
                             previousStep={this.previousStep}
                             saveValues={this.saveValues} />
      case 'add':
        return <UsersAdd nextStep={this.nextStep}
                            previousStep={this.previousStep}
                             submitRegistration={this.submitRegistration} />

    }
  },

  render: function(view) {
    return (
      <main>
        {this.showStep()}
      </main>
    )
  }
})

export default UsersSteps;
