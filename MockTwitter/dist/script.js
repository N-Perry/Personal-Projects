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
      postText: "Can Life cereal sponsor me? i eat so much of that stuff" },
    {
      postID: 3,
      postText: "Y'all hear the Titanic sunk? Damn" }] } };





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

  return /*#__PURE__*/(
    React.createElement("div", { className: "post" }, /*#__PURE__*/
    React.createElement("div", { className: "profile-pic" }, "PP"), /*#__PURE__*/
    React.createElement("h4", { className: "post-text" }, props.post.postText), /*#__PURE__*/
    React.createElement("hr", null), /*#__PURE__*/
    React.createElement("div", { className: "post-footer" }, /*#__PURE__*/
    React.createElement("button", { className: "btn" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-comment" })), /*#__PURE__*/
    React.createElement("button", { className: "btn" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-retweet" })), /*#__PURE__*/
    React.createElement("button", { className: "btn" }, /*#__PURE__*/React.createElement("i", { className: "fa-solid fa-heart" })))));



};


ReactDOM.render( /*#__PURE__*/React.createElement(HomePage, null), document.getElementById('app'));