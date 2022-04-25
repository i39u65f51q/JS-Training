const input = document.querySelector('header input');
const addBtn = document.querySelector('.added-btn');
const list = [];
function addItem() {
  const ul = document.querySelector('ul');
  let li = ` <li>
  <span>${input.value}</span>
  <button class="checked-btn list-btn">
    <i class="bx bx-check"></i>
  </button>
  <button class="deleted-btn list-btn">
    <i class="bx bxs-trash"></i>
  </button>
</li>`;
  list.push(li);
  ul.innerHTML = list.join('');
  input.value = '';

  const btns = document.querySelectorAll('.list-btn');
  btns.forEach((btn, i) => {
    btn.addEventListener('click', e => {
      if (e.target.classList.contains('checked-btn')) {
        const span = e.target.parentNode.firstElementChild;
        span.classList.toggle('finished');
      }
      if (e.target.classList.contains('deleted-btn')) {
        const li = e.target.parentNode;
        li.classList.add('removed');
        li.addEventListener('transitionend', () => {
          deleteItem();
          li.remove();
        });
      }
    });
  });
}
function deleteItem(e) {
  const deleteBtns = document.querySelectorAll('.deleted-btn');
  deleteBtns.forEach((btn, i) => {
    list.splice(i, 1);
  });
}
addBtn.addEventListener('click', addItem);
