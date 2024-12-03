window.addEventListener('DOMContentLoaded', ()=>{

  const menuBtn = document.querySelector('.menu__btn');
  const mobilMenu = document.querySelector('.menu__inner');

  menuBtn.addEventListener('click', ()=>{
    if (menuBtn) {
       document.body.classList.toggle('lock');
       menuBtn.classList.toggle('menu__btn--active');
       mobilMenu.classList.toggle('menu__inner--open');
    }
  });

  const closeMenu = () => {
    document.body.classList.remove('lock');
    menuBtn.classList.remove('menu__btn--active');
    mobilMenu.classList.remove('menu__inner--open');
  };

  document.body.addEventListener('click',(e)=>{
    if (
      e.target.closest('.menu__btn') == null &&
      e.target.closest('.menu__inner') != mobilMenu) {
        closeMenu()
      }
  });
 

      
    // ourmenu
  const swiperOurMenu = new Swiper(".ourmenu-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
    nextEl: ".ourmenu__control-next",
    prevEl: ".ourmenu__control-prev",
  },
  });

    //review
  var swiperReview = new Swiper(".review__slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

});

