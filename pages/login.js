class Login {
  constructor(selector, init) {
    this.container = document.getElementById(selector);
    this.header = document.createElement('header');

    this.container.classList.add('container');

    const h1 = document.createElement('h1');
    h1.classList.add('h1');
    h1.innerHTML = 'LogIn:';
    this.header.appendChild(h1);
    
    this.formLogin = document.createElement('form');
    this.formLogin.classList.add('loginForm');

    this.inputEmail = document.createElement('input');
    this.inputEmail.classList.add('loginInputs');
    this.inputEmail.type = 'email';
    this.inputEmail.name = 'email';
    this.inputEmail.placeholder = 'Email';
    this.formLogin.appendChild(this.inputEmail);

    this.inputPassword = document.createElement('input');
    this.inputPassword.classList.add('loginInputs');
    this.inputPassword.type = 'password';
    this.inputPassword.name = 'password';
    this.inputPassword.placeholder = 'Password';
    this.formLogin.appendChild(this.inputPassword);

    this.inputSubmit = document.createElement('input');
    this.inputSubmit.value = 'Login';
    this.inputSubmit.name = 'send';
    this.inputSubmit.type = 'submit';
    this.inputSubmit.addEventListener('click', this.eventEnterLogin);
    this.inputSubmit.classList.add('loginLogoutBtn');
    this.formLogin.appendChild(this.inputSubmit);

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

    this.initApp = init;
  }

  init() {
    this.container.appendChild(this.header);
    this.container.appendChild(this.formLogin);
  }

  eventEnterLogin = (event) => {
    event.preventDefault();
    
    let form = event.target.closest("form");
    let formData = new FormData(form);

    let user = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    this.inputEmail.value = '';
    this.inputPassword.value = '';

    if (this.checkInputIsCorrect(user)) {
      localStorage.setItem('isAuthenticated', true);
      this.initApp();

    } else {
      localStorage.setItem('isAuthenticated', false);

      this.inputEmail.placeholder = 'InCorrect Email.';
      this.inputPassword.placeholder = 'Incorrect Password.';
      this.inputEmail.focus();
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

