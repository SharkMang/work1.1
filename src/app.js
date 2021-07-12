class App {
  constructor(selector) {
    this.container = document.getElementById(selector);
    this.header = document.createElement('header');
    this.sectionNavigation = document.createElement('section');
    this.sectionTodoList = document.createElement('section');
    this.footer = document.createElement('footer');

    this.container.classList.add('container');
    this.header.classList.add('header');
    this.container.classList.add('section');
    this.footer.classList.add('footer');
    
    this.todoList = [
      {
        todoName: 'first',
        isChecked: false,
        id: 10
      },
      {
        todoName: 'second',
        isChecked: false,
        id: 11
      },
    ];

    this.filterValue = 6;
    this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);
    this.prevChoosedNav = this.navListCounter;
    this.prevChoosedFilter = 'all';

    this.filteredTodos = this.todoList;

    this.initEventEmitter = new EventEmitter();

    this.initHeader = new Header(this.header, this.initEventEmitter);
    this.initTodoList = new TodoList(this.filterValue, this.sectionTodoList, this.initEventEmitter);
    this.initNavSection = new Navigator(this.sectionNavigation, this.initEventEmitter);
    this.initFooter = new Footer(this.footer, this.initEventEmitter);
    
  }
  
  render() {
    this.initHeader.render();
    this.initTodoList.render(this.todoList,this.navListCounter);
    this.initNavSection.render(this.navListCounter);
    this.initFooter.render(this.todoList.length);
  }

  eventChangeTodo = (elem) => {
    elem.innerHTML = "";
    let input1 = document.createElement("INPUT");
    input1.type = "text";
    input1.classList.add('liInput');

    input1.addEventListener("keydown", this.eventChangeNameTodo);
    input1.addEventListener("blur", this.eventBlurTodo);

    elem.appendChild(input1);
    input1.focus();
  }

  eventChangeNameTodo = (event) => {

    if (event.keyCode === 13) {

      if (this.isCorrectInput(event.target.value)) {
        const todo = event.target.value;
        
        const div = event.target.closest('div');
        const todoByIndex = this.getTodoById(div.id);
        todoByIndex.todoName = todo;

        let label = event.target.closest('label');
        event.target.removeEventListener('blur', this.eventBlurTodo);
        label.innerHTML = todo;
      } else {
        event.target.placeholder = 'Incorrect Value';
        event.target.value = '';
      }
    }
  }

  eventBlurTodo = (event) => {
    const div = event.target.closest('div');
    const label = event.target.closest('label');
    const todoByIndex = this.getTodoById(div.id);

    label.innerHTML = todoByIndex.todoName;
  }

  eventAddTodo = (event) => {

    if (event.keyCode === 13) {

      if (this.isCorrectInput(event.target.value)) {
        let newTodo = {
          todoName: event.target.value,
          isChecked: false,
          id: Math.round(Math.random() * 10000)
        };

        this.todoList.push(newTodo);

        event.target.value = '';  

        this.initHeader.changeHeaderCheckbox(false);

        this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);

        if (this.prevChoosedFilter != 'all') {
          this.initEventEmitter.emit('chooseFilter', 'all');
        } else {

          if (this.todoList.length > (this.navListCounter * this.filterValue)) {
            this.changeListOfNavPages();
          } else {

            if (this.prevChoosedNav !== this.navListCounter) {
              this.moveToTheNavPage(this.navListCounter);
            } else {
              this.initTodoList.addOneElem(newTodo);
            }
          }
        }
        event.target.placeholder = 'What needs to be done?';
      } else {
        event.target.placeholder = 'Incorrect Value';
        event.target.value = '';
      }
    }
  }

  changeListOfNavPages = () => {
    let counterOfList = (Math.trunc(this.filteredTodos.length / this.filterValue) + 1);

    if (this.filteredTodos.length % this.filterValue === 0 && counterOfList !== 1) {
      counterOfList--;
    }

    this.navListCounter = counterOfList;
    this.moveToTheNavPage(this.navListCounter);
  }

  moveToTheNavPage = (index) => {

    if (this.filteredTodos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.filteredTodos.length % this.filterValue === 0) {
      this.navListCounter--;
    }

    this.prevChoosedNav = index;
    this.initNavSection.init(this.prevChoosedNav, this.navListCounter);

    this.initTodoList.render(this.filteredTodos, this.prevChoosedNav);
  }

  eventChangeChecked = (evTarg) => {
    const div = evTarg.closest('div');
    const todoByIndex = this.getTodoById(div.id);
    
    todoByIndex.isChecked = !todoByIndex.isChecked;

    if (todoByIndex.isChecked) {
      div.childNodes[1].className = 'label-item-marced';
    } else {
      div.childNodes[1].className = 'label-item-notmarced';
    }

    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);

    if (this.getCountOfNotChechedTodos() === 0 && this.todoList.length !== 0) {
      this.initHeader.changeHeaderCheckbox(true);
    } else {
      this.initHeader.changeHeaderCheckbox(false);
    }

    if (this.prevChoosedFilter !== 'all') {
      setTimeout(() => {
        let li = evTarg.closest('li');
        li.remove();

        if (this.prevChoosedNav !== this.navListCounter){
          this.moveToTheNavPage(this.prevChoosedNav);
        } else {
          if (this.filteredTodos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.filteredTodos.length % this.filterValue === 0) {
            this.changeListOfNavPages();
          }
        }
      },190);
    }
  }
  
  eventChangeCheckedForAll = (event) => {
    let todos = this.todoList;

    for(let i = 0; i < todos.length; i++) {
      if (event.target.checked){
        todos[i].isChecked = true;
      } else {
        todos[i].isChecked = false;
      }
    }

    switch(this.prevChoosedFilter) {
      case 'all': 
        this.moveToTheNavPage(this.prevChoosedNav);
        break;
      case 'active':
        this.changeListOfNavPages();
        break;
      case 'complited':
        this.changeListOfNavPages();
        break;
    }

    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);
  }

  eventRemoveTodo = (evTarg) => {
    let div = evTarg.parentNode;
    this.todoList = this.todoList.filter(todo => todo.id !== parseInt(div.id));
    let li = evTarg.closest('li');
    li.remove();

    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);

    if (this.getCountOfNotChechedTodos() === 0 && this.todoList.length !== 0) {
      this.initHeader.changeHeaderCheckbox(true);
    } else {
      this.initHeader.changeHeaderCheckbox(false);
    }

    if (this.prevChoosedNav !== this.navListCounter){
      this.moveToTheNavPage(this.prevChoosedNav);
    } else {
      if (this.filteredTodos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.filteredTodos.length % this.filterValue === 0) {
        this.changeListOfNavPages();
      }
    }
  }

  eventRemoveAllChecked = () => {
    this.todoList = this.todoList.filter(todo => !todo.isChecked);
    this.changeListOfNavPages();

    this.initHeader.changeHeaderCheckbox(false);
    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);
  }

  getCountOfNotChechedTodos = () => {
    let count = this.todoList.length;

    for(let i = 0; i < this.todoList.length; i++) {

      if (this.todoList[i].isChecked) {
        count--;
      }
    }
    return count;
  }

  isCorrectInput = (str) => {
    const testStr = (str.search(/[^A-Za-z\s]/) == -1);

    if (str && testStr){
      return true;
    } else {
      return false;
    }
  }

  getTodoById = (id) => {
    return this.todoList.find(todo => todo.id === parseInt(id));
  }
  
  init() {
    const h1 = document.createElement('h1');
    h1.innerHTML = 'Todos';
    h1.classList.add('h1');
    this.header.appendChild(h1);

    this.container.appendChild(this.header);
    this.container.appendChild(this.sectionTodoList);
    this.container.appendChild(this.sectionNavigation);
    this.container.appendChild(this.footer);
    
    this.initEventEmitter.subscribe('changeHeaderCheckbox', (event) => {this.eventChangeCheckedForAll(event)});
    this.initEventEmitter.subscribe('addTodo', (event) => {this.eventAddTodo(event)});

    this.initEventEmitter.subscribe('changeTodoCheckbox', (evTarg) => {this.eventChangeChecked(evTarg)})
    this.initEventEmitter.subscribe('changeTodoName', (elem) => {this.eventChangeTodo(elem)});
    this.initEventEmitter.subscribe('removeTodo', (evTarg) => {this.eventRemoveTodo(evTarg)})

    this.initEventEmitter.subscribe('clickOnNavEl', (id) => {this.moveToTheNavPage(id)});

    this.initEventEmitter.subscribe('chooseFilter', (id) => {
      this.prevChoosedFilter = id;
    
      switch(id) {
        case 'all': 
          this.filteredTodos = this.todoList;
          break;
        case 'active':
          this.filteredTodos = this.todoList.filter(todo => !todo.isChecked);
          break;
        case 'complited':
          this.filteredTodos = this.todoList.filter(todo => todo.isChecked);
          break;
      }
      this.changeListOfNavPages();
    });

    this.initEventEmitter.subscribe('delAllChoosed', () => {this.eventRemoveAllChecked()});

    this.render();
  }
}

window.onload = function() {
  (new App('root')).init();
}
