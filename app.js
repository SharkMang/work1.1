class App {
  constructor(selector) {
    this.container = document.getElementById(selector);

    this.initEventEmitter = new EventEmitter();

    this.initLogin = new Login(selector, this.initEventEmitter);
    this.initHome = new Home(selector, this.initEventEmitter);
    
  }

  init() {
    this.initEventEmitter.subscribe('isAuthenticated', (value) => {
      if (value) {
        localStorage.setItem('isAuthenticated', true);
        this.render(this.initHome);
      } else {
        localStorage.setItem('isAuthenticated', false);
        this.render(this.initLogin);
      }
    });

    this.render(this.initLogin);
  }

  render(page) {
    this.container.innerHTML = '';
    page.init();
  }
}

window.onload = function() {
  (new App('root')).init();
}

