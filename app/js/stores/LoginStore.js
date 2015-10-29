import Flux             from '../flux';

var _logins = [];
var _errors = '';
var _token = '';

function tokenAction(tk){
  _token = tk;
}
function loginActions(creds){
  _logins.push(creds);
  clearError();
}

function errorAction(msg) {
  _errors = msg;
}

function clearRecipes(){
    _logins = [];
}

function clearError() {
  _errors = '';
}

var LoginStore = Flux.createStore({
  getToken: function() {
    return _token;
  },
  getLogins: function(){
    return _logins;
  },
  checkLogin: function() {
    return _errors;
  }
}, function(payload){
  if(payload.actionType === "LOGIN_SUCCESS") {
    var creds = ({
      username: payload.username,
      password: payload.password,
      userid: payload.userid,
      i: payload.i
    });
    loginActions(creds);
    LoginStore.emitChange();
  }
  if(payload.actionType === "LOGIN_FAIL") {
    errorAction(payload.message);
    LoginStore.emitChange();
  }
  if(payload.actionType === "CLEAR_ERROR") {
    clearError();
    LoginStore.emitChange();
  }
  if(payload.actionType === "GET_TOKEN") {
    tokenAction(payload.token);
    LoginStore.emitChange();
  }
});

module.exports = LoginStore;
