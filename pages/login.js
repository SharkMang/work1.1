import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.users = [
      {
        email:'em@gmail.com',
        password: 'pw1'
      },{
        email: 'email2@gmail.com',
        password: 'password2'
      },{
        email: 'email3@gmail.com',
        password: 'password3'
      },{
        email: 'email4@gmail.com',
        password: 'password4'
      },
    ];
  }

  render() {
    return (
      <div>
        <header className='header'>
          <h1 className='h1'>LogIn:</h1>
        </header>
        <form className='loginForm'>
          <input className='loginInputs' type='email' name='email' placeholder='Email'/>
          <input className='loginInputs' type='password' name='password' placeholder='password'/>
          <input className='loginLogoutBtn' type='submit' name='send' value='Login' onClick={this.eventEnterLogin}/>
        </form>
      </div>
    );
  }

  eventEnterLogin = (event) => {
    event.preventDefault();
    
    let form = event.target.closest("form");
    let formData = new FormData(form);

    let inputEmail = form.childNodes[0];
    let inputPassword = form.childNodes[1];

    let user = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    inputEmail.value = '';
    inputPassword.value = '';

    if (this.checkInputIsCorrect(user)) {
      localStorage.setItem('isAuthenticated', true);
      window.location.reload();
    } else {
      localStorage.setItem('isAuthenticated', false);

      inputEmail.placeholder = 'InCorrect Email.';
      inputPassword.placeholder = 'Incorrect Password.';
      inputEmail.focus();
    }
  }

  checkInputIsCorrect = (user) => {
    let testEmail = new RegExp(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/);

    if (testEmail.test(user.email)) {
      for(let users of this.users) {
        if (users.email === user.email && users.password === user.password) {
          return true;
        }
      }
    } else {
      return false;
    }
  }
}

export default Login;