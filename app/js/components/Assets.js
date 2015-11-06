import React         from 'react/addons';
import { Grid, Row, Col, Form } from 'react-bootstrap';
import DropzoneJs     from './DropzoneJs';
var ColorPicker = require('react-color-picker');

var COLOR = '#000000';

const Assets = React.createClass ({
  getInitialState() {
    return {
      isActive: false,
      overlayState: false,
      accentColor: '#000000',
      logoImgUrl: '',
      iconImgUrl: '',
      backgroundImgUrl: ''
     }
  },
  handleCpBox() {
    var active = !this.state.isActive,
        overlayActive = !this.state.overlayState;
    this.setState({ isActive: active, overlayState: overlayActive });
  },
  onDrop(files) {
    console.log('Received files: ', files);
  },
  onDrag: function(color) {
    COLOR = color
    this.setState({ accentColor: COLOR })
  },
  overlayClick: function() {
    //this.setState({ overlayState: !this.state.overlayState });
    this.handleCpBox();
  },
  onAddLogoImg: function(res){
    console.log('res: ', res);
    var newFile = {
      //id:uuid(),
      name:res.file.name,
      size: res.file.size,
      altText:'',
      caption: '',
      file:res.file,
      url:res.imageUrl
    };
    this.setState({
      logoImgUrl: newFile.url
    })
    console.log('new file is: ', newFile);
  },
  onAddIconImg: function(res){
    console.log('res: ', res);
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
      iconImgUrl: newFile.url
    })
  },
  onAddBgImg: function(res){
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
      backgroundImgUrl: newFile.url
    })
  },
  render() {
    var dropzoneStyles = {
      border: "none"
    };

    var colorBoxState = this.state.isActive;

console.log ('logo url state: ' + this.state.logoImgUrl);

    var overlayClass = this.state.overlayState === false ? 'hidden' : '';
    var logoPreview = this.state.logoImgUrl === undefined ? 'hidden' : '';
    var iconPreview = this.state.iconImgUrl === undefined ? 'hidden' : '';
    var backgroundPreview = this.state.backgroundImgUrl === undefined ? 'hidden' : '';

    if( colorBoxState === true ){
      var CP = <ColorPicker value={COLOR} onDrag={this.onDrag} saturationWidth={200} saturationHeight={200} />;
    } else {
      var CP = '';
    }

    console.log('state is: ', this.state);

    return (
      <section className="assets">
        <div className={"st-overlay light " + overlayClass} onClick={ this.overlayClick }></div>

        <div className="container-fluid asset-info">
          <Col sm={10} smOffset={1}>

            <Row className="section-heading">
              <Col sm={12}>
                <h2 className="heading">First, select your branding for the App:</h2>
              </Col>
            </Row>

            <Row className="section-content">
              <Col sm={5} className="vert-align-middle">
                <h3 className="title">Logo</h3>

                <p className="desc">Please upload a transparent PNG image that is 1000 x 1000 pixels.</p>
              </Col>

              <Col sm={5} smOffset={2} className="vert-align-middle">
                <div id="logo-upload">
                  <DropzoneJs onDrop={this.onAddLogoImg}>
                    <div className="dropArea">+ Drag file here to upload</div>
                     <img className={"upload-preview img-responsive " + logoPreview } ref="img" src={this.state.logoImgUrl} />
                  </DropzoneJs>
                </div>
              </Col>
            </Row>

            <Row className="section-content">
              <Col sm={5} className="vert-align-middle">
                <h3 className="title">Accent Color</h3>

                <p className="desc">We will use this color as your accent color throughout the Private Label app.</p>
              </Col>

              <Col sm={5} smOffset={2} className="vert-align-middle color-pick">
                {CP}
                <div className="vert-align-middle" style={{background: COLOR, width: 40, height: 40, color: 'white', cursor: 'pointer', position: 'relative', zIndex: 2, display: 'inline-block'}} onClick={this.handleCpBox}></div>
                <div className="color-hex vert-align-middle">{COLOR}</div>
              </Col>
            </Row>

            <Row className="section-content">
              <Col sm={5} className="vert-align-middle">
                <h3 className="title">App Icon</h3>

                <p className="desc">Please upload an image that is a minimum of 1024 x 1024 pixels. This will be used as the app icon for your app, across all platforms.</p>
              </Col>

              <Col sm={5} smOffset={2} className="vert-align-middle">
                <div id="logo-upload">
                  <DropzoneJs onDrop={this.onAddIconImg}>
                    <div className="dropArea">+ Drag file here to upload</div>
                     <img className={"upload-preview img-responsive " + logoPreview }  ref="img" src={this.state.iconImgUrl} />
                  </DropzoneJs>
                </div>
              </Col>
            </Row>

            <Row className="section-content">
              <Col sm={5} className="vert-align-middle">
                <h3 className="title">Background Image</h3>

                <p className="desc">Please upload an image that is a minimum of 1300 x 2300 pixels. This will be used as the main  image for your app, across all platforms. </p>
              </Col>

              <Col sm={5} smOffset={2} className="vert-align-middle">
                <div id="logo-upload">
                  <DropzoneJs onDrop={this.onAddBgImg}>
                    <div className="dropArea">+ Drag file here to upload</div>
                     <img className={"upload-preview img-responsive " + backgroundPreview }  ref="img" src={this.state.backgroundImgUrl} />
                  </DropzoneJs>
                </div>
              </Col>
            </Row>

            <Row className="section-content">
              <Col sm={5} className="vert-align-middle">
                <h3 className="title">Station PSD Template</h3>

                <p className="desc">This should help you find a background image that works best for you.</p>
                <p className="note">Made for Photoshop CC 2015.</p>
              </Col>

              <Col sm={5} smOffset={2} className="vert-align-middle">
                <div className="btn psd-dl">Download PSD<i className="material-icons">file_download</i></div>
              </Col>
            </Row>

            <Row className="section-content">
              <Col sm={12} className="vert-align-middle">
                <p className="desc">Please make sure these are the images and accent color you want. If you want to go back and change them after
pressing continue we will have to resumbit your app the the app store.</p>

                  <button className="btn btn-st orange">Continue <i className="fa fa-angle-double-right"></i></button>
              </Col>
            </Row>




          </Col>
        </div>

      </section>
    );
  }

});

export default Assets;
