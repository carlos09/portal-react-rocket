'use strict';

import React         from 'react/addons';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import { Grid, Row, Col, Form } from 'react-bootstrap';

const Dashboard = React.createClass({
  getInitialState() {
    return {
      stations: []
    }
  },
  componentDidMount() {
    var obj = {
      meta: {
        "apiKey": "21922323610bcce1f91d8c272d71a4a7299aabef",
        "sessionToken": "15a2de4f4c7e-e19da0f7-7f2c-48ff-a552-eb3d3aaae495cdcd4d0e556b7d6e7fe50757921cbf999bbb",
        "requestedAt":"{{timestamp}}",
        "request":"STATIONS"
      },
      payload: {
        "stationOffset":0,
        "stationCount":15
      }
    };
    obj = JSON.stringify(obj);

    var that = this;
    $.ajax({
      method: "POST",
      url: "http://dev.api.stationlocal.com/stations",
      data: obj,
      success: function(data){
        console.log('data is: ', data);
        var stations = data.Payload.Stations;
        that.setState({ stations: stations});
      },
      error: function(data) {
        console.log('There was an error with the request.');
      }
    });
  },
  onDrop(files) {
    console.log('Received files: ');
  },

  render() {
    if(this.state.stations) {
      var stationsList = this.state.stations;
    }
    return (
      <DocumentTitle title="Dashboard">
        <section className="dashboard">

          <div id="stations">
            <Row className="heading">
              <div className='container-fluid'>
                <Col sm={12}>
                  <h2><i className="material-icons">wifi_tethering</i> Stations</h2>
                </Col>
              </div>
            </Row>

            <div className="stations-list">
              {
                stationsList.map( function( station, i ){
                  return <div key={i} className='container-fluid station-view'>
                      <Col xs={1} className='vert-align-middle'>
                        <img src="http://placehold.it/150x150" className='img-responsive'/>
                      </Col>
                      <Col xs={7} className='vert-align-middle'>
                        <h4>{station.Identifier}</h4>
                      </Col>
                      <Col xs={3} className='vert-align-middle'>
                        <p className='listen'>Listening: {station.LastActivityAt}</p>
                      </Col>
                      <Col xs={1} className='vert-align-middle'>
                        <p className='edit-link'>edit</p>
                      </Col>
                    </div>
                })
              }
            </div>
          </div>

        </section>

      </DocumentTitle>
    );
  }

});

export default Dashboard;
