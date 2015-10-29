'use strict';

import React              from 'react/addons';
import {ListenerMixin}    from 'reflux';

import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';
import Sidebar             from './components/Sidebar';

const App = React.createClass({

  mixins: [ListenerMixin],

  getInitialState() {
    return {
      currentUser: {},
      id: '',
      isLoggedIn : ''
    };
  },

  _onUserChange(err, user) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ currentUser: user || {}, error: null });
    }
  },

  componentWillMount() {
    console.log('About to mount App');
  },

  componentDidMount() {
    this.listenTo(CurrentUserStore, this._onUserChange);
    CurrentUserActions.checkLoginStatus();
  },

  renderChildren() {
    return React.cloneElement(this.props.children, {
      params: this.props.params,
      query: this.props.query,
      currentUser: this.state.currentUser
    });
  },

  render() {
    return (
      <div className="container-fluid">

        <div className="row row-offcanvas row-offcanvas-left">

        <Sidebar />

        <div id="portal-main" className="col-sm-9 col-md-10 main">
          {this.renderChildren()}
        </div>

        </div>
      </div>
    );
  }

});

export default App;
