//Carousel
const carouselImgs = document.querySelectorAll('.carousel img');
const controlBtns = document.querySelectorAll('.carousel i.bx');
const manualBtns = document.querySelectorAll('.carousel-maunal li');
let slide = 0;
function carouselTransform() {
  carouselImgs.forEach(img => {
    img.style.transform = `translateX(${slide * -100}%)`;
  });
  document
    .querySelector('.carousel-maunal li.active')
    .classList.remove('active');
  manualBtns[slide].classList.add('active');
}
function slideNext() {
  slide >= carouselImgs.length - 1 ? (slide = 0) : slide++;
  carouselTransform();
}
function slidePrev() {
  slide <= 0 ? (slide = carouselImgs.length - 1) : slide--;
  carouselTransform();
}
setInterval(slideNext, 6000);
controlBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    if (e.target.classList.contains('next')) {
      slideNext();
    }
    if (e.target.classList.contains('prev')) {
      slidePrev();
    }
  });
});
manualBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    document.querySelector('.carousel li.active').classList.remove('active');
    btn.classList.add('active');
    carouselImgs.forEach(img => {
      img.style.transform = `translateX(${i * -100}%)`;
    });
    // console.log(i);
  });
});
//Carts Page
const toggleCartBtn = document.querySelector('button.cart');
const cartPage = document.querySelector('.cart-page');
toggleCartBtn.addEventListener('click', () => {
  cartPage.classList.toggle('show');
});
