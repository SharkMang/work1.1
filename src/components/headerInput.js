export default class Header {
  constructor(container, initEE) {
    this.container = container;
    this.initEE = initEE;

    this.checkBoxAll = document.createElement('input');
    this.checkBoxAll.type = 'checkbox';
    this.checkBoxAll.classList.add('headerChackBox');
    this.checkBoxAll.addEventListener('change', (event) => {this.initEE.emit('changeHeaderCheckbox', event)});

    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'headerInput';
    this.input.placeholder = 'What needs to be done?';
    this.input.addEventListener('keydown', (event) => {this.initEE.emit('addTodo', event)});
    this.input.addEventListener("blur", (event) => {
      event.target.value = '';
      event.target.placeholder = 'What needs to be done?';
    });
  }

  render() {
    this.container.appendChild(this.checkBoxAll);
    this.container.appendChild(this.input);
  }

  changeHeaderCheckbox(value) {
    this.checkBoxAll.checked = value;
  }
}