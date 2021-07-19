import React from "react";

export default class NavItem extends React.Component {
  constructor(props) {
    super(props);

    this.initEE = props.EE;
  }

  render() {
    return (
      <li id={this.props.value} className={this.props.classList.join(' ')}
        onClick={(event) => {this.initEE.emit('clickOnNavEl', parseInt(event.target.id))}}>
        {this.props.value} page
      </li>
    );
  }
}