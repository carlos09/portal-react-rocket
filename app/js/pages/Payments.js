'use strict';

import React         from 'react/addons';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
var DropIn = require('braintree-react').DropIn;
var braintree = require('braintree-web');

const Payments = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <DocumentTitle title="Payments">
        <section className="payments">

          <div>
            Payment Page
          </div>

          <div>
            <Link to="/">Back to Home</Link>
          </div>

          <form action="/transactions" method="GET">
          <div id="payment-form"></div>
          <input type="submit" value="I need dis" />
        </form>

        </section>
      </DocumentTitle>
    );
  }

});

export default Payments;
