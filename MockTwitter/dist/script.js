import { useState } from "https://cdn.skypack.dev/react@17.0.1"; // i want practice using hooks! :)

const fakeUserDB = { // user info can be accessed via username (this probably isn't best practice lol)
  'Andy': {
    username: 'JRodEnthusiast97',
    posts: [
    {
      postID: 1,
      postText: "Man oh man i just really love the Houston Astros!" },
    {
      postID: 2,
      postText: "Does anyone else think that Nick is just the greatest man alive?" },
    {
      postID: 3,
      postText: "My cat Jo is just a snugglybugglyumpkins :3 #meow" }] },



  'Nick': {
    username: 'slickNicky98',
    posts: [
    {
      postID: 1,
      postText: "Get buckets or die trying #differentanimal #samebeast" },
    {
      postID: 2,
      postText: "Should i do standup? honest replies only" },
    {
      postID: 3,
      postText: "Never forget the Alamo." }] } };





// for now, displays all user posts from fakeDB
class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let users = [];
    for (const user in fakeUserDB) {
      users.push(fakeUserDB[user]);
    }

    users = users.map(user => {
      return /*#__PURE__*/(
        React.createElement(PostsList, { user: user }));

    });

    return /*#__PURE__*/(
      React.createElement("div", { id: "home-page" },
      users));


  }}


// outputs list of Post components
const PostsList = props => {
  const posts = props.user.posts.map(post => {
    return /*#__PURE__*/React.createElement(Post, { post: post });
  });

  return /*#__PURE__*/(
    React.createElement(React.Fragment, null, /*#__PURE__*/
    React.createElement("strong", null, "@", props.user.username), ":", /*#__PURE__*/
    React.createElement("div", { className: "posts-list" }, posts)));


};

// displays user post, ideally alongside username, profile pic, etc. in the future
const Post = props => {
  const [likesCount, setLikesCount] = React.useState(0);
  const [commenting, setCommenting] = React.useState(false);
  const [commentList, setCommentList] = React.useState([]);

  const handleLike = () => {
    setLikesCount(likesCount + 1);
  };

  const handleComment = () => {
    if (commenting) {
      setCommenting(false);
    } else {
      setCommenting(true);
    }
  };

  const handleSubmitComment = comment => {
    if (comment) {
      setCommentList([...commentList, comment]);
      setCommenting(false);
    }
  };

  const handleRetweet = () => {
    if (commenting) {
      setCommenting(false);
    }
    alert("imagine actually implementing retweet functionality LOL couldn't be me");
  };

  const comments = commentList.map(comment => {
    return /*#__PURE__*/(
      React.createElement("div", { className: "comment" }, comment));

  });

  return /*#__PURE__*/(
    React.createElement("div", { className: "post" }, /*#__PURE__*/
    React.createElement("div", { className: "profile-pic" }, "PP"), /*#__PURE__*/
    React.createElement("h4", { className: "post-text" }, props.post.postText),
    comments, /*#__PURE__*/
    React.createElement("hr", null),
    commenting && /*#__PURE__*/React.createElement(CommentForm, { handleSubmit: handleSubmitComment }), /*#__PURE__*/
    React.createElement("div", { className: "post-footer" }, /*#__PURE__*/
    React.createElement("button", { className: "btn", name: "comment", onClick: handleComment }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-comment" })), /*#__PURE__*/
    React.createElement("button", { className: "btn", name: "retweet", onClick: handleRetweet }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-retweet" })), /*#__PURE__*/
    React.createElement("span", null, /*#__PURE__*/React.createElement("button", { className: "btn", name: "like", onClick: handleLike }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-heart" })), likesCount))));



};

// component for textbox & submit button that appears when 'commenting' state is true
const CommentForm = props => {
  const [comment, setComment] = React.useState('');

  const handleChange = e => {
    setComment(e.target.value);
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "commenting" }, /*#__PURE__*/
    React.createElement("textarea", { name: "commentBox", onChange: handleChange, value: comment, rows: "4", cols: "50" }), /*#__PURE__*/

    React.createElement("button", { className: "submit-comment btn btn-primary", onClick: () => props.handleSubmit(comment) }, "submit")));


};


ReactDOM.render( /*#__PURE__*/React.createElement(HomePage, null), document.getElementById('app'));