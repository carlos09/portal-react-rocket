import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import UsersList      from './UsersList';
import StationsActions      from '../actions/StationsActions';
import StationsStore        from '../stores/StationsStore';
import StationsEdit         from './Stations/StationsEdit';
var TextSelect = require('react-textselect');
import Switch from 'react-toggle-switch';

function getState(){
   return {
       list: StationsStore.getStationsList()
   }
}

var Container = React.createClass({
    mixins: [StationsStore.mixin],
  getInitialState: function(sectionList){
    console.log('props are: ', this.props);
    return {
      openSectionIndex: -1,
      status: null,
      data: {
        station_name: '',
        station_title: '',
        station_url: '',
        description: '',
        coverImg: '',
        privacy: '',
        public_posting: ''
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

      return <Section key={index} id={index} data={section} />
  },
  addStation: function() {
    var newIndex = this.props.data.length + 1;
    var data = {
      station_name: 'Untitled Station ' + newIndex,
      station_title: '',
      station_url: '',
      description: '',
      coverImg: '',
      privacy: false,
      public_posting: true
    }
    StationsActions.addStation(data);
  },
  storeDidChange: function() {
    console.log('change!');
    var newProps = this.props.data;
    this.buildSections(newProps);
    this.forceUpdate();
  },
  toggle: function(value) {
    // do something with value
    console.log('some toggle');
  },
  render: function() {
    var sections = this.buildSections(this.props.data);
    return (
      <section className="stations">
        <div className="container-fluid">
          <Col sm={12}>

            <Row className="col-titles">
              <Col sm={2} className="vert-align-middle custom-st st-20">
                <span>Station Cover Image</span>
              </Col>
              <Col sm={2} className="vert-align-middle custom-st st-20">
                <span>Station ID</span>
              </Col>
              <Col sm={2} className="vert-align-middle custom-st st-20">
                <span>Station Name</span>
              </Col>
              <Col sm={3} className="vert-align-middle custom-st st-27">
                <span>URL</span>
              </Col>
              <Col sm={2} className="vert-align-middle custom-st st-13">
                <span>Actions</span>
                  <div>
                      <Switch value={'some string or integer value'} on={true} onClick={this.toggle}/>
                  </div>
              </Col>
            </Row>
            {sections}
            <Row className="section-row addNew">
              <Col sm={12}>
                <span className="add" onClick={this.addStation}><i className="fa fa-plus"></i> Add an Station</span>
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
      return {
        showModal: false,
        data: {
          station_name: this.props.data.station_name,
          station_title: this.props.data.station_title,
          station_url: this.props.data.station_url,
          description: this.props.data.description,
          coverImg: this.props.data.coverImg,
          privacy: this.props.data.privacy,
          public_posting: this.props.data.public_posting
        }
      }
  },
  onTextSelectChange: function(func, key, val) {
    console.log('new change', val);
    this.setState({
      selectedOption: key
    })
  },
  toggleContent: function(){
    this.props.toggleOne(this.props.id)
  },
  toggleChange: function(state) {

    //var publicState = ReactDOM.findDOMNode(this.refs.pubposting).state;

    var test = state === true ? 'true' : 'false';
    return test;
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
    var public_state = this.toggleChange() === "true" ? true : false;
    var data = {
      station_name: ReactDOM.findDOMNode(this.refs.station_name).value,
      station_url: ReactDOM.findDOMNode(this.refs.station_url).value,
      station_title: ReactDOM.findDOMNode(this.refs.station_title).value,
      description: ReactDOM.findDOMNode(this.refs.description).value,
      coverImg: ReactDOM.findDOMNode(this.refs.coverImg).src,
      public_posting: public_state
    };
    this._updateHandler(data);
    this.setState({editing: false, status: 'completed'});
  },
  onDrop(files) {
    console.log('Received files: ', files);
  },
  onAddCoverImg: function(res){
    var newFile = {
      //id:uuid(),
      name:res.file.name,
      size: res.file.size,
      altText:'',
      caption: '',
      file:res.file,
      url:res.imageUrl
    };
    //this.executeAction(newImageAction, newFile);
    this.setState({
      data: {
        station_name: ReactDOM.findDOMNode(this.refs.station_name).value,
        coverImg: newFile.url
      }
    })
  },
  detailsModal: function() {
    console.log('open modal');
    this.setState({showModal: true});
  },
  closeModal:function() {
    this.setState({ showModal: false });
  },
  render: function() {
    //console.log('props: ', this.props);
    //console.log('render state is: ', this.state);
    var styleClass = this.getHeight() === "open" ? " open" : "";
    var styleClassAnimate = this.getHeight() === 'open' ? 'open animated fadeIn' : 'hidden';
    var isOpen = this.getHeight() === "open" ? "" : "hidden";
    //var logoPreview = this.state.logoImgUrl === undefined ? 'hidden' : '';

    console.log('state is:    ', this.state);
      return (
        <div className="animated fadeIn pre-row">
          <Row className={"section-row info section " + this.props.id + " " + styleClass}>
            <Col sm={2} className="vert-align-middle custom-st st-20">
              <img className="img-responsive" src={this.state.data.coverImg} />
            </Col>
            <Col sm={2} className="vert-align-middle custom-st st-20">
              <span>{this.state.data.station_title}</span>
              <i className={"fa fa-pencil " + isOpen} onClick={this._enterEditMode}></i>
            </Col>
            <Col sm={2} className="vert-align-middle custom-st st-20">
              <span>{this.state.data.station_name}</span>
            </Col>
            <Col sm={3} className="vert-align-middle custom-st st-27">
              <span>{this.state.data.station_url}</span>
            </Col>
            <Col sm={2} className="vert-align-middle custom-st st-13">
              <div className="icon-trans vert-align-middle ">
                <i className="zmdi zmdi-forward" onClick={this.detailsModal}></i>
                <i className="zmdi zmdi-account-add" onClick={this.addUsersModal}></i>
                <i className="zmdi zmdi-delete"></i>
              </div>
            </Col>
          </Row>

          <Modal className="station stations-modals" show={this.state.showModal} onHide={this.closeModal} details={this.state.details} addUser={this.state.addUser}>
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
              <StationsEdit data={this.state.data} />
            </Modal.Body>
          </Modal>
        </div>
      );
  },
  _updateHandler: function(data) {
    var state = this.state;

    state.data.station_name = data.station_name;
    state.data.station_title = data.station_title;
    state.data.station_url = data.station_url;
    state.data.description = data.description;
    state.data.coverImg = data.coverImg;

     this.setState(state);
  }
});

/** Controller View */

var Stations = React.createClass({
  getInitialState:function() {
    return getState();
  },
  render: function() {
    return <Container data={this.state.list} />;
  }
});


export default Stations;
