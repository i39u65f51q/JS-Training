// Call API Training
const url = 'http://localhost:3000/Images/';
// Get Images
window.addEventListener('load', () => {
  fetch(url)
    .then(res => res.json())
    .then(succ => console.log(succ));
});
// Post Images
function appendImg() {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(img),
  });
}
// Put Images
function updateImg() {
  return fetch(url + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(img),
  }).catch(err => console.log(err));
}
// Delete Images
function deleteImg() {
  return fetch(url + id, {
    method: 'DELETE',
  }).catch(err => console.log(err));
}

let img = {
  imgName: imgName.value,
  src: imgLink,
  description: imgDescription,
};
