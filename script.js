'use strict';

// Navbar Animation opacity
const logo = document.querySelector('.nav__logo');
const navbar = document.querySelectorAll('.nav__item');

const changeOpacity = function (el, opacity) {
  navbar.forEach(elem => {
    if (elem !== el) elem.style.opacity = opacity;
    logo.style.opacity = opacity;
  });
};

navbar.forEach(el => {
  el.style.transition = 'opacity 0.5s';
  el.addEventListener('mouseover', ev => {
    changeOpacity(el, 0.5);
  });
  el.addEventListener('mouseout', ev => {
    changeOpacity(el, 1.0);
  });
});

// Sticky navbar
window.onscroll = function () {
  stickyFunc();
};
const menu = document.querySelector('.nav');
const sticky = menu.offsetTop;

const stickyFunc = function () {
  if (window.pageYOffset > sticky) {
    menu.classList.add('sticky');
  } else menu.classList.remove('sticky');
};

// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookie msg
const cookieMsg = document.createElement('div');
cookieMsg.classList.add('cookie-message');
cookieMsg.style.backgroundColor = '#37383d';
cookieMsg.style.width = '100%';
cookieMsg.style.height = cookieMsg.offsetHeight + 60 + 'px';
cookieMsg.innerHTML = `
<p>We use cookie for functionality and analitycs</p>
<button id="cookie" type="button" class="btn btn--show-modal">That's fine!</button>
`;
document.querySelector('.header').after(cookieMsg);
document
  .querySelector('#cookie')
  .addEventListener('click', () => cookieMsg.remove());

// Section animation
let sectAnim = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      entry.target.classList.add('section');
      secAnimObserver.unobserve(entry.target);
    }
  });
};

let secAnOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15,
};

let secAnimObserver = new IntersectionObserver(sectAnim, secAnOptions);

let targetSecAnim = document.querySelectorAll('.section--hidden');
targetSecAnim.forEach(sec => secAnimObserver.observe(sec));

// Blur img
let callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.getAttribute('data-src');
      entry.target.addEventListener('load', event => {
        entry.target.classList.remove('lazy-img');
      });
      observer.unobserve(entry.target);
    }
  });
};

let options = {
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);

let target = document.querySelectorAll('.lazy-img');
target.forEach(targ => observer.observe(targ));

// Tabs
const openTab = function (event, numTab) {
  let tabCont, tabLink;

  tabCont = document.querySelectorAll('.operations__content');
  tabCont.forEach(tab => tab.classList.remove('operations__content--active'));

  tabLink = document.querySelectorAll('.operations__tab');
  tabLink.forEach(link => link.classList.remove('operations__tab--active'));

  document.querySelector(numTab).classList.add('operations__content--active');
  event.currentTarget.classList.add('operations__tab--active');
};

// SLIDER CAROUSEL
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

let curSlide = 0;
let maxSlide = slides.length - 1;

// Put all slides in one line and slide function
const slideInline = (slide, i) =>
  (slide.style.transform = `translateX(${100 * (i - curSlide)}%)`);

slides.forEach((slide, i) => {
  slideInline(slide, i);

  // create dots
  dotsContainer.innerHTML += `<span class="dots__dot"></span>`;
});

const dots = document.querySelectorAll('.dots__dot');
dots[0].classList.add('dots__dot--active');

const nextSlideRight = document.querySelector('.slider__btn--right');
const nextSlideLeft = document.querySelector('.slider__btn--left');

//swaping slides
const slidesChange = function () {
  slides.forEach((slide, i) => {
    slideInline(slide, i);

    dots.forEach(dot => {
      dots[curSlide] !== dot
        ? dot.classList.remove('dots__dot--active')
        : dot.classList.add('dots__dot--active');
    });
  });
};

// dot open slide
dots.forEach((d, i) => {
  d.addEventListener('click', e => {
    curSlide = i;
    slidesChange();
  });
});

// Take direction to right
const nextSlide = function () {
  if (curSlide == maxSlide) {
    curSlide = 0;
  } else curSlide++;

  slidesChange();
};

// Take direction to left
const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide;
  } else curSlide--;

  slidesChange();
};

// click arrow right
nextSlideRight.addEventListener('click', () => {
  nextSlide();
});

// click arrow left
nextSlideLeft.addEventListener('click', () => {
  prevSlide();
});

// swipe slides by pressing keyboard
addEventListener('keydown', e => {
  if (e.code == 'ArrowRight') nextSlide();
  else if (e.code == 'ArrowLeft') prevSlide();
});
