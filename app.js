class App {
  constructor(selector) {
    this.container = document.getElementById(selector);
    //document.cookie = 'isAuthenticated=false;';
  }

  init() {
    document.cookie = "name=user"; 
    document.cookie = "fullname=Ivanov";
    document.cookie = "date=10.01.2021";
     
    alert(document.cookie);
  }

}

window.onload = function() {
  (new App('root')).init();
}

