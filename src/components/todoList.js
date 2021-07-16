import React from "react";
import TodoItem from "./todoItem.js";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
    this.filterValue = props.todos.filterValue;
  }

  render() {
    const choosedFilter = this.props.todos.choosedFilter;
    let todos;

    switch(choosedFilter) {
      case 'all': 
        todos = this.props.todos.todoList;
        break;
      case 'active':
        todos = this.props.todos.todoList.filter(todo => !todo.isChecked);
        break;
      case 'complited':
        todos = this.props.todos.todoList.filter(todo => todo.isChecked);
        break;
    }

    return (
      <section>
        <ul className='ulSection'>
          {todos.map(todo => {
            return <TodoItem todo={ todo } key={ todo.id } EE={ this.props.EE }/>
          })}
        </ul>
      </section>
    );
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
}