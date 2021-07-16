import React from 'react';

export default class TodoItem extends React.Component {

  render() {
    const classes = ['label-item-notmarced'];
    let todo = this.props.todo;

    if (todo.isChecked) {
      classes.push('label-item-marced')
    }
    
    return (
      <li className='listItem'>
        <div className='box' id={todo.id}>
          <input 
            type='checkbox' 
            className='liCheckbox' 
            checked={todo.isChecked}
            onChange={ () => this.props.EE.emit('changeTodoCheckbox', todo.id) }/>
            <label className={classes.join(' ')} onDoubleClick={(event) => {this.props.EE.emit('changeTodoName', event.target)}}>
              {todo.todoName}
            </label>
            <button className='buttonDel' onClick={() => this.props.EE.emit('removeTodo',todo.id)}>
              X
            </button>

        </div>
      </li>
    );
  }
}