import React         from 'react/addons';
import { Grid, Row, Col, Form } from 'react-bootstrap';
var ColorPicker = require('react-color-picker');

var COLOR = '#000000';

const Assets = React.createClass ({
  getInitialState() {
    return { isActive: false, logoColor: '' }
  },
  handleCpBox() {
    var active = !this.state.isActive;
    this.setState({ isActive: active });
  },
  onDrop(files) {
    console.log('Received files: ', files);
  },
  onDrag: function(color) {
    COLOR = color
    this.setState({ logoColor: COLOR })
  },
  render() {
    var dropzoneStyles = {
      border: "none"
    };

    var colorBoxState = this.state.isActive;

    if( colorBoxState === true ){
      var CP = <ColorPicker value={COLOR} onDrag={this.onDrag} saturationWidth={200} saturationHeight={200} />;
    } else {
      var CP = '';
    }

    console.log('state is: ', this.state);

    return (
      <section className="assets">
        <Row className="heading">
          <div className='container-fluid'>
            <Col sm={12}>
              <h2><i className="material-icons">web</i> Assets</h2>
            </Col>
          </div>
        </Row>


        <div className="container-fluid asset-info text-center">
          <Col sm={10} smOffset={1}>
            <h3 className='heading'>Logo and Color</h3>
            <p className='upload-info'>Please upload a image that is at minimum 1000 x 1000 pixels. We ask that you please submit a png with no background. We will use the color as your accent color throughout the app.</p>
            <p className='upload-sub-info'>Please Note: Everytime this logo or color is updated, we will need to resubmit your app to their respective app stores.</p>

            <div id="logo-upload">
              <Dropzone onDrop={this.onDrop} style={dropzoneStyles}>
                <div className="dropArea">Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
            </div>

            <div className="container-fluid" className="color-picker-container">
              <Col sm={2} smOffset={3} className="text-right vert-align-middle">
                <div className="color-hex">{COLOR}</div>
              </Col>
              <Col sm={6} className="text-left vert-align-middle">
                {CP}
                <div style={{background: COLOR, width: 50, height: 50, color: 'white', cursor: 'pointer'}} onClick={this.handleCpBox}></div>
              </Col>
            </div>

          </Col>
        </div>

      </section>
    );
  }

});

export default Assets;
