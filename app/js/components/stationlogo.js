'use strict';

import React            from 'react/addons';
import { Grid, Row, Col, Form } from 'react-bootstrap';

var SVG = React.createFactory(require('react-svg'));

var StationLogo = React.createClass({
  render: function() {
    return SVG({
      path: '../../images/logos/station_logo_white.svg',
      // [Required] Local or remote (supports CORS)
      className: 'vectors',
      // [Optional] Binds a class to the svg
      evalScripts: false,
      // [Optional] Evals any javascript in the svg - [always|once|never]
      fallbackPath: '../../images/logos/station-logo.png',
      // [Optional]
      callback: function(svg) { console.log(svg); }
      // [Optional]
    });
  }

});

module.exports = StationLogo;
