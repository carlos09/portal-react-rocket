'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import { Grid, Row, Col, Form } from 'react-bootstrap';
var DropIn = require('braintree-react').DropIn;
var braintree = require('braintree-web');

// var gateway = braintree.connect({
//   environment: braintree.Environment.Sandbox,
//   merchantId: "5fqbndm634pg54z7",
//   publicKey: "p73wqsvxnnrvbqjm",
//   privateKey: "c9f5c66770c1d9c505e7332de8996cab"
// });

  var nonceReceived = function(event, nonce) {
    console.log(nonce);
  };

const Payments = React.createClass({

  render() {
    return (
      <DocumentTitle title="Payments">
        <section className="payments">

          <Row>
            <div className='container-fluid'>
              <Col sm={6} smOffset={3}>
                <form action="/transactions" method="GET">
                  <DropIn braintree={braintree} onNonceReceived={nonceReceived} />
                  <input type="submit" value="submit" />
                </form>
              </Col>
            </div>
          </Row>

        </section>
      </DocumentTitle>
    );
  }

});

export default Payments;
