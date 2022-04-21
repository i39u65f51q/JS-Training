const writePost = document.querySelector('.write-post');
const submitPost = writePost.querySelector('input.submit');
const postName = writePost.querySelector('input.name');
const postTitle = writePost.querySelector('input.title');
const postContent = writePost.querySelector('.post');
//Render Articles
function render(postsArr = []) {
  const postList = document.querySelector('.post-list');
  const article = postsArr
    .map(post => {
      return `<article id="${post.id}">
      <div class="post-header">
        <div class="poster">
          <h4 class="user-name">${post.name}</h4>
          <h6 class="post-time">${post.time}</h6>
        </div>
        <button class="edit-btn">
          edit
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

  const articles = document.querySelectorAll('article');
  articles.forEach(article =>
    article.addEventListener('click', ClickArticleHandler)
  );
}
function ClickArticleHandler(e) {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const article = button.parentNode.parentNode;
    const id = article.getAttribute('id');
    //Delete Post
    if (button.classList[0] == 'delete-btn') {
      deletePostToJSON(id);
    }
    const postContent = this.querySelector('.post-content');
    //Edit Post
    if (button.innerText == 'edit') {
      const title = postContent.firstElementChild;
      const content = postContent.lastElementChild;
      postContent.innerHTML = `
      <input type="text" value="${title.textContent}">
      <textarea>${content.textContent}</textarea>`;
      button.textContent = 'save';
      //Save Post
    } else if (button.textContent == 'save') {
      const inputTitle = postContent.firstElementChild;
      const inputContent = postContent.lastElementChild;
      // postContent.innerHTML = `<h3 class="title">${inputTitle.value}</h3>
      // <p>${inputContent.value}</p>`;
      //Get Time
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDay();

      const post = {
        time: `${year}/${month}/${day}`,
        title: inputTitle.value,
        post: inputContent.value,
      };
      updatePostToJSON(post, id);
      button.textContent = 'edit';
    }
  }
}
// Call API Training
const url = 'http://localhost:3000/post/';
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
// PATCt Method
function updatePostToJSON(data, id) {
  return fetch(url + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).catch(err => console.log(err));
}
// Delete Method
function deletePostToJSON(id) {
  return fetch(url + id, {
    method: 'DELETE',
  }).catch(err => console.log(err));
}
//Upload the Post
function uploadPost() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDay();
  const post = {
    name: postName.value,
    time: `${year}/${month}/${day}`,
    title: postTitle.value,
    post: postContent.value,
    like: 0,
    angry: 0,
  };
  uploadPostToJSON(post);
}
//Event of Submit the post to JSON
submitPost.addEventListener('click', uploadPost);
// Render the JavaScript
getPostFromJson();
