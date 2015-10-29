'use strict';

import Reflux             from 'reflux';

import StationsActions from '../actions/StationsActions';
import AuthAPI            from '../utils/AuthAPI';

const StationsStore = Reflux.createStore({

  init() {
    this.user = null;
    this.hasBeenChecked = false;

    this.listenTo(StationsActions.checkLoginStatus, this.checkLoginStatus);
    this.listenTo(StationsActions.login, this.loginUser);
    this.listenTo(StationsActions.logout, this.logoutUser);

    this.listenTo(StationsActions.stations, this.getStations);
  },

  setUser(user, cb = function(){}) {
    this.user = user;
    cb(null, this.user);
    this.trigger(null, this.user);
  },

  throwError(err, cb) {
    cb(err);
    this.trigger(err);
  },

  checkLoginStatus(cb = function(){}) {
    if ( this.user ) {
      this.setUser(this.user, cb);
    } else {
      AuthAPI.checkLoginStatus().then(user => {
        this.hasBeenChecked = true;
        this.setUser(user, cb);
      }).catch(err => {
        this.hasBeenChecked = true;
        this.throwError(err, cb);
      });
    }
  },

  loginUser(user, cb = function(){}) {
    AuthAPI.login(user).then(user => {
      this.setUser(user, cb);
    }).catch(err => {
      this.throwError(err, cb);
    });
  },

  logoutUser(cb = function(){}) {
    AuthAPI.logout(this.user).then(() => {
      this.setUser(null, cb);
    });
  }

});

export default StationsStore;
