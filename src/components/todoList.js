class TodoList {
  constructor(filterValue, container, initEE) {
    this.container = container;
    this.initEE = initEE;

    this.ul = document.createElement('ul');
    this.ul.classList.add('ulSection');

    this.filterValue = filterValue;
  }

  render(elemList, currentPage) {
    this.ul.innerHTML = '';

    currentPage *= this.filterValue;

    for(let i = (currentPage - this.filterValue); i < currentPage; i++) {
      if (elemList[i]) {
        this.addOneElem(elemList[i]);
      }
    }

    this.container.appendChild(this.ul);
  }

  addOneElem = (elem) => {
    const li = document.createElement('li');
    li.classList.add("listItem");

    const div = document.createElement('div');
    div.id = elem.id;
    div.classList.add('box');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('liCheckbox');
    checkBox.checked = elem.isChecked;
    checkBox.addEventListener('change', (event) => {this.initEE.emit('changeTodoCheckbox', event.target)});
        
    const label = document.createElement('label');
    label.innerHTML = elem.todoName;
    label.addEventListener('dblclick', (event) => {this.initEE.emit('changeTodoName', event.target)});

    if (elem.isChecked) {
      label.classList.add('label-item-marced');
    } else {
      label.classList.add('label-item-notmarced');
    }

    const buttonDel = document.createElement('button');
    buttonDel.innerHTML = 'X';
    buttonDel.className = 'buttonDel';
    buttonDel.addEventListener('click', (event) => {this.initEE.emit('removeTodo', event.target)});

    div.appendChild(checkBox);
    div.appendChild(label);
    div.appendChild(buttonDel);
    li.appendChild(div);

    this.ul.appendChild(li);
  }
}