import Header from '../src/components/headerInput.js';
import TodoList from '../src/components/todoList.js';
import Navigator from '../src/components/navigator.js';
import Footer from '../src/components/footer.js';

import EventEmitter from '../src/components/eventEmitter.js';

import React from "react";
import ButtonLogout from '../src/components/buttonLogOut.js';

export default class Home extends React.Component{
  constructor(props) {
    super(props);
    
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

    this.state = {
      todoList: this.todoList,
      choosedNav: this.prevChoosedNav,
      navListCounter: this.navListCounter
    };

    this.eventEmitter = new EventEmitter();

    this.eventEmitter.subscribe('clickOnHeaderCheckbox', (event) => {this.eventChangeCheckedForAll(event)});
    this.eventEmitter.subscribe('addTodo', (event) => {this.eventAddTodo(event)});

    this.eventEmitter.subscribe('changeTodoCheckbox', (id) => {this.eventChangeChecked(id)})
    this.eventEmitter.subscribe('changeTodoName', (elem) => {this.eventChangeTodo(elem)});
    this.eventEmitter.subscribe('removeTodo', (id) => {this.eventRemoveTodo(id)});

    this.eventEmitter.subscribe('clickOnNavEl', (id) => {this.moveToTheNavPage(id)});

    this.eventEmitter.subscribe('chooseFilter', (id) => {
      this.prevChoosedFilter = id;
      this.changeListOfNavPages();
    });
    this.eventEmitter.subscribe('delAllChoosed', () => {this.eventRemoveAllChecked()});
  
  }
  
  render() {
    this.eventEmitter.emit('changeCountActiveTodo', [this.getCountOfNotCheckedTodos(), this.todoList.length]);

    return (
      <>
        <Header EE={this.eventEmitter} />
        <TodoList todos={this.state} EE={this.eventEmitter} filterValue={this.filterValue}/>
        <Navigator EE={this.eventEmitter} navList={this.state}/>
        <Footer EE={this.eventEmitter} notCheckedTodos={this.getCountOfNotCheckedTodos()}/>
        <ButtonLogout />
      </>
    );

  }

  eventChangeTodo = (elem) => {
    const value = elem.innerHTML;

    elem.innerHTML = "";
    
    const input = document.createElement("INPUT");
    input.type = "text";
    input.classList.add('liInput');

    input.addEventListener("keydown", (event) => this.eventChangeNameTodo(event));
    input.addEventListener("blur", (event) => this.eventBlurTodo(event, value));
    
    elem.appendChild(input);
    input.focus();
  }

  eventChangeNameTodo = (event) => {

    if (event.keyCode === 13) {

      if (this.isCorrectInput(event.target.value)) {
        const todo = event.target.value;
        
        const div = event.target.closest('div');
        const todoByIndex = this.getTodoById(div.id);
        todoByIndex.todoName = todo;

        this.moveToTheNavPage(this.prevChoosedNav);
      } else {
        event.target.placeholder = 'Incorrect Value';
        event.target.value = '';
      }
    }
  }

  eventBlurTodo = (event, value) => {
    event.target.closest('label').innerHTML = value;
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
        event.target.placeholder = 'What needs to be done?';

        this.eventEmitter.emit('chooseFilter', 'all');
      } else {
        event.target.placeholder = 'Incorrect Value';
        event.target.value = '';
      }
    }
  }

  changeListOfNavPages = () => {
    let todos = this.choosedTodoList();
    let counterOfList = (Math.trunc(todos.length / this.filterValue) + 1);

    if (todos.length % this.filterValue === 0 && counterOfList !== 1) {
      counterOfList--;
    }

    this.navListCounter = counterOfList;
    this.moveToTheNavPage(this.navListCounter);
  }

  moveToTheNavPage = (index) => {
    let todos = this.choosedTodoList();
    if (todos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && todos.length % this.filterValue === 0) {
      this.navListCounter--;
    }
    if (index > this.navListCounter) {
      this.prevChoosedNav = this.navListCounter;
    } else {
      this.prevChoosedNav = index;
    }
    
    this.setState({
      todoList: todos,
      choosedNav: this.prevChoosedNav,
      navListCounter: this.navListCounter
    });
  }


  eventChangeChecked = (id) => {
    const todoByIndex = this.getTodoById(id);
    todoByIndex.isChecked = !todoByIndex.isChecked;

    if (this.prevChoosedNav !== this.navListCounter) {
      this.moveToTheNavPage(this.prevChoosedNav);
    } else {
      this.changeListOfNavPages();
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
  }

  eventRemoveTodo = (id) => {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
    this.moveToTheNavPage(this.prevChoosedNav);
  }

  eventRemoveAllChecked = () => {
    this.todoList = this.todoList.filter(todo => !todo.isChecked);
    this.changeListOfNavPages();
  }

  choosedTodoList = () => {
    let todos;

    switch(this.prevChoosedFilter) {
      case 'all': 
        todos = this.todoList;
        break;
      case 'active':
        todos = this.todoList.filter(todo => !todo.isChecked);
        break;
      case 'complited':
        todos = this.todoList.filter(todo => todo.isChecked);
        break;
    }
    return todos;
  }

  getCountOfNotCheckedTodos = () => {
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
}


