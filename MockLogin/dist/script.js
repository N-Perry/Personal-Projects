fakeDBCount = 2; //perfect solution to associative arrays not having a .length property! DON'T JUDGE ME

// my impromptu db, 
const fakeDB = {
  'Andy': {
    userID: 1,
    username: 'Andy',
    password: 'baseballfan97'
  },
  'Nick': {
    userID: 2,
    username: 'Nick',
    password: 'OGhooper98'
  }
}


class LoginOrSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      usernameInput: '',
      passwordInput: '',
      pwConfirmInput: '',
      currentUser: {}
    }
    
    this.handleChooseLogin = this.handleChooseLogin.bind(this);
    this.handleChooseSignup = this.handleChooseSignup.bind(this);
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.reset = this.reset.bind(this);
  } 
  
  handleChooseLogin() {
    this.setState({
      status: 'LoggingIn'
    });
  } 
  
  handleChooseSignup() {
    this.setState({
      status: 'SigningUp'
    });
  }
  
  handleInputChange(e) {
    if (e.target.name == 'usernameInput') {
      this.setState({
        usernameInput: e.target.value
      });
    } else if (e.target.name == 'passwordInput') {
      this.setState({
        passwordInput: e.target.value
      });
    } else {
      this.setState({
        pwConfirmInput: e.target.value
      });
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
      alert("Password must be 8 or more characters long.")
    } else if (password != pwConfirm) {
      alert("Passwords do not match.");
    } else {
      fakeDB[username] = {
        userID: ++fakeDBCount,
        username,
        password
      }
      this.reset();
    }
  }
  
  handleLogin() {
    let username = this.state.usernameInput;
    let password = this.state.passwordInput;
    let serverVerdict = function() {
      if (!(username in fakeDB) || (password != fakeDB[username].password)) {
        this.setState({status: 'LoggingIn'}, alert("invalid username or password."));
        //alert("invalid username or password.");
      } else {
        this.setState({
          status: 'LoggedIn',
          currentUser: fakeDB[username]
        })
      }
    }
    serverVerdict = serverVerdict.bind(this); // allows serverVerdict to use this.setState()
    
    this.setState({status: 'RequestingFromServer'})
    setTimeout(serverVerdict, 3000);
  }
  
  reset() {
    this.setState({
      status: '',
      usernameInput: '',
      passwordInput: '',
      pwConfirmInput: '',
      currentUser: {}
    })
  }
  
  render() {
    const currentStatus = this.state.status;
    
    if (currentStatus == '') {
      return (
        <div id='main-box'>
          <div id='starter-buttons'>
            <button onClick={this.handleChooseLogin}>Login</button>
            &nbsp; or &nbsp;
            <button onClick={this.handleChooseSignup}>Sign Up</button>
          </div>
        </div>
      );
    } else if (currentStatus == 'LoggingIn') {
      return (
        <div id='main-box'>
          <LoginView
            goHome={this.reset}
            handleInputChange={this.handleInputChange}
            handleLogin={this.handleLogin}
            
            usernameInput={this.state.usernameInput}
            passwordInput={this.state.passwordInput}
          />
        </div>
      );
    } else if (currentStatus == 'SigningUp') {
      return (
        <div id='main-box'>
          <SignupView
            goHome={this.reset}
            handleInputChange={this.handleInputChange}
            handleSignup={this.handleSignup}
            
            usernameInput={this.state.usernameInput}
            passwordInput={this.state.passwordInput}
            pwConfirmInput={this.state.pwConfirmInput}
          />
        </div>
      );
    } else if (currentStatus == 'RequestingFromServer') {
      return (
        <div id='main-box'>
          <div class="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>   
          </div>  
        </div>
      );
    } else if (currentStatus == 'LoggedIn') {
      const currentUser = this.state.currentUser.username
      return (
        <div id='user-home'>
          <button id='Logout' onClick={this.reset}>Logout</button>
          <h1>WELCOME BACK, {currentUser.toUpperCase()}!</h1>
        </div>
      );
    }
  }
}

// component rendered when selects "Login"
const LoginView = (props) => {
  
    return(
      <div>
        <div class='input-fields'>
          Username:
          <input name='usernameInput' value={props.usernameInput} onChange={props.handleInputChange}/> <br />
          Password:
          <input name='passwordInput' value={props.passwordInput} type="password"  onChange={props.handleInputChange}/>
        </div>
        <div id="backOrForward">
          <button id='back-button' onClick={props.goHome}>Back</button>
          <button class="forward" onClick={props.handleLogin}>Login</button>
        </div> 
      </div>
    ); 
}

// component rendered when user selects 'Sign Up'
const SignupView = (props) => {
  
    return(
      <div>
        <div class='input-fields'>
          Username:
          <input name='usernameInput' value={props.usernameInput} onChange={props.handleInputChange}/> <br />
          Password:
          <input name='passwordInput' value={props.passwordInput} type="password" onChange={props.handleInputChange}/> <br />
          Confirm Password:
          <input name='pwConfirmInput' value={props.pwConfirmInput} type="password" onChange={props.handleInputChange}/>
        </div>
        <div id="backOrForward">
          <button id='back-button' onClick={props.goHome}>Back</button>
          <button class="forward" onClick={props.handleSignup}>Sign Up</button>
        </div>
      </div>
    );
}

ReactDOM.render(<LoginOrSignup />, document.getElementById('app'))