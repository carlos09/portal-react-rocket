'use strict';

import React  from 'react';
import ReactDOM         from 'react-dom';
import Routes from './Routes';
import Bootstrap from 'react-bootstrap';
//var braintree = require('braintree-web');
window.$                  = require('jquery');
window.Dropzone 			    = require('react-dropzone');
window.request 		       	= require('superagent');
window.axios              = require('axios')

if ( process.env.NODE_ENV !== 'production' ) {
  // Enable React devtools
  window.React = React;
}

ReactDOM.render(Routes, document.getElementById('app'));
