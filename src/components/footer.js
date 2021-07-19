import React from "react";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.prevChoosedFilter = 'all';
    this.todosCount = this.props.notCheckedTodos;

    this.props.EE.subscribe('chooseFilter', (id) => {this.renderClassSelected(id)});
    this.props.EE.subscribe('changeCountActiveTodo', (value) => {
      let [todosCounter, todosLength] = value;
      document.getElementById('span').innerHTML = `${todosCounter} items left.`;

      const delButton = document.getElementById('buttonDelFooter');

      if (todosCounter < todosLength){
        delButton.classList.remove('notActive')
      } else {
        delButton.classList.add('notActive')
      }

      if (todosCounter === 0 && todosLength !== 0) {
        this.props.EE.emit('changeHeaderCheckbox', true);
      } else {
        this.props.EE.emit('changeHeaderCheckbox', false);
      }

      if (todosLength === 0) {
        this.props.EE.emit('visibleHeaderCheckBox', true);
      } else {
        this.props.EE.emit('visibleHeaderCheckBox', false);
      }
    });
  }

  render() {
    
    return (
      <footer className='footer'>
        <span id='span'>
          {this.todosCount} items left.
        </span>
        <ul className='ulFooter'>
          <li id='all' className='liFooter selected' onClick={() => {this.props.EE.emit('chooseFilter', 'all')}}>All</li>
          <li id='active' className='liFooter' onClick={() => {this.props.EE.emit('chooseFilter', 'active')}}>Active</li>
          <li id='complited' className='liFooter' onClick={() => {this.props.EE.emit('chooseFilter', 'complited')}}>Complited</li>
        </ul>
        <button id='buttonDelFooter' className='buttonDelFooter notActive' onClick={() => {this.props.EE.emit('delAllChoosed', )}}>Clear complited</button>
      </footer>
    );
  }

  renderClassSelected = (choosedFilter) => {
    if (choosedFilter !== this.prevChoosedFilter) {
      const elemChoosed = document.getElementById(choosedFilter);
      const elemPrevChoosed = document.getElementById(this.prevChoosedFilter)
      elemPrevChoosed.classList.remove('selected');
      elemChoosed.classList.add('selected');
      this.prevChoosedFilter = choosedFilter;
    }
  }
}