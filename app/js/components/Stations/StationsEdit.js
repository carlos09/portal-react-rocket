import React         from 'react';
import ReactDOM         from 'react-dom';
import { Grid, Row, Col, Form, Modal } from 'react-bootstrap';
import {Link}        from 'react-router';
import DropzoneJs     from '../DropzoneJs';
var Toggle = require('react-toggle');
var TextSelect = require('react-textselect');



var StationsEdit = React.createClass({
  getInitialState: function() {
      return {
        selectedOption: 1,
        editing: false,
        status: 'completed',
        station_privacy: false,
        posting_perms: false,
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
  _enterEditMode: function(event) {
    event.preventDefault();
    console.log('edit state: ', this.state);
    this.setState({editing: true, status: 'pending'});
  },
  _cancelEditMode: function(event) {
    event.preventDefault();
    this.setState({editing: false, status: 'completed'});
  },
  _submit: function(event) {
    event.preventDefault();
    // var public_state = this.toggleChange() === "true" ? true : false;
    // var data = {
    //   station_name: ReactDOM.findDOMNode(this.refs.station_name).value,
    //   station_url: ReactDOM.findDOMNode(this.refs.station_url).value,
    //   station_title: ReactDOM.findDOMNode(this.refs.station_title).value,
    //   description: ReactDOM.findDOMNode(this.refs.description).value,
    //   coverImg: ReactDOM.findDOMNode(this.refs.coverImg).src,
    //   public_posting: public_state
    // };
    // this._updateHandler(data);
    // this.setState({editing: false, status: 'completed'});
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
  handleEggsChange: function() {
    var state = !this.state.station_privacy;
    this.setState({ station_privacy: state })
  },
  handlePostingPermsToggle: function() {
    var state = !this.state.posting_perms;
    this.setState({ posting_perms: state })
  },
  render: function() {
    console.log('modal state: ', this.state);

    if (this.state.editing) {
      return (
        <div className="animated fadeIn">
          <Row className="column-titles">
            <Col sm={7}>
              <div className="station-section">
                <h3 className="sub-heading">Station Cover Image</h3>
                <div className="stations-coverImg">
                  <DropzoneJs onDrop={this.onAddCoverImg}>
                    <i className="zmdi zmdi-close-circle remove-btn hidden"></i>
                    <div className="dropArea">+ Drag file here to upload</div>
                     <img className={"upload-preview img-responsive "} ref="coverImg" src={this.state.data.coverImg} />
                  </DropzoneJs>
                </div>
              </div>
              <div className="station-section">
                <h3 className="sub-heading">Station Description</h3>
                <textarea ref="description" defaultValue={this.state.data.description}/>
              </div>
            </Col>
            <Col sm={5}>
              <div className="station-section">
                <h3 className="sub-heading">Station ID</h3>
                <span>{this.state.data.station_title}</span>
              </div>
              <div className="station-section">
                <h3 className="sub-heading">Station Name</h3>
                <input ref="station_name" defaultValue={this.state.data.station_name}></input>
              </div>
              <div className="station-section">
                <h3 className="sub-heading">URL</h3>
                <input ref="station_url" defaultValue={this.state.data.station_url}></input>
              </div>
              <div className="station-section">
                <h3 className="sub-heading">Category</h3>
                  <TextSelect
                    options={['Station Manager', 'Listener', 'Contributor']}
                    active={this.state.selectedOption}
                    onChange={this.onTextSelectChange} />
              </div>
              <div className="station-section">
                <h3 className="sub-heading">Station Privacy</h3>
                <span>Public Private</span>
                  <Toggle
                  defaultChecked={this.state.station_privacy}
                  aria-label="No label tag"
                  ref="sometoggle"
                  showIcons="false"
                  onChange={this.handleEggsChange} />
                <span>No label tag</span>
              </div>
              <div className="station-section">
                <h3 className="sub-heading">Posting Permissions</h3>
                  <span className="vert-align-middle">Public</span>
                    <Toggle
                    defaultChecked={this.state.posting_perms}
                    showIcons={false}
                    onChange={this.handlePostingPermsToggle} />
                  <span className="vert-align-middle">Admin Only</span>
              </div>
              <div className="section-controls text-right">
                <button className="btn btn-st orange outline" onClick={this._cancelEditMode}>Cancel</button>
                <button className="btn btn-st orange">Save</button>
              </div>
            </Col>
          </Row>
        </div>
      )
    } else {
      return (
        <div className="animated fadeIn">
          <Row className="col-titles">
            <Col sm={2} className="vert-align-middle">
              <span>Station Cover Image</span>
            </Col>
            <Col sm={2} className="vert-align-middle">
              <span>Station ID</span>
            </Col>
            <Col sm={3} className="vert-align-middle">
              <span>Station Name</span>
            </Col>
            <Col sm={3} className="vert-align-middle">
              <span>URL</span>
            </Col>
            <Col sm={2} className="vert-align-middle">
              <span>Actions</span>
            </Col>
          </Row>

          <div className="animated fadeIn pre-row">
            <Row className={"section-row info section "}>
              <Col sm={2} className="vert-align-middle">
                <img className="img-responsive" src={this.state.data.coverImg} />
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>{this.state.data.station_title}</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>{this.state.data.station_name}</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>{this.state.data.station_url}</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <div className="icon-trans vert-align-middle ">
                  <i className="zmdi zmdi-edit" onClick={this._enterEditMode}></i>
                  <i className="zmdi zmdi-account-add"></i>
                  <i className="zmdi zmdi-delete"></i>
                </div>
              </Col>
            </Row>

            <Row className="col-titles">
              <Col sm={4} className="vert-align-middle">
                <span>Station Description Image</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>Category</span>
              </Col>
              <Col sm={2} className="vert-align-middle">
                <span>Station Privacy</span>
              </Col>
              <Col sm={3} className="vert-align-middle">
                <span>Posting Permissions</span>
              </Col>
            </Row>

            <Row className={"section-row info section "}>
              <Col sm={4} className="vert-align-top">
                <span>{this.state.data.description}</span>
              </Col>
              <Col sm={3} className="vert-align-top">
                <span>{this.state.data.station_name}</span>
              </Col>
              <Col sm={2} className="vert-align-top greyed-out">
                <span className="disabled toggle"></span>
                <span className="vert-align-middle">Public</span>
                  <Toggle
                  defaultChecked={this.state.station_privacy}
                  showIcons={false}
                  />
                <span className="vert-align-middle">Private</span>
              </Col>
              <Col sm={3} className="vert-align-top greyed-out">
                <span className="disabled toggle"></span>
                <span className="vert-align-middle">Public</span>
                  <Toggle
                  defaultChecked={this.state.posting_perms}
                  showIcons={false}
                  />
                <span className="vert-align-middle">Admin Only</span>
              </Col>
            </Row>
          </div>
        </div>
      )
    }
  }
});

export default StationsEdit;
