const input = document.querySelector('input[type="text"]');
const addBtn = document.querySelector('.added-btn');
const listContent = document.querySelector('.list');

const list = [];

function addItem() {
  let li = '';
  li += `<li>
      <p>${input.value}</p>
      <button class="checked-btn"><i class="bx bx-check"></i></button>
      <button class="deleted-btn"}><i class="bx bxs-trash"></i></button>
      </li>`;
  list.push(li);
  listContent.innerHTML = list.join('');
  input.value = '';
}
function buttonHandler(e) {
  const btn = e.target;
  if (btn.classList[0] == 'checked-btn') {
    btn.parentNode.classList.toggle('finished');
  } else if (btn.classList[0] == 'deleted-btn') {
    btn.parentNode.classList.add('removed');

    btn.parentNode.addEventListener('transitionend', () => {
      btn.parentNode.remove();
      //還沒找到方法取index
      // deletedItem(index);
    });
  }
}
function deletedItem(index) {
  list.splice(index, 1);
}
addBtn.addEventListener('click', addItem);
listContent.addEventListener('click', buttonHandler);
