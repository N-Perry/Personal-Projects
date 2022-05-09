fakeDBCount = 2; //perfect solution to associative arrays not having a .length property! DON'T JUDGE ME

// my impromptu db, 
const fakeDB = {
  'Andy': {
    userID: 1,
    username: 'Andy',
    password: 'baseballfan97' },

  'Nick': {
    userID: 2,
    username: 'Nick',
    password: 'OGhooper98' } };




class LoginOrSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      usernameInput: '',
      passwordInput: '',
      pwConfirmInput: '',
      currentUser: {} };


    this.handleChooseLogin = this.handleChooseLogin.bind(this);
    this.handleChooseSignup = this.handleChooseSignup.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.reset = this.reset.bind(this);
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

  handleSignup() {
    let username = this.state.usernameInput;
    let password = this.state.passwordInput;
    let pwConfirm = this.state.pwConfirmInput;

    if (!username) {
      alert("Please enter desired username.");
    } else if (!password) {
      alert("Please enter desired password.");
    } else if (!pwConfirm) {
      alert("Please confirm password.");
    } else if (!(password.length >= 8)) {
      alert("Password must be 8 or more characters long.");
    } else if (password != pwConfirm) {
      alert("Passwords do not match.");
    } else {
      fakeDB[username] = {
        userID: ++fakeDBCount,
        username,
        password };

      this.setState({
        status: 'LoggingIn',
        usernameInput: '',
        passwordInput: '',
        pwConfirmInput: '' });

    }
  }

  handleLogin() {
    let username = this.state.usernameInput;
    let password = this.state.passwordInput;
    let serverVerdict = function () {
      if (!(username in fakeDB) || password != fakeDB[username].password) {
        this.setState({ status: 'LoggingIn' }, alert("invalid username or password."));
        //alert("invalid username or password.");
      } else {
        this.setState({
          status: 'LoggedIn',
          currentUser: fakeDB[username] });

      }
    };
    serverVerdict = serverVerdict.bind(this); // allows serverVerdict to use this.setState()

    this.setState({ status: 'RequestingFromServer' });
    setTimeout(serverVerdict, 3000);
  }

  reset() {
    this.setState({
      status: '',
      usernameInput: '',
      passwordInput: '',
      pwConfirmInput: '',
      currentUser: {} });

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
          handleLogin: this.handleLogin,

          usernameInput: this.state.usernameInput,
          passwordInput: this.state.passwordInput })));



    } else if (currentStatus == 'SigningUp') {
      return /*#__PURE__*/(
        React.createElement("div", { id: "main-box" }, /*#__PURE__*/
        React.createElement(SignupView, {
          goHome: this.reset,
          handleInputChange: this.handleInputChange,
          handleSignup: this.handleSignup,

          usernameInput: this.state.usernameInput,
          passwordInput: this.state.passwordInput,
          pwConfirmInput: this.state.pwConfirmInput })));



    } else if (currentStatus == 'RequestingFromServer') {
      return /*#__PURE__*/(
        React.createElement("div", { id: "main-box" }, /*#__PURE__*/
        React.createElement("div", { className: "lds-ring" }, /*#__PURE__*/
        React.createElement("div", null), /*#__PURE__*/
        React.createElement("div", null), /*#__PURE__*/
        React.createElement("div", null), /*#__PURE__*/
        React.createElement("div", null))));



    } else if (currentStatus == 'LoggedIn') {
      const currentUser = this.state.currentUser.username;
      return /*#__PURE__*/(
        React.createElement("div", { id: "user-home" }, /*#__PURE__*/
        React.createElement("button", { id: "Logout", onClick: this.reset }, "Logout"), /*#__PURE__*/
        React.createElement("h1", null, "WELCOME BACK, ", currentUser.toUpperCase(), "!")));


    }
  }}


// component rendered when selects "Login"
const LoginView = props => {

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "input-fields" }, "Username:", /*#__PURE__*/

    React.createElement("input", { name: "usernameInput", value: props.usernameInput, onChange: props.handleInputChange }), " ", /*#__PURE__*/React.createElement("br", null), "Password:", /*#__PURE__*/

    React.createElement("input", { name: "passwordInput", value: props.passwordInput, type: "password", onChange: props.handleInputChange })), /*#__PURE__*/

    React.createElement("div", { id: "backOrForward" }, /*#__PURE__*/
    React.createElement("button", { id: "back-button", onClick: props.goHome }, "Back"), /*#__PURE__*/
    React.createElement("button", { className: "forward", onClick: props.handleLogin }, "Login"))));



};

// component rendered when user selects 'Sign Up'
const SignupView = props => {

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "input-fields" }, "Username:", /*#__PURE__*/

    React.createElement("input", { name: "usernameInput", value: props.usernameInput, onChange: props.handleInputChange }), " ", /*#__PURE__*/React.createElement("br", null), "Password:", /*#__PURE__*/

    React.createElement("input", { name: "passwordInput", value: props.passwordInput, type: "password", onChange: props.handleInputChange }), " ", /*#__PURE__*/React.createElement("br", null), "Confirm Password:", /*#__PURE__*/

    React.createElement("input", { name: "pwConfirmInput", value: props.pwConfirmInput, type: "password", onChange: props.handleInputChange })), /*#__PURE__*/

    React.createElement("div", { id: "backOrForward" }, /*#__PURE__*/
    React.createElement("button", { id: "back-button", onClick: props.goHome }, "Back"), /*#__PURE__*/
    React.createElement("button", { className: "forward", onClick: props.handleSignup }, "Sign Up"))));



};

ReactDOM.render( /*#__PURE__*/React.createElement(LoginOrSignup, null), document.getElementById('app'));