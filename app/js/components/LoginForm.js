import {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import classnames from 'classnames';

class UserLogin extends Component {

  constructor(props) {
    super(props);
    this.validatorTypes = {
      username: Joi.string().required().label('username').options({
        language: {
          any: {
            required: '{{key}} custom required message.',
            empty: 'please enter your {{key}}'
          },
          string: {
            base: '{{key}} custom string message.',
            email: '{{key}} custom email message.',
          }
        }
      }),
      password: Joi.string().label('password').options({
        language: {
          any: {
            required: '{{key}} custom required message.',
            empty: 'please enter your {{key}}'
          },
          string: {
            base: '{{key}} custom string message.',
            email: '{{key}} custom email message.',
          }
        }
      })
    };
    this.getValidatorData = this.getValidatorData.bind(this);
    this.renderHelpText = this.renderHelpText.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getValidatorData() {
    return {
      username: ReactDOM.findDOMNode(this.refs.username).value,
      password: ReactDOM.findDOMNode(this.refs.password).value
    };
  }

  render() {
    console.log('test', this.props);
    return (
      <form onSubmit={this.onSubmit} id="login" className="st-initial-form">
        <div className={this.getClasses('username')}>
          <input
            ref='username'
            type='text'
            className='form-control'
            placeholder='username or email'
            onBlur={this.props.handleValidation('username')}
          />

        </div>
        <div className={this.getClasses('password')}>
          <input
            ref='password'
            type='password'
            className='form-control'
            placeholder='password'
            onBlur={this.props.handleValidation('password')}
          />
        </div>
        <input type="hidden" ref="token" name="token" value={this.props.token} />
        {this.renderHelpText(this.props.getValidationMessages('username'))}
        {this.renderHelpText(this.props.getValidationMessages('password'))}

        <button className='btn btn-st orange' onClick={this.loginAction}>Sign In</button>
      </form>
    );
  }

  renderHelpText(message) {
    console.log('props', this.props);
    return (
     <span className='help-block animated fadeIn'>{message}</span>
    );
  }

  getClasses(field) {
    return classnames({
      'form-group': true,
      'has-error': !this.props.isValid(field)
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const onValidate = (error) => {
      if (error) {
        //form has errors; do not submit
      } else {
        //no errors; submit form
      }
    };
    this.props.validate(onValidate);
  }
}

UserLogin.propTypes = {
  errors: PropTypes.object,
  validate: PropTypes.func,
  isValid: PropTypes.func,
  handleValidation: PropTypes.func,
  getValidationMessages: PropTypes.func,
  clearValidations: PropTypes.func,
};

module.exports = validation(strategy)(UserLogin);
