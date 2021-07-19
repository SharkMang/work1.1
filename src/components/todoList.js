import React from "react";
import TodoItem from "./todoItem.js";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    
    this.filterValue = props.filterValue;
  }

  render() {
    let todos = [];
    const currentTodoList = this.props.todos.todoList;
    const countOfRenderTodos = this.props.todos.choosedNav * this.filterValue;

    for(let i = (countOfRenderTodos - this.filterValue); i < countOfRenderTodos; i++) {
      if (currentTodoList[i]) {
        todos.push(currentTodoList[i]);
      }
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
}