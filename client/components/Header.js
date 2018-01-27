import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/CurrentUser';
import mutation from './mutations/Logout';
import {Link} from 'react-router';

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{
        query
      }]
    });
  }

  renderButtons() {
    const {loading, user} = this.props.data;
    if (loading) {
      return <div/>;
    }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li><Link to="/Register">Register</Link></li>
          <li><Link to="/Login">Login</Link></li>
        </div>
      )
    }
  }

  render() {
    // console.log(this.props.data);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo-left">App Home</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    )
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);