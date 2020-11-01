import React from 'react';

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
    <header id="top">
      <div className="header-content">
        <p>{this.props.auth}</p>
        <i
          className="fa fa-bars"
          aria-hidden="true"
          onClick={e => this.handleToggle(e)}
        />
      </div>
    </header>
  )
}

}

export default Header
