import React         from 'react';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import {Link}        from 'react-router';
import McFly from 'McFly';
import InlineEdit from 'react-edit-inline';

/** McFly */

var Flux = new McFly();

/** Store */

var _affiliates = [];


var _usersList = [
  {
  "index": 1,
  "roletype": "3",
  "name": "Laurence",
  "username": "Vaughn",
  "fullname": "Joan Starr",
  "email": "leslie@barrett.tj"
  },
  {
  "index": 2,
  "roletype": "3",
  "name": "Clara",
  "username": "Nguyen",
  "fullname": "Edna Harvey",
  "email": "nathan@benton.gd"
  },
  {
  "index": 3,
  "roletype": "2",
  "name": "Shelley",
  "username": "Tilley",
  "fullname": "Dianne Hughes",
  "email": "jane@fox.ls"
  },
  {
  "index": 4,
  "roletype": "1",
  "name": "Erika",
  "username": "Shaffer",
  "fullname": "Alexander Kern",
  "email": "marvin@steele.be"
  },
  {
  "index": 5,
  "roletype": "1",
  "name": "Cynthia",
  "username": "Phillips",
  "fullname": "Emma Stephens",
  "email": "gary@reilly.gu"
  },
  {
  "index": 6,
  "roletype": "2",
  "name": "Douglas",
  "username": "Lindsay",
  "fullname": "Bradley Anthony",
  "email": "annie@park.gn"
  },
  {
  "index": 7,
  "roletype": "2",
  "name": "Jeff",
  "username": "Anderson",
  "fullname": "Lynne Barber",
  "email": "harvey@haynes.ao"
  },
  {
  "index": 8,
  "roletype": "3",
  "name": "Michelle",
  "username": "Hoyle",
  "fullname": "Paige Holmes",
  "email": "sandy@stanton.tr"
  },
  {
  "index": 9,
  "roletype": "1",
  "name": "Milton",
  "username": "Sawyer",
  "fullname": "Theresa Hanna",
  "email": "heidi@barton.id"
  },
  {
  "index": 10,
  "roletype": "1",
  "name": "Melanie",
  "username": "Schultz",
  "fullname": "Ronald Singer",
  "email": "diana@o.mq"
  }
];

function addAffiliate(data) {
    _usersList.push(data);
}

var UsersListStore = Flux.createStore({
  getAffiliates: function(){
     return _affiliates;
  },
  getAffiliatesList: function(){
    return _usersList;
  }
}, function(payload) {
  if(payload.actionType === "ADD_USERSLIST") {
    var newAffiliate = {
      index: payload.index,
      roletype: payload.roletype,
      name: payload.name,
      username: payload.username,
      fullname: payload.fullname,
      email: payload.email
    };
    addAffiliate(newAffiliate);
    UsersListStore.emitChange();
  }
});

/** Actions */

var UsersListActions = Flux.createActions({
  addAffiliate: function(data){
    return {
      actionType: "ADD_USERSLIST",
        index: data.index,
        roletype: data.roletype,
        name: data.name,
        username: data.username,
        fullname: data.fullname,
        email: data.email
    }
  }
});

function getState(){
   return {
       list: UsersListStore.getAffiliatesList()
   }
}

var Container = React.createClass({
    mixins: [UsersListStore.mixin],
  getInitialState: function(sectionList){
    return {
      openSectionIndex: -1,
      data: {
        index: '',
        roletype: '',
        name: '',
        username: '',
        fullname: '',
        email: ''
      }
    }
  },
  buildSections: function(sectionList){
    var users = sectionList.map(this.buildSection)
    return users;
  },
  buildSection: function(section, index){
      var openStatus = (index === this.state.openSectionIndex);
      var addStatus = this.state.status;

      return <Section key={index} id={index} data={section} toggleOne={this.toggleOne} open={openStatus} />
  },
  toggleOne: function(id){
    if(this.state.openSectionIndex === id){
      this.setState({openSectionIndex: -1});
    } else {
      this.setState({openSectionIndex: id});
    }
  },
  addAffiliate: function() {
    var newIndex = this.props.data.length + 1;
    var data = {
        index: '',
        roletype:'',
        name: 'Untitled User ' + newIndex,
        username: '',
        email: '',
        fullname: ''
    }
    UsersListActions.addAffiliate(data);
  },
  storeDidChange: function() {
    var newProps = this.props.data;
    this.buildSections(newProps);
    this.forceUpdate();
  },
  render: function() {
    var users = this.buildSections(this.props.data);
    return (
      <section className="userslist">
        <div className="container-fluid no-padding">

            {users}
            <span className="add" onClick={this.addAffiliate}><i className="fa fa-plus"></i> Add a User</span>

        </div>
      </section>
    );
  }
});

