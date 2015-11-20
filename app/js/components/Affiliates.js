import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import {Link}        from 'react-router';
import McFly from 'McFly';
import InlineEdit from 'react-edit-inline';
import AffiliatesActions      from '../actions/AffiliatesActions';
import AffiliatesStore        from '../stores/AffiliatesStore';

/** McFly */

var Flux = new McFly();

function getState(){
   return {
       list: AffiliatesStore.getAffiliatesList()
   }
}

var Container = React.createClass({
    mixins: [AffiliatesStore.mixin],
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
  addAffiliate: function() {
    var newIndex = this.props.data.length + 1;
    var data = {
        name: 'Untitled Affiliate ' + newIndex,
        username: '',
        email: '',
        company: ''
    }
    AffiliatesActions.addAffiliate(data);
  },
  storeDidChange: function() {
    var newProps = this.props.data;
    this.buildSections(newProps);
    this.forceUpdate();
  },
  render: function() {
    var sections = this.buildSections(this.props.data);
    return (
      <section className="affiliates">
        <div className="container-fluid affiliates-info">
          <Col sm={10} smOffset={1}>

            <Row className="section-heading">
              <Col sm={12}>
                <h2 className="heading">Manage Affiliates</h2>
              </Col>
            </Row>
            {sections}
            <Row className="section-content addNew">
              <Col sm={12}>
                <span className="add" onClick={this.addAffiliate}><i className="fa fa-plus"></i> Add an Affiliate</span>
              </Col>
            </Row>
          </Col>
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
          company: this.props.data.company
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
          company: this.props.data.company
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
      company: ReactDOM.findDOMNode(this.refs.company).value
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
        <div className="animated fadeIn">
          <Row className={"section-content info section " + this.props.id + " open"}>
            <Col sm={10} className="vert-align-middle">
              <span className="affiliate-name">{this.state.data.name}</span>
            </Col>
            <Col sm={2} className="vert-align-middle text-right">
              <span className="cancel-btn" onClick={this._cancelEditMode}>Cancel</span>
            </Col>
          </Row>

          <Row className={"section-content details edit open animated fadeIn"}>
            <form>
              <div className="container-fluid">
                <Col sm={3}>
                  <label>Name: </label>
                  <input type="text" name="name" ref="name" defaultValue={this.state.data.name}  />
                </Col>
                <Col sm={3}>
                  <label>Username: </label>
                  <input type="text" name="username" ref="username" defaultValue={this.state.data.username}  />
                </Col>
                <Col sm={3}>
                  <label>Email: </label>
                  <input type="text" name="email" ref="email" defaultValue={this.state.data.email}  />
                </Col>
                <Col sm={3}>
                  <label>Company: </label>
                  <input type="text" name="company" ref="company" defaultValue={this.state.data.company}  />
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
        <div className="animated fadeIn">
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
                <Link to="/stations"><i className="vert-align-middle affiliate-showmore material-icons">keyboard_arrow_right</i></Link>
            </Col>
          </Row>

          <Row className={"section-content details edit " + styleClassAnimate}>
            <Col sm={3}>
              <label>Name: </label>
              <span className="title">{this.state.data.name}</span>
            </Col>
            <Col sm={3}>
              <label>Username: </label>
              <span className="title">{this.state.data.username}</span>
            </Col>
            <Col sm={3}>
              <label>Email: </label>
              <span className="title">{this.state.data.email}</span>
            </Col>
            <Col sm={3}>
              <label>Company: </label>
              <span className="title">{this.state.data.company}</span>
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
    state.data.company = data.company;
    state.data.email = data.email;

     this.setState(state);
  }
});

/** Controller View */

var Affiliates = React.createClass({
  getInitialState:function() {
    return getState();
  },
  render: function() {
    return <Container data={this.state.list} />;
  }
});


export default Affiliates;
