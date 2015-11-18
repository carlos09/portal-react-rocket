import React         from 'react/addons';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import {Link}        from 'react-router';
import McFly from 'McFly';
import InlineEdit from 'react-edit-inline';
var Switch = require('react-bootstrap-switch');

/** McFly */

var Flux = new McFly();

/** Store */

var _Stations = [];

var _stationsList = [
  {
    index: 65655,
    station_name: "Some Name",
    station_url: "stranger@danger.com",
    station_title: "Station",
    description: "Cras ut nunc elementum, egestas tortor nec, dignissim turpis. Integer ex nisi, commodo sit amet erat vitae, sagittis mollis nisi. Curabitur sed leo pretium ex maximus ornare. In rhoncus posuere eros, non sollicitudin diam tristique in.",
    coverImg: "http://a.espncdn.com/media/motion/2010/1228/actionsports20101227chadreed.jpg"
  },
  {
    index: 6432,
    station_name: "Some Name2",
    station_url: "stranger2@danger.com",
    station_title: "Go Pro",
    description: "Morbi leo erat, auctor eget dui vel, suscipit ullamcorper velit. Praesent vulputate, felis a lobortis efficitur, diam neque ornare lacus, id hendrerit ante lacus vel justo.",
    coverImg: "http://latimesblogs.latimes.com/photos/uncategorized/2008/07/30/x_games.jpg"
  },
  {
    index: 65235,
    station_name: "Some Name3",
    station_url: "stranger3@danger.com",
    station_title: "Redbull",
    description: "Proin quis arcu at sapien molestie suscipit eu ut metus. Etiam at pretium arcu, eu vehicula nibh. Cras nec nunc ullamcorper, gravida leo quis, egestas sem.",
    coverImg: "http://image.redbull.com/rbx00390/0001/1/800/465/files/2613/8668/3825/ss_131130_BCONE_WING_HONG_0044.jpg"
  }
];
function addStation(data) {
    console.log('adding in... ', data);
    _stationsList.push(data);
}

function getStationsList(text){
  console.log('getStationsList()');
//  _stationsList.push(text);
}

var StationsStore = Flux.createStore({
  getStations: function(){
     return _stations;
  },
  getStationsList: function(){
    console.log('in store');
    return _stationsList;
  }
}, function(payload) {
  if(payload.actionType === "ADD_AFFILIATE") {
    var pendingStation = {
      id: payload.id,
      status: payload.status,
      open: payload.open,
      data: payload.data
    };
    addStation(pendingStation);
    StationsStore.emitChange();
  }
});

/** Actions */

var StationsActions = Flux.createActions({
  addStation: function(penAff){
    console.log('penAff', penAff);
    return {
      actionType: "ADD_AFFILIATE",
      id: penAff.id,
      open: penAff.open,
      status: penAff.status,
      data: penAff.data
    }
  }
});

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
        station_url: '',
        station_title: '',
        description: '',
        coverImg: ''
      }
    }
  },
  buildSections: function(sectionList){
    console.log('building.. ', sectionList);
    var sections = sectionList.map(this.buildSection)
    return sections;
  },
  buildSection: function(section, index){
      var openStatus = (index === this.state.openSectionIndex);
      var addStatus = this.state.status;

      /* Remember to add a 'key'. React wants you to add an identifier when you instantiate a component multiple times */
      return <Section key={index} id={index} data={section} toggleOne={this.toggleOne} open={openStatus} status={addStatus} />
  },
  addSections:function (stationsList) {
    console.log('new list:', stationsList);
    //
    // var additions = stationsList.map(this.addSection);
    // return additions;
  },
  addSection: function(addition, index) {
    return <Addition key={index} id={index} data={addition} status={addStatus}/>
  },
  toggleOne: function(id){
    if(this.state.openSectionIndex === id){
      this.setState({openSectionIndex: -1});
    } else {
      this.setState({openSectionIndex: id});
    }
  },
  addStation: function() {
    var newIndex = this.props.data.length;
    var newStation = {
      id: newIndex,
      open: false,
      status: 'pending',
      data: {
        name: '',
        username: '',
        emal: '',
        company: ''
      }
    }
    StationsActions.addStation(newStation);
  },
  storeDidChange: function() {
    var newProps = this.props.data;
    //this.setState(getStationsList());
    this.buildSections(newProps);
    this.forceUpdate();
  },
  render: function() {
    console.log('render!');
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
    console.log('component props: ', this.props);
    return {
      editing: false,
      data: {
        station_name: this.props.data.station_name,
        station_url: this.props.data.station_url,
        station_title: this.props.data.station_title,
        description: this.props.data.description,
        coverImg: this.props.data.coverImg
      }
    };
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
    this.setState({editing: true});
  },
  _cancelEditMode: function(event) {
    event.preventDefault();
    this.setState({editing: false});
  },
  _submit: function(event) {
    event.preventDefault();

    var data = {
      station_name: ReactDOM.findDOMNode(this.refs.station_name).value,
      station_url: ReactDOM.findDOMNode(this.refs.station_url).value,
      station_title: ReactDOM.findDOMNode(this.refs.station_title).value,
      description: ReactDOM.findDOMNode(this.refs.description).value
    };
    this._updateHandler(data);

    // Editing is still being handled by the Profile component
    this.setState({editing: false});
  },
  SwitchToggle: function(elm, state) {
    console.log('toggle!', state );
  },
  render: function() {
    //console.log('props: ', this.props);
    console.log('new state: ', this.state);
    var styleClass = this.getHeight() === "open" ? " open" : "";
    var styleClassAnimate = this.getHeight() === 'open' ? 'open animated fadeIn' : 'hidden';
    var isOpen = this.getHeight() === "open" ? "" : "hidden";

    if (this.state.editing) {
      return (
        <div className="animated fadeIn">
          <Row className={"section-content info edit-mode section " + this.props.id + " " + styleClass}>
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

          <Row className={"section-content details edit-mode " + styleClassAnimate}>
          <form>
            <div className="container-fluid">
              <Col sm={7}>
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
                  <input ref="description" defaultValue={this.state.data.description} />
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
                <Switch size="small" state="true" onColor="st-on" offColor="st-off" onText="On" offText="Off" />

                <span className="info-small">On - You are allowing anyone to view your Station and it's content.</span>
                <span className="info-small">Off - Your Station is not viewable to the public.</span>
              </div>
              <div className="title-row">
                <label>Public Posting: </label>
                <Switch size="small" state="false" onColor="st-on" offColor="st-off" onText="On" offText="Off" valueState="false" />

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
            </Col>
          </Row>
        </div>
      );
    }
  },
  _updateHandler: function(data) {
    var state = this.state;

    console.log('update state: ', data);

    state.data.station_name = data.station_name;
    state.data.station_title = data.station_title;
    state.data.station_url = data.station_url;
    state.data.description = data.description;
    //state.data.coverImg = data.coverImg;

    // The value is saved raw
    // state.user.username = newUsername;
     this.setState(state);
  },
});


/** Controller View */

var Stations = React.createClass({
  getInitialState:function() {
    return getState();
  },
  onChange: function() {
    console.log('change!2');
  },
  render: function() {
    return <Container data={_stationsList} />;
  }
});


export default Stations;
