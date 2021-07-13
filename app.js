import Home from './pages/home.js';
import Login from './pages/login.js';
import EventEmitter from './src/components/eventEmitter.js';

class App {
  constructor(selector) {
    this.container = document.getElementById(selector);

    this.eventEmitter = new EventEmitter();

    this.loginPage = new Login(selector, this.eventEmitter);
    this.homePage = new Home(selector, this.eventEmitter);
    
  }

  init() {
    this.eventEmitter.subscribe('isAuthenticated', (value) => {
      if (value) {
        localStorage.setItem('isAuthenticated', true);
        this.render(this.homePage);
      } else {
        localStorage.setItem('isAuthenticated', false);
        this.render(this.loginPage);
      }
    });

    this.render(this.loginPage);
  }

  render(page) {
    this.container.innerHTML = '';
    page.init();
  }
}

window.onload = function() {
  (new App('root')).init();
}

