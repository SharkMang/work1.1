import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.props.EE.subscribe('changeHeaderCheckbox', (value) => {
      document.getElementById('headerChackBox').checked = value;
    });

    this.props.EE.subscribe('visibleHeaderCheckBox', (value) => {
      if (value) {
        document.getElementById('headerChackBox').classList.add('notActive')
      } else {
        document.getElementById('headerChackBox').classList.remove('notActive')
      }
      
    });
  }

  render() {
  
    return (
      <header className='header'>
        <h1 className='h1'>
          Todos
        </h1>
        <input id='headerChackBox' className='headerChackBox' type='checkbox' onChange={(event) => {this.props.EE.emit('clickOnHeaderCheckbox', event)}}/>
        <input 
          className='headerInput' 
          type='text' 
          placeholder='What needs to be done?' 
          onKeyDown={(event) => {this.props.EE.emit('addTodo', event)}}
          onBlur={(event) => {
            event.target.value = '';
            event.target.placeholder = 'What needs to be done?';
          }}
        />
      </header>
    );
  }
}

export default Header;