const fakeDB = [
{
  username: 'Nick',
  password: 'hooper24' },

{
  username: 'Andy',
  password: 'baseballfan97' }];



class LoginOrSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'SigningUp',
      usernameInput: '',
      passwordInput: '',
      pwConfirmInput: '' };


    this.handleChooseLogin = this.handleChooseLogin.bind(this);
    this.handleChooseSignup = this.handleChooseSignup.bind(this);
    this.reset = this.reset.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChooseLogin() {
    this.setState({
      status: 'LoggingIn' });

  }

  handleChooseSignup() {
    this.setState({
      status: 'SigningUp' });

  }

  handleInputChange(e) {
    if (e.target.name == 'usernameInput') {
      this.setState({
        usernameInput: e.target.value });

    } else if (e.target.name == 'passwordInput') {
      this.setState({
        passwordInput: e.target.value });

    } else {
      this.setState({
        pwConfirmInput: e.target.value });

    }
  }

  reset() {
    this.setState({
      status: '',
      usernameInput: '',
      passwordInput: '',
      pwConfirmInput: '' });

  }

  render() {
    const currentStatus = this.state.status;

    if (currentStatus == '') {
      return /*#__PURE__*/(
        React.createElement("div", { id: "main-box" }, /*#__PURE__*/
        React.createElement("div", { id: "starter-buttons" }, /*#__PURE__*/
        React.createElement("button", { onClick: this.handleChooseLogin }, "Login"), "\xA0 or \xA0", /*#__PURE__*/

        React.createElement("button", { onClick: this.handleChooseSignup }, "Sign Up"))));



    } else if (currentStatus == 'LoggingIn') {
      return /*#__PURE__*/(
        React.createElement("div", { id: "main-box" }, /*#__PURE__*/
        React.createElement(LoginView, {
          goHome: this.reset,
          handleInputChange: this.handleInputChange,
          usernameInput: this.state.usernameInput,
          passwordInput: this.state.passwordInput })));



    } else if (currentStatus == 'SigningUp') {
      return /*#__PURE__*/(
        React.createElement("div", { id: "main-box" }, /*#__PURE__*/
        React.createElement(SignupView, {
          goHome: this.reset,
          handleInputChange: this.handleInputChange,
          usernameInput: this.state.usernameInput,
          passwordInput: this.state.passwordInput,
          pwConfirmInput: this.state.pwConfirmInput })));



    }
  }}


// component rendered when selects "Login"
function LoginView(props) {

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { class: "input-fields" }, "Username:", /*#__PURE__*/

    React.createElement("input", { name: "usernameInput", value: props.usernameInput, onChange: props.handleInputChange }), " ", /*#__PURE__*/React.createElement("br", null), "Password:", /*#__PURE__*/

    React.createElement("input", { name: "passwordInput", value: props.usernameInput, type: "password", onChange: props.handleInputChange })), /*#__PURE__*/

    React.createElement("div", { id: "backOrForward" }, /*#__PURE__*/
    React.createElement("button", { id: "back-button", onClick: props.goHome }, "Back"), /*#__PURE__*/
    React.createElement("button", { class: "forward" }, "Login"))));



}

// component rendered when user selects 'Sign Up'
function SignupView(props) {

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { class: "input-fields" }, "Username:", /*#__PURE__*/

    React.createElement("input", { name: "usernameInput", value: props.usernameInput, onChange: props.handleInputChange }), " ", /*#__PURE__*/React.createElement("br", null), "Password:", /*#__PURE__*/

    React.createElement("input", { name: "passwordInput", value: props.passwordInput, type: "password", onChange: props.handleInputChange }), " ", /*#__PURE__*/React.createElement("br", null), "Confirm Password:", /*#__PURE__*/

    React.createElement("input", { name: "pwConfirmInput", value: props.pwConfirmInput, type: "password", onChange: props.handleInputChange })), /*#__PURE__*/

    React.createElement("div", { id: "backOrForward" }, /*#__PURE__*/
    React.createElement("button", { id: "back-button", onClick: props.goHome }, "Back"), /*#__PURE__*/
    React.createElement("button", { class: "forward" }, "Sign Up"))));



}





ReactDOM.render( /*#__PURE__*/React.createElement(LoginOrSignup, null), document.getElementById('app'));