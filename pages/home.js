import Header from '../src/components/headerInput.js';
import TodoList from '../src/components/todoList.js';
import Navigator from '../src/components/navigator.js';
import Footer from '../src/components/footer.js';

import EventEmitter from '../src/components/eventEmitter.js';

import React from "react";
import ButtonLogout from '../src/components/buttonLogOut.js';

class Home extends React.Component{
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
    this.prevChoosedFilter = 'all';
    // this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);

    this.state = {
      todoList: this.todoList,
      choosedFilter: this.prevChoosedFilter,
    };


    
    // this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);
    // this.prevChoosedNav = this.navListCounter;
    
    
    this.eventEmitter = new EventEmitter();

    this.eventEmitter.subscribe('clickOnHeaderCheckbox', (event) => {this.eventChangeCheckedForAll(event)});
    this.eventEmitter.subscribe('addTodo', (event) => {this.eventAddTodo(event)});

    this.eventEmitter.subscribe('changeTodoCheckbox', (id) => {this.eventChangeChecked(id)})
    this.eventEmitter.subscribe('changeTodoName', (elem) => {this.eventChangeTodo(elem)});
    this.eventEmitter.subscribe('removeTodo', (id) => {this.eventRemoveTodo(id)});

    //this.eventEmitter.subscribe('clickOnNavEl', (id) => {this.moveToTheNavPage(id)});

    this.eventEmitter.subscribe('chooseFilter', (id) => {
      if (this.state.todoList.length !== 0) {
        this.setState({
          choosedFilter: id
        });
      }
    });
    this.eventEmitter.subscribe('delAllChoosed', () => {this.eventRemoveAllChecked()});
  }
  
  render() {
    this.eventEmitter.emit('changeCountActiveTodo', [this.getCountOfNotChechedTodos(), this.state.todoList.length]);

    return (
      <>
        <Header EE={this.eventEmitter} addTodo={this.eventAddTodo}/>
        <TodoList todos={this.state} EE={this.eventEmitter} filterValue={this.filterValue}/>
        <Navigator EE={this.eventEmitter} totalPages={this.state.navListCounter}/>
        <Footer todos={this.state} EE={this.eventEmitter}/>
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
        const newTodoName = event.target.value;
        
        const div = event.target.closest('div');
        event.target.removeEventListener('blur', this.eventBlurTodo);

        this.setState({
          todoList: this.state.todoList.map( (todo) => {
            if (todo.id === parseInt(div.id)) {
              todo.todoName = newTodoName;
            }
            return todo;
          })
        });
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

        event.target.value = '';
        event.target.placeholder = 'What needs to be done?';

        this.setState({
          todoList: this.state.todoList.concat(newTodo),
        });

        this.eventEmitter.emit('chooseFilter', 'all');
        } else {
        event.target.placeholder = 'Incorrect Value';
        event.target.value = '';
      }
    }
  }
























  // changeListOfNavPages = () => {
  //   let todos = this.choosedTodoList();

  //   this.setState({
  //     renderTodos: todos
  //   });
  //   // let counterOfList = (Math.trunc(todos.length / this.filterValue) + 1);

  //   // if (todos.length % this.filterValue === 0 && counterOfList !== 1) {
  //   //   counterOfList--;
  //   // }

  //   // this.navListCounter = counterOfList;
  //   // this.moveToTheNavPage(this.navListCounter);
  // }

  // moveToTheNavPage = (index) => {
  //   let todos = this.choosedTodoList();
  //   this.setState({
  //     renderTodos: todos
  //   });
  //   // if (todos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && todos.length % this.filterValue === 0) {
  //   //   this.navListCounter--;
  //   // }

  //   // this.prevChoosedNav = index;
  //   // this.initNavSection.init(this.prevChoosedNav, this.navListCounter);

  //   // this.initTodoList.render(todos, this.prevChoosedNav);
  // }

  eventChangeChecked = (id) => {

    this.setState({
      todoList: this.state.todoList.map( (todo) => {
        if (todo.id === id) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      })
    });

    // this.todoList = this.todoList.map((todo) => {
    //   if (todo.id === id) {
    //     todo.isChecked = !todo.isChecked;
    //   }
    //   return todo;
    // });
    
    // this.changeListOfNavPages();
    
    // if (this.prevChoosedFilter !== 'all') {
    //   // setTimeout(() => {
    //   //   let li = evTarg.closest('li');
    //   //   li.remove();

    //   //   if (this.prevChoosedNav !== this.navListCounter){
    //   //     this.moveToTheNavPage(this.prevChoosedNav);
    //   //   } else {
    //   //     if (this.choosedTodoList().length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.choosedTodoList().length % this.filterValue === 0) {
    //   //       this.changeListOfNavPages();
    //   //     }
    //   //   }
    //   // },190);
    // }
  }
  
  eventChangeCheckedForAll = (event) => {
    
    this.setState({
      todoList: this.state.todoList.map( (todo) => {
        if (event.target.checked){
          todo.isChecked = true;
        } else {
          todo.isChecked = false;
        }
        return todo;
      })
    })

    // let todos = this.todoList;

    // for(let i = 0; i < todos.length; i++) {
    //   if (event.target.checked){
    //     todos[i].isChecked = true;
    //   } else {
    //     todos[i].isChecked = false;
    //   }
    // }

    // switch(this.prevChoosedFilter) {
    //   case 'all': 
    //     this.moveToTheNavPage(this.prevChoosedNav);
    //     break;
    //   case 'active':
    //     this.changeListOfNavPages();
    //     break;
    //   case 'complited':
    //     this.changeListOfNavPages();
    //     break;
    // }
  }

  eventRemoveTodo = (id) => {
    this.setState({
      todoList: this.state.todoList.filter(todo => todo.id !== id)
    });

    // this.todoList = this.todoList.filter(todo => todo.id !== id);

    // if (this.prevChoosedNav !== this.navListCounter) {
    //   this.moveToTheNavPage(this.prevChoosedNav);
    // } else {
    //  if (this.choosedTodoList().length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.choosedTodoList().length % this.filterValue === 0) {
        // this.changeListOfNavPages();
    //   }
    // }
  }


  eventRemoveAllChecked = () => {
    this.setState({
      todoList: this.state.todoList.filter(todo => !todo.isChecked)
    })

    // this.todoList = this.todoList.filter(todo => !todo.isChecked);
    // this.changeListOfNavPages();
  }

  // choosedTodoList = () => {
  //   let todos;

  //   switch(this.prevChoosedFilter) {
  //     case 'all': 
  //       todos = this.todoList;
  //       break;
  //     case 'active':
  //       todos = this.todoList.filter(todo => !todo.isChecked);
  //       break;
  //     case 'complited':
  //       todos = this.todoList.filter(todo => todo.isChecked);
  //       break;
  //   }
  //   return todos;
  // }

  getCountOfNotChechedTodos = () => {
    let count = this.state.todoList.length;

    for(let i = 0; i < this.state.todoList.length; i++) {

      if (this.state.todoList[i].isChecked) {
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
}

export default Home;