import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import McFly from 'McFly';
import InlineEdit from 'react-edit-inline';

/** McFly */

var Flux = new McFly();

/** Store */

var _affiliates = [];
var _affList = [{
    index: 65655,
    name: "Some Name",
    username: "stranger",
    email: "stranger@danger.com"
}];

function addTodo(text){
    _affiliates.push(text);
}

function cancelAff(key){
    _affiliates.splice( key, 1);
}

function saveAff(affObj){
  console.log('the object is: ', affObj);
    _affList.push(affObj);

    var affIndex = affObj.index;
    cancelAff(affIndex);
}

function updateAff(updatedObj){
  var i = updatedObj.index;
  var name = updatedObj.name;
  console.log('updatedObj() ', updatedObj);
  console.log('current list: ', _affList[i]);

  _affList[i].push({name: name});

    //_affList.set(updatedObj);
    //
    // var affIndex = affObj.index;
    // cancelAff(affIndex);
}

var AffiliatesStore = Flux.createStore({
    getTodos: function(){
      console.log('getTodos()');
       return _affiliates;
    },
    getAffList: function(){
      console.log('getAffList()');
       return _affList;
    }
}, function(payload){
    if(payload.actionType === "ADD_AFFILIATES") {
        addTodo(payload.text);
        AffiliatesStore.emitChange();
    }
    if(payload.actionType === "CANCEL_AFFILIATE") {
      cancelAff(payload.num);
      AffiliatesStore.emitChange();
    }
    if(payload.actionType === "SAVE_AFFILIATE") {
      var affObj = ({
        name: payload.name,
        username: payload.username,
        email: payload.email,
        index: payload.index
      });

      saveAff(affObj);
      AffiliatesStore.emitChange();
    }
    if(payload.actionType === "UPDATE_AFFILIATE") {
      var updatedObj = ({
        index: payload.index,
        name: payload.data
      });
      updateAff(updatedObj);
      AffiliatesStore.emitChange();
    }
});

/** Actions */

var AffiliatesActions = Flux.createActions({
    addTodo: function(text){
       return {
          actionType: "ADD_AFFILIATES",
          text: text
       }
    },
    cancelAff: function(num) {
      return {
        actionType: "CANCEL_AFFILIATE",
        key: num
      }
    },
    saveAff: function(name, username, email,index) {
      return {
        actionType: "SAVE_AFFILIATE",
        name: name,
        username: username,
        email: email,
        index: index
      }
    },
    updateAff: function(index, data) {
      console.log('updatedAff()', index);
      console.log('updated data is: ', data.name);
      var name = data.name;
      return {
        actionType: "UPDATE_AFFILIATE",
        index: index,
        data: name
      }
    }
});

function getState(){
   return {
       todos: AffiliatesStore.getTodos(),
       list: AffiliatesStore.getAffList()
   }
}

function getAffList(){
   return {
       list: AffiliatesStore.getAffList()
   }
}

/** Controller View */

var Affiliates = React.createClass({
    mixins: [AffiliatesStore.mixin],
    getInitialState: function(){
        return getState();
    },
    onChange: function() {
        this.setState(getState());
    },
    render: function() {
      console.log('state is: ', this.state);
        return <Todos todos={this.state.todos} list={this.state.list} />;
    }
});

/** Controller View */

var AffiliateList = React.createClass({
    mixins: [AffiliatesStore.mixin],
    getInitialState: function(){
        return getAffList();
    },
    onChange: function() {
        this.setState(getAffList());
    },
    render: function() {
        return <AffList list={this.state.list} />;
    }
});

/** Component */

