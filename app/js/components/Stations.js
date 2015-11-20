import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import {Link}        from 'react-router';
import DropzoneJs     from './DropzoneJs';
import UsersList      from './UsersList';
import StationsActions      from '../actions/StationsActions';
import StationsStore        from '../stores/StationsStore';
var Switch = require('react-bootstrap-switch');

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

      return <Section key={index} id={index} data={section} toggleOne={this.toggleOne} open={openStatus} />
  },
  toggleOne: function(id){
    if(this.state.openSectionIndex === id){
      this.setState({openSectionIndex: -1});
    } else {
      this.setState({openSectionIndex: id});
    }
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
  render: function() {
    var sections = this.buildSections(this.props.data);
    return (
      <section className="stations">
        <div className="container-fluid stations-info">
          <Col sm={10} smOffset={1}>

            <Row className="section-heading">
              <Col sm={12}>
                <h2 className="heading">Manage Stations</h2>
              </Col>
            </Row>
            {sections}
            <Row className="section-content addNew">
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
    if (this.props.data.station_url === "") {
      return {
        editing: true,
        status: 'pending',
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
    }else {
      return {
        editing: false,
        status: 'completed',
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
    }
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
  render: function() {
    //console.log('props: ', this.props);
    //console.log('render state is: ', this.state);
    var styleClass = this.getHeight() === "open" ? " open" : "";
    var styleClassAnimate = this.getHeight() === 'open' ? 'open animated fadeIn' : 'hidden';
    var isOpen = this.getHeight() === "open" ? "" : "hidden";
    //var logoPreview = this.state.logoImgUrl === undefined ? 'hidden' : '';

    if (this.state.editing) {
      return (
        <div className="animated fadeIn">
          <Row className={"section-content info edit-mode section open " + this.props.id}>
            <Col sm={2} className="vert-align-middle">
              <img className="img-responsive" src={this.state.data.coverImg} />
            </Col>
            <Col sm={8} className="vert-align-middle">
                <span className="affiliate-name">{this.state.data.station_name}</span>
            </Col>
            <Col sm={2} className="vert-align-middle text-right">
              <span className="cancel-btn" onClick={this._cancelEditMode}>Cancel</span>
            </Col>
          </Row>

          <Row className={"section-content details edit-mode open animated fadeIn"}>
          <form>
            <div className="container-fluid">
              <Col sm={7}>
                <div className="img-upload-box">
                  <DropzoneJs onDrop={this.onAddCoverImg}>
                    <div className="dropArea">+ Drag file here to upload</div>
                     <img className={"upload-preview img-responsive "} ref="coverImg" src={this.state.data.coverImg} />
                  </DropzoneJs>
                </div>

                <div className="form-group title-row">
                  <label>Edit Station Name: </label>
                  <input ref="station_name" defaultValue={this.state.data.station_name} />
                </div>
                <div className="form-group title-row">
                  <label>Edit Station Title: </label>
                  <input ref="station_title" defaultValue={this.state.data.station_title} />
                </div>
                <div className="form-group title-row">
                  <label>Edit Station Url: </label>
                  <input ref="station_url" defaultValue={this.state.data.station_url} />
                </div>
                <div className="title-row">
                  <label>Edit Station Description: </label>
                  <textarea ref="description" defaultValue={this.state.data.description} cols="100" />
                </div>
                <div className="title-row">
                  <label>Privacy: </label>
                  <Switch size="small" state={this.state.data.privacy} onColor="st-on" offColor="st-off" onText="On" offText="Off" />

                  <span className="info-small">On - You are allowing anyone to view your Station and it's content.</span>
                  <span className="info-small">Off - Your Station is not viewable to the public.</span>
                </div>
                <div className="title-row">
                  <label>Public Posting: </label>
                  <Switch size="small" state={this.state.data.public_posting} value={this.state.data.public_posting} onColor="st-on" offColor="st-off" onText="On" offText="Off" ref="publicState" onChange={this.toggleChange} />

                  <span className="info-small">On - You are allowing anyone to publicly post on your Station.</span>
                  <span className="info-small">Off - Only you as an Admin are allowed to post on your Station.</span>
                </div>
              </Col>
              <Col sm={5}>
                <div className="title-row users">
                  <label>Station Admins: </label>
                  <span className="title">{this.props.data.username}</span>
                </div>
                <div className="title-row users">
                  <label>Station Contributors: </label>
                  <span className="title">{this.props.data.username}</span>
                </div>
                <UsersList />
              </Col>
            </div>
            <div className="container-fluid text-right">
              <button className="btn btn-st orange" onClick={this._submit}>Save</button>
            </div>
          </form>
        </Row>
      </div>
      )
    } else {
      return (
        <div className="animated fadeIn">
          <Row className={"section-content info section " + this.props.id + " " + styleClass}>
            <Col sm={2} className="vert-align-middle">
              <img className="img-responsive" src={this.state.data.coverImg} />
            </Col>
            <Col sm={8} className="vert-align-middle">
              <span className="affiliate-name">{this.state.data.station_name}</span>
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

          <Row className={"section-content details " + styleClassAnimate}>
            <Col sm={7}>
              <div className="title-row">
                <img className="img-responsive" src={this.state.data.coverImg} />
              </div>
              <div className="title-row">
                <label>Station Name: </label>
                <span className="title">{this.state.data.station_name}</span>
              </div>
              <div className="title-row">
                <label>Station Title: </label>
                <span className="title">{this.state.data.station_title}</span>
              </div>
              <div className="title-row">
                <label>Station Url: </label>
                <span className="title">{this.state.data.station_url}</span>
              </div>
              <div className="title-row">
                <label>Station Description: </label>
                <span className="title">{this.state.data.description}</span>
              </div>
              <div className="title-row">
                <label>Privacy: </label>
                <Switch size="small" state={this.state.data.privacy} disabled={true} onColor="st-on" offColor="st-off" onText="On" offText="Off" />

              </div>
              <div className="title-row">
                <label>Public Posting: </label>
                <Switch size="small" state={this.state.data.public_posting} disabled={true} onColor="st-on" offColor="st-off" onText="On" offText="Off" />

              </div>
            </Col>
            <Col sm={5}>
              <div className="title-row users">
                <label>Station Admins: </label>
                <span className="title">{this.props.data.username}</span>
              </div>
              <div className="title-row users">
                <label>Station Contributors: </label>
                <span className="title">{this.props.data.username}</span>
              </div>
              <UsersList />
            </Col>
          </Row>
        </div>
      );
    }
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
