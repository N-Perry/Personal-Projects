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
    React.createElement(React.Fragment, null, props.user.username, ": ", posts));

};

// displays user post, ideally alongside username, profile pic, etc. in the future
const Post = props => {

  return /*#__PURE__*/(
    React.createElement("h3", null, props.post.postText));

};


ReactDOM.render( /*#__PURE__*/React.createElement(HomePage, null), document.getElementById('app'));