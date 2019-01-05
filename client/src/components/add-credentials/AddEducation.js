import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onCheckInput = ev => {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current
    }));
  };

  onChangeInput = ev => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  };

  onSubmitForm = ev => {
    ev.preventDefault();
    const eduUserData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduUserData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, online courses etc that you have
                attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmitForm}>
                <TextFieldGroup
                  placeholder="* School or Bootcamp"
                  name="school"
                  value={this.state.school}
                  onChangeInput={this.onChangeInput}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certificate"
                  name="degree"
                  value={this.state.degree}
                  onChangeInput={this.onChangeInput}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChangeInput={this.onChangeInput}
                  error={errors.fieldofstudy}
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChangeInput={this.onChangeInput}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChangeInput={this.onChangeInput}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheckInput}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current place of study
                  </label>
                </div>
                <TextAreaGroup
                  placeholder="Programm Description"
                  name="description"
                  value={this.state.description}
                  onChangeInput={this.onChangeInput}
                  error={errors.description}
                  info="Tell us more about your education"
                />
                <input
                  type="submit"
                  value="Save"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
