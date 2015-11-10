var request = require('superagent');
import axios from 'axios';

var apiUrl = "http://dev.api.stationlocal.com/";

var API = {
  callToken: function (apiKey, cb) {
    var obj = {
      meta: {
        "apiKey": apiKey
      }
    };
    obj = JSON.stringify(obj);

    request
      .post( apiUrl + 'session/new')
      .send( obj )
      .end(cb);
  },

  callLogin: function(user, pw, tk, ak, cb) {
    // var config = {
    //   headers: {'X-Requested-With': 'XMLHttpRequest'}
    // };

    var obj = {
        "meta": {
        "apiKey": ak,
        "sessionToken": tk,
        "requestedAt":"{{timestamp}}",
        "request":"LOGIN_NATIVE"
        },
        "payload":{
            "username": user,
            "password": pw
        }
    };
    console.log('object is: ', obj);

    axios.post(apiUrl + 'login', obj)
    .then(function(response){
      console.log('success! ', response)
    });

    // request
    //   .post( apiUrl + 'login')
    //   .withCredentials()
    //   .set('Accept', 'application/json')
    //   .send( obj )
    //   .end(cb);
  }
}

module.exports = API;
