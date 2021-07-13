class App {
  constructor(selector) {
    this.container = document.getElementById(selector);

    this.initLogin = new Login(selector, this.init);
    this.initHome = new Home(selector, this.init);
  }

  init = () => {
    this.container.innerHTML = '';

    if (localStorage.getItem('isAuthenticated') === 'true') {
      this.initHome.init();
    } else {
      this.initLogin.init();
    }
  }
}

window.onload = function() {
  (new App('root')).init();
}

