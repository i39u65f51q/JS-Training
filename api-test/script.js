// Call API Training
// Post Method
function uploadPostToJSON(data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
// Put Method
function updatePostToJSON() {
  return fetch(url + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(img),
  }).catch(err => console.log(err));
}
// Delete Method
function deletePostToJSON() {
  return fetch(url + id, {
    method: 'DELETE',
  }).catch(err => console.log(err));
}

//Post Value
const writePost = document.querySelector('.write-post');
const submitPost = writePost.querySelector('input.submit');
const postName = writePost.querySelector('input.name');
const postTitle = writePost.querySelector('input.title');
const postContent = writePost.querySelector('input.post');
const postList = document.querySelector('.post-list');
// Call API
const url = 'http://localhost:3000/post/';

//DATA.JSON INTO ARRAY
const posts = [];
window.addEventListener('load', () => {
  // Get Method from JSON
  fetch(url)
    .then(res => res.json())
    .then(succ => posts.push(succ));
  console.log(posts);
});
//render
function render() {}
//Upload the Post
function uploadPost() {
  let post = {
    name: postName,
    time: 'now',
    title: postTitle,
    post: postContent,
    like: 0,
    angry: 0,
  };
  // uploadPostToJSON(post);
}
//Show Writing Post
document.querySelector('.add-post').addEventListener('click', e => {
  writePost.classList.toggle('show');
});
submitPost.addEventListener('click', e => {
  writePost.classList.remove('show');
});
submitPost.addEventListener('click', uploadPost());
