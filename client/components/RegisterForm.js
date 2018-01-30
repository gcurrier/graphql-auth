import React, {Component} from 'react';
import AuthForm from './AuthForm';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Register';
import query from '../queries/CurrentUser';
import {hashHistory} from "react-router";


class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {errors: []};
  }

  componentWillUpdate(nextProps) {
    // this.props //the current set of props
    // nextProps //next set of props to be used when the component rerenders
    // console.log(this.props,nextProps);
    if (nextProps.data.user && !this.props.data.user) {
      //redirect to dashboard
      hashHistory.push('/Dashboard');
    }
  }

  onSubmit({email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{query}]
    })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({errors});
      })
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}/>
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(RegisterForm)
);