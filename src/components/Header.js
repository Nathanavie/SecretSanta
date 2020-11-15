import React from 'react';

import christmas from '../assets/xmasBackgroundfull.png'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    }
  }

handleToggle = (e) => {
  e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
}

render() {
  return(
    <header>
      <div className="header-content">
        <img id="headerIcon" src={christmas} alt="christmas Tree Icon" />
        <nav className = {`${this.state.isExpanded ? "is-expanded" : ""}`}>
          <input
            type="submit"
            value="Log Out"
            onClick={() => this.props.logOutUser()}
          />
        </nav>
      </div>
    </header>
  )
}

}

export default Header
