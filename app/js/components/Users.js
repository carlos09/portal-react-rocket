import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import UsersActions      from '../actions/UsersActions';
import UsersStore        from '../stores/UsersStore';

function getState(){
   return {
       users: UsersStore.getUsers()
   }
}

var Container = React.createClass({
    mixins: [UsersStore.mixin],
  getInitialState: function(sectionList){
    return {
      openSectionIndex: -1,
      status: null,
      data: {
        name: '',
        username: '',
        company: '',
        email: ''
      }
    }
  },
  buildSections: function(sectionList){
    var sections = sectionList.map(this.buildSection)
    return sections;
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
  addUser: function() {
    var newIndex = this.props.data.length + 1;
    var data = {
        name: 'Untitled Affiliate ' + newIndex,
        username: '',
        email: '',
        company: ''
    }
    UsersActions.addUser(data);
  },
  storeDidChange: function() {
    var newProps = this.props.data;
    this.buildSections(newProps);
    this.forceUpdate();
  },
  render: function() {
    var sections = this.buildSections(this.props.data);
    return (
      <section className="users">
        <div className="container-fluid">
          <Col sm={12}>

            <Row className="section-heading hidden">
              <Col sm={12}>
                <h2 className="heading">Manage Affiliates</h2>
              </Col>
            </Row>
            {sections}

          </Col>
        </div>
      </section>
    );
  }
});


var Section = React.createClass({
  getInitialState: function() {
    console.log('new props', this.props);

    return {
      editing: false,
      status: 'completed',
      showModal: false,
      data: {
        userid: this.props.data._id,
        appName: this.props.data.appName,
        name: this.props.data.name,
        username: this.props.data.username,
        email: this.props.data.email,
        phone: this.props.data.phone,
        company: this.props.data.company
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
      company: ReactDOM.findDOMNode(this.refs.company).value
    };

    this._updateHandler(data);
    this.setState({editing: false, status: 'completed'});
  },
  detailsModal: function() {
    console.log('open modal');
    this.setState({showModal: true});
  },
  closeModal:function() {
    this.setState({ showModal: false });
  },
  render: function() {
    var styleClass = this.getHeight() === "open" ? " open" : "";
    var styleClassAnimate = this.getHeight() === 'open' ? 'open animated fadeIn' : 'hidden';
    var isOpen = this.getHeight() === "open" ? "" : "hidden";

    console.log('data state', this.state);

      return (
        <div className="animated fadeIn pre-row">
          <Row className={"section-row " + this.props.id + " " + styleClass}>
            <Col sm={1} className="vert-align-middle">
              <span>{this.state.data.userid}</span>
            </Col>
            <Col sm={2} className="vert-align-middle">
              <span>{this.state.data.username}</span>
            </Col>
            <Col sm={2} className="vert-align-middle">
              <span>{this.state.data.name}</span>
            </Col>
            <Col sm={3} className="vert-align-middle">
              <span>{this.state.data.email}</span>
            </Col>
            <Col sm={2} className="vert-align-middle">
              <span>{this.state.data.phone}</span>
            </Col>
            <Col sm={2} className="vert-align-middle">
              <div className="icon-trans vert-align-middle ">
                <i className="zmdi zmdi-forward" onClick={this.detailsModal}></i>
                <i className="zmdi zmdi-account-add"></i>
                <i className="zmdi zmdi-delete"></i>
              </div>
            </Col>
          </Row>

          <Modal className="user-modals" show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Row className="column-titles">
              <Col sm={2} className="vert-align-middle">
                <span>User ID</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Username</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Full Name</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>Email Address</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Email Address</span>
              </Col>
            </Row>

            <Row>
              <Col sm={2} className="vert-align-middle">
                <span>{this.state.data.userid}</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>{this.state.data.username}</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>{this.state.data.name}</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>{this.state.data.email}</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>{this.state.data.phone}</span>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body>
            <Row className="column-titles">
              <Col sm={2} className="vert-align-middle">
                <span>Application Icon</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Application Name</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Station ID</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>Station Title</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Station Role</span>
              </Col>
              <Col sm={1} className="vert-align-middle">
                <span>Actions</span>
              </Col>
            </Row>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </Modal.Body>
        </Modal>

        </div>
      );
  },
  _updateHandler: function(data) {
    var state = this.state;

    state.data.name = data.name;
    state.data.username = data.username;
    state.data.company = data.company;
    state.data.email = data.email;

     this.setState(state);
  }
});

/** Controller View */

var Users = React.createClass({
  getInitialState:function() {
    return getState();
  },
  render: function() {
    return <Container data={this.state.users} />;
  }
});

export default Users;
