//Carousel
const carouselImgs = document.querySelectorAll('.carousel img');
const controlBtns = document.querySelectorAll('.carousel i.bx');
const manualBtns = Array.from(document.querySelectorAll('.carousel-maunal li'));
let slide = 0;
function slideNext() {
  slide >= carouselImgs.length - 1 ? (slide = 0) : slide++;
  carouselImgs.forEach(img => {
    img.style.transform = `translateX(${slide * -100}%)`;
  });
  document
    .querySelector('.carousel-maunal li.active')
    .classList.remove('active');
  manualBtns[slide].classList.add('active');
}
function slidePrev() {
  slide <= 0 ? (slide = carouselImgs.length - 1) : slide--;
  carouselImgs.forEach(img => {
    img.style.transform = `translateX(${slide * -100}%)`;
  });
  document
    .querySelector('.carousel-maunal li.active')
    .classList.remove('active');
  manualBtns[slide].classList.add('active');
  console.log(slide);
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
    slide = i;
    carouselImgs.forEach(img => {
      img.style.transform = `translateX(${i * -100}%)`;
    });
    // console.log(i);
  });
});
