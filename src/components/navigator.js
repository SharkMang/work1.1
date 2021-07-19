import React from "react";
import NavItem from "./navItem";

export default class Navigator extends React.Component {
  constructor(props) {
    super(props);

    this.initEE = props.EE;
  }

  render() {
    let navList = [];
    let classes = ['liNavSection'];
    const totalPages = this.props.navList.navListCounter;
    const choosedNav = this.props.navList.choosedNav;

    for(let i = 1; i <= totalPages; i++) {
      let classes = ['liNavSection'];
      if (i === choosedNav) {
        classes.push('selected');
      }
      navList.push(<NavItem EE={this.initEE} key={i} value={i} classList={classes}/>);
    }

    if (totalPages > 1) {
      return (
        <section>
          <ul className='ulNavSection'>
            {navList}
          </ul>
        </section>
      );
    } else {
      return <></>;
    }
  }
}