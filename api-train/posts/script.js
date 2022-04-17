// Call API Training
const writePost = document.querySelector('.write-post');
const submitPost = writePost.querySelector('input.submit');
const postName = writePost.querySelector('input.name');
const postTitle = writePost.querySelector('input.title');
const postContent = writePost.querySelector('.post');
//API Link
const url = 'http://localhost:3000/post';
// Get Method
function getPostFromJson() {
  return fetch(url)
    .then(res => res.json())
    .then(succ => {
      const [posts] = [succ];
      console.log(posts);
      render(posts);
    });
}
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
//Render Articles
function render(postsArr = []) {
  const postList = document.querySelector('.post-list');
  const article = postsArr
    .map(post => {
      return `<article>
      <div class="post-header">
        <div class="poster">
          <h4 class="user-name">${post.name}</h4>
          <h6 class="post-time">${post.time}</h6>
        </div>
        <button class="edit-btn">
          <i class="bx bx-dots-horizontal-rounded"></i>
        </button>
      </div>
      <div class="post-content">
        <h3 class="title">${post.title}</h3>
        <p>${post.post}</p>
      </div>
      <div class="post-footer">
        <div class="emoji">
          <div class="good">
            <i class="bx bx-laugh"></i>
            <span>${post.like}</span>
          </div>
          <div class="angry">
            <i class="bx bx-angry"></i>
            <span>${post.angry}</span>
          </div>
        </div>
        <button class="delete-btn">
          <i class="bx bx-trash"></i>
        </button>
      </div>
    </article>`;
    })
    .join('');
  postList.innerHTML = article;
}
//Upload the Post
function uploadPost() {
  let post = {
    name: postName.value,
    time: 'now',
    title: postTitle.value,
    post: postContent.textContent,
    like: 0,
    angry: 0,
  };
  uploadPostToJSON(post);
}
// Render the JavaScript
getPostFromJson();
//Event of Submit the post to JSON
submitPost.addEventListener('click', uploadPost);
