const ul = document.querySelector('.container ul');
const btns = document.querySelectorAll('.pagination ul li');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const articles = [1, 2, 3, 4, 5, 6, 7, 8];
let currentPage = 1;
let ItemsInEachPage = 5;
let totalPage = Math.ceil(articles.length / ItemsInEachPage);

function pageChange(page) {
  page == 1 ? prevBtn.classList.add('hide') : prevBtn.classList.remove('hide');
  page == totalPage
    ? nextBtn.classList.add('hide')
    : nextBtn.classList.remove('hide');
  const arr = articles.slice(
    (page - 1) * ItemsInEachPage,
    page * ItemsInEachPage
  );
  ul.innerHTML = '';
  arr.forEach(item => {
    ul.innerHTML += `<li>Article ${item}</li>`;
  });
}

btns.forEach((btn, i) =>
  btn.addEventListener('click', e => {
    if (e.target.classList.contains('prev')) {
      currentPage--;
      pageChange(currentPage);
      if (currentPage < 1) currentPage = 1;
    }
    if (e.target.classList.contains('next')) {
      currentPage++;
      pageChange(currentPage);
      if (currentPage > totalPage) {
        currentPage = totalPage;
      }
    }
    if (e.target.classList.contains('page')) {
      currentPage = e.target.textContent;
      pageChange(currentPage);
    }
    document.querySelector('.active').classList.remove('active');
    i = currentPage;
    btns[i].classList.add('active');
    console.log(currentPage);
  })
);
pageChange(currentPage);
