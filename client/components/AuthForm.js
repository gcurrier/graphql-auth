import React, {Component} from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    // const {email,password} = this.state;
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({email: e.target.value})}/>
            <div className="input-field">
              <label>Password</label>
              <input
                placeholder="Email"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({password: e.target.value})}/>
            </div>
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    )
  }
}

export default AuthForm