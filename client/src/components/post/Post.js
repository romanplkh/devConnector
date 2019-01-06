import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    const { post, loading } = this.props.post;
    let postData;
    if (post === null || loading || Object.keys(post).length === 0) {
      postData = <Spinner />;
    } else {
      postData = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postID={post._id} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Go Back to Feed
              </Link>
              {postData}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
