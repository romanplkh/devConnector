import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { registeruser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeInput = ev => {
    this.setState({
      ...this.state,
      [ev.target.name]: ev.target.value
    });
  };

  onSubmitForm = ev => {
    ev.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registeruser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmitForm}>
                <TextFieldGroup
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChangeInput={this.onChangeInput}
                  placeholder="Name"
                  error={errors.name}
                />
                <TextFieldGroup
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChangeInput={this.onChangeInput}
                  placeholder="Email Address"
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use
                  a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChangeInput={this.onChangeInput}
                  placeholder="Password"
                  error={errors.password}
                />
                <TextFieldGroup
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChangeInput={this.onChangeInput}
                  placeholder="Confirm Password"
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { registeruser }
)(withRouter(Register));