var Section = React.createClass({
  getInitialState: function() {
    if (this.props.data.username === "") {
      return {
        editing: true,
        status: 'pending',
        data: {
          name: this.props.data.name,
          username: this.props.data.username,
          email: this.props.data.email,
          fullname: this.props.data.fullname
        }
      }
    }else {
      return {
        editing: false,
        status: 'completed',
        data: {
          name: this.props.data.name,
          username: this.props.data.username,
          email: this.props.data.email,
          fullname: this.props.data.fullname
        }
      }
    }
  },
  toggleContent: function(){
    this.props.toggleOne(this.props.id)
  },
  getHeight: function(){
    if(this.props.open){
      return "open"
    } else {
      return "hidden"
    }
  },
  _enterEditMode: function(event) {
    event.preventDefault();
    this.setState({editing: true, status: 'pending'});
  },
  _cancelEditMode: function(event) {
    event.preventDefault();
    this.setState({editing: false, status: 'completed'});
  },
  _submit: function(event) {
    event.preventDefault();

    var data = {
      name: ReactDOM.findDOMNode(this.refs.name).value,
      username: ReactDOM.findDOMNode(this.refs.username).value,
      email: ReactDOM.findDOMNode(this.refs.email).value,
      fullname: ReactDOM.findDOMNode(this.refs.fullname).value
    };

    this._updateHandler(data);
    this.setState({editing: false, status: 'completed'});
  },
  render: function() {
    var styleClass = this.getHeight() === "open" ? " open" : "";
    var styleClassAnimate = this.getHeight() === 'open' ? 'open animated fadeIn' : 'hidden';
    var isOpen = this.getHeight() === "open" ? "" : "hidden";

    if (this.state.editing) {
      return (
        <div className="animated fadeIn padding-sides-20">
          <Row className={"section-content info section " + this.props.id + " open"}>
            <Col sm={10} className="vert-align-middle">
              <span className="affiliate-name">{this.state.data.name}</span>
            </Col>
            <Col sm={2} className="vert-align-middle text-right">
              <span className="cancel-btn" onClick={this._cancelEditMode}>Cancel</span>
            </Col>
          </Row>

          <Row className={"section-content details edit-mode open animated fadeIn"}>
            <form>
              <div className="container-fluid">
                <Col sm={12}>
                  <label>Name: </label>
                  <input type="text" name="name" ref="name" defaultValue={this.state.data.name}  />
                </Col>
                <Col sm={12}>
                  <label>Username: </label>
                  <input type="text" name="username" ref="username" defaultValue={this.state.data.username}  />
                </Col>
                <Col sm={12}>
                  <label>Email: </label>
                  <input type="text" name="email" ref="email" defaultValue={this.state.data.email}  />
                </Col>
              </div>
              <div className="container-fluid text-right">
                <Col sm={12} className="text-right">
                  <button className="btn btn-st orange" onClick={this._submit}>Save</button>
                </Col>
              </div>
            </form>
          </Row>
        </div>
      )
    } else {
      return (
        <div className="animated fadeIn padding-sides-20">
          <Row className={"section-content info section " + this.props.id + " " + styleClass}>
            <Col sm={10} className="vert-align-middle">
              <span className="affiliate-name">{this.state.data.name}</span>
              <i className={"fa fa-pencil " + isOpen} onClick={this._enterEditMode}></i>
            </Col>
            <Col sm={2} className="vert-align-middle text-right">
              <div className={"icon-trans vert-align-middle " + styleClass} onClick={this.toggleContent}>
                <i className="fa fa-plus"></i>
                <i className="fa fa-minus"></i>
              </div>
            </Col>
          </Row>

          <Row className={"section-content details edit " + styleClassAnimate}>
            <Col sm={12}>
              <label>Name: </label>
              <span className="title">{this.state.data.name}</span>
            </Col>
            <Col sm={12}>
              <label>Username: </label>
              <span className="title">{this.state.data.username}</span>
            </Col>
            <Col sm={12}>
              <label>Email: </label>
              <span className="title">{this.state.data.email}</span>
            </Col>
          </Row>
        </div>
      );
    }
  },
  _updateHandler: function(data) {
    var state = this.state;

    state.data.name = data.name;
    state.data.username = data.username;
    state.data.fullname = data.fullname;
    state.data.email = data.email;

     this.setState(state);
  }
});

/** Controller View */

var UsersList = React.createClass({
  getInitialState:function() {
    return getState();
  },
  render: function() {
    return <Container data={_usersList} />;
  }
});


export default UsersList;