var Todos = React.createClass({
  getInitialState: function() {
    return {
      editState: false
    }
  },
  editAffiliate: function() {
    var active = !this.state.editState;
    this.setState({ editState: active });
  },
    addTodo: function(){
        AffiliatesActions.addTodo('test');
    },
    cancelAff: function(num) {
      AffiliatesActions.cancelAff(num);
    },
    saveAff: function(index) {

      console.log('passed index: ' + index);
      var name = ReactDOM.findDOMNode(this.refs.affname).value;
      var username = ReactDOM.findDOMNode(this.refs.affusername).value;
      var email = ReactDOM.findDOMNode(this.refs.affemail).value;

      AffiliatesActions.saveAff(name, username, email, index);
    },
    dataChanged: function(index, data) {
        console.log('some change: ', data.key);
        console.log('data change index:', index);

        AffiliatesActions.updateAff(index, data);
    },
    render: function() {
      //console.log('props are: ', this.props);

      console.log('state is: ', this.state);
      var editClass = this.state.editState === false ? 'animated fadeOutUp hidden' : 'animated fadeInDown';
      var editClassMain = this.state.editState === false ? '' : 'edit-aff';

    return (
      <section className="affiliates">
        <div className="container-fluid affiliates-info">
          <Col sm={10} smOffset={1}>

            <Row className="section-heading">
              <Col sm={12}>
                <h2 className="heading">Manage Affiliates</h2>
              </Col>
            </Row>

            { this.props.list.map(function(list, index) {
              console.log('INDEX IS: ', index);

              return <div key={index}>
                <Row className={"section-content info " + editClassMain}>
                  <Col sm={11} className="vert-align-middle">
                    <span className="affiliate-name">{list.name}</span>
                    <span className="edit" onClick={this.editAffiliate.bind(this, index)}>edit</span>
                  </Col>

                  <Col sm={1} className="vert-align-middle">
                    <i className="affiliate-showmore material-icons">keyboard_arrow_right</i>
                  </Col>
                </Row>
                <Row className={"section-content details " + editClass}>
                  <Col sm={4}>
                    <label>Name:</label>
                    <span className="aff-name aff-details">
                      <InlineEdit
                        validate={this.customValidateText}
                        activeClassName="editing"
                        text={list.name}
                        paramName="name"
                        change={this.dataChanged.bind(this, index)}
                      />
                      <i className="material-icons edit">create</i>
                    </span>
                  </Col>
                  <Col sm={4}>
                    <label>Username:</label>
                    <span className="aff-name aff-details">
                      <InlineEdit
                        validate={this.customValidateText}
                        activeClassName="editing"
                        text={list.username}
                        paramName="username"
                        change={this.dataChanged.bind(this, index)}
                      />
                      <i className="material-icons edit">create</i>
                    </span>
                  </Col>
                  <Col sm={4}>
                    <label>Email:</label>
                    <span className="aff-name aff-details">
                      <InlineEdit
                        validate={this.customValidateText}
                        activeClassName="editing"
                        text={list.email}
                        paramName="email"
                        change={this.dataChanged.bind(this, index)}
                      />
                      <i className="material-icons edit">create</i>
                    </span>
                  </Col>
                </Row>
              </div>
            }.bind(this))}

            { this.props.todos.map(function(todo, index){
              var index = index++;
                return <div  key={index} className="animated fadeIn">
                <Row className="section-content add-affiliate head">
                  <Col sm={10} className="vert-align-middle">
                    <span className="affiliate-name">Untitled {index + 1}</span>
                  </Col>

                  <Col sm={2} className="vert-align-middle">
                    <button onClick={this.cancelAff.bind(this,index)} id="cancel-button" type="submit"
                      className="btn btn-st red outline cancel btn-sm">
                      Cancel
                   </button>
                  </Col>
                </Row>

                <Row className="section-content add-affiliate body">

                  <div id="login-form" role="form">
                    <div className="form-group col-sm-4">
                      <label>Name</label>
                      <input type="text" name="aff-name" ref="affname"></input>
                    </div>
                    <div className="form-group col-sm-4">
                      <label>Username</label>
                      <input type="text" name="aff-username" ref="affusername"></input>
                    </div>
                    <div className="form-group col-sm-4">
                      <label>Email Address</label>
                      <input type="text" name="aff-email" ref="affemail"></input>
                    </div>
                    <div className="form-group col-sm-12 text-right">
                      <button onClick={this.saveAff.bind(this, index)} id="login-button" type="submit"
                        className="btn btn-st orange btn-md">
                        Save {index}
                     </button>
                    </div>
                  </div>
                </Row>
              </div>

            }.bind(this))}

            <Row className="section-content addNew">
              <Col sm={12}>
                <span className="add" onClick={this.addTodo}><i className="fa fa-plus"></i> Add an Affiliate</span>
              </Col>
            </Row>

          </Col>
        </div>

      </section>
    );
  }
});

export default Affiliates;
