import Flux             from '../flux';
import API              from '../utils/API'

var LoginActions = Flux.createActions({
  tokenAction: function(ak) {
    API.callToken(ak, function (res, response) {

      var token = response.body.Payload.Token;
      console.log('response', token);
      LoginActions.hasToken(token);
    })
    // return {
    //   actionType: "UPDATE_INPUT_TEXT",
    //   text: text
    // }
    // var tk = '';
    // var obj = {
    //   meta: {
    //     "apiKey": apiKey
    //   }
    // };
    // obj = JSON.stringify(obj);
    //
    // $.ajax({
    //   method: "POST",
    //   url: "http://dev.api.stationlocal.com/session/new",
    //   data: obj,
    //   success: function(data){
    //     if( data.Success === true ) {
    //       var tk = data.Payload.Token;
    //       LoginActions.hasToken(tk);
    //     }
    //   },
    //   error: function(data) {
    //     console.log('There was an error with the request.');
    //   }
    // });
  },
  hasToken: function(tk){
    return {
      actionType: "GET_TOKEN",
      token: tk
    }
  },
  loginAction: function(username, password, token, apiKey){
    API.callLogin(username, password, token, apiKey, function (res, response) {
      console.log('response is: ', response);
//      console.log('almost..');
    })
  },
  loginSuccess: function(username, password, userid) {
    var count = 0;
    count ++;
    return {
      actionType: "LOGIN_SUCCESS",
      username: username,
      password: password,
      userid: userid,
      i: count
    }
  },
  loginFail: function (errorMsg) {
    return {
      actionType: "LOGIN_FAIL",
      message: errorMsg
    }
  },
  clearError: function() {
    return{
      actionType: "CLEAR_ERROR"
    }
  }
});

module.exports = LoginActions;
