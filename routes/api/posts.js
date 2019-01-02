const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Validate Post input

const validatePostInput = require("../../validation/post");
//POST MODELS
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");

//@route    GET api/posts
//@desc     Get posts
//@access   Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//@route    GET api/posts/:id
//@desc     Get posts
//@access   Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

//@route    POST api/posts
//@desc     Create posts
//@access   Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validatePostInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

//@route    DELETE api/posts/:id
//@desc     Delete post
//@access   Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete psot
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "post not found" }));
    });
  }
);

//@route    POST api/posts/like/:id
//@desc     LIKE post
//@access   Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          //Add User id to Likes array
          post.likes.push({ user: req.user.id });

          post.save().then(savedpost => res.json(savedpost));
        })
        .catch(err => res.status(404).json({ err }));
    });
  }
);

//@route    POST api/posts/unlike/:id
//@desc     Unlike post
//@access   Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }

          //Get removed index
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
          //Splice from array
          post.likes.splice(removeIndex, 1);

          post.save().then(savedpost => res.json(savedpost));
        })
        .catch(err => res.status(404).json({ err }));
    });
  }
);

//@route    POST api/posts/comment/:id
//@desc     Add comment to post
//@access   Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //VaAlidate
        const { isValid, errors } = validatePostInput(req.body);

        if (!isValid) {
          res.status(400).json(errors);
        }

        //GET INPUT FROM FIELDS
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        post.comments.unshift(newComment);
        post.save().then(savedpost => res.json(savedpost));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//@route    DELETE api/posts/comment/:id/:comment_id
//@desc     DELETE comment from post
//@access   Private

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exists" });
        }

        //Get removed index
        const removedIndex = post.comments
          .map(comment => comment.id.toString())
          .indexOf(req.params.comment_id);

        //Splice from array
        post.comments.splice(removedIndex, 1);

        post.save().then(savedpost => res.json(savedpost));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
