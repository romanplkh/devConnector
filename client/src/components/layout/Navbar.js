import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogOutClick = ev => {
    ev.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logOutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const loged_in_user = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/feed" className="nav-link">
            Post Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">
            My Profile
          </Link>
        </li>
        <li
          className="nav-link"
          style={{ cursor: "pointer" }}
          onClick={this.onLogOutClick}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="rounded-circle"
            title="You must have a Gravatar connected to you email to display an image"
            style={{ width: "25px", marginRight: "5px" }}
          />
          Logout
        </li>
      </ul>
    );

    const not_a_user = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/profiles" className="nav-link">
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? loged_in_user : not_a_user}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOutUser, clearCurrentProfile }
)(Navbar);
