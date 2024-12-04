window.addEventListener('DOMContentLoaded', ()=>{

  const menuBtn = document.querySelector('.menu__btn');
  const mobilMenu = document.querySelector('.menu__inner');

  // вызов мобильного меню
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

  // закрытие мменю при нажатии мимо меную
  document.body.addEventListener('click',(e)=>{
    if (
      e.target.closest('.menu__btn') == null &&
      e.target.closest('.menu__inner') != mobilMenu) {
        closeMenu();
      }
  });

  // прокрутка от меню к секции
  const scrollLinks = document.querySelectorAll('.menu__item-link');

    scrollLinks.forEach(link => {
      link.addEventListener('click', (e)=>{
        e.preventDefault();

        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if(targetElement) {
          // Вычисляю растояние прокрутки с учётом высоты шапки
          const headerHeight = document.querySelector('#header').offsetHeight;

          const top = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: top,
            behavior: "smooth"
          });
          // Удаляю классы активности и закрываю меню
          closeMenu()
        }
      })
    });
 
    // слайдер ourmenu
  const swiper = new Swiper(".ourmenu-slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
    nextEl: ".ourmenu__control-next",
    prevEl: ".ourmenu__control-prev",
  },
  breakpoints: {
    // when window width is >= 320px
    0: {
      slidesPerView: 1,
    },
    320: {
      spaceBetween: 20,
      slidesPerView: 1,
    },
    860: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1110: {
      slidesPerView: 3,
    }

  }
  });

    // слайдер review
  var swiperReview = new Swiper(".review__slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  // modal
  const button =  document.querySelectorAll('[data-modal]');
  const modalWindow = document.querySelector('.modal');

  function openModal(params) {
    modalWindow.classList.add('modal--active');
    document.body.style.overflow = 'hidden';
    closeMenu();
    clearInterval(modalTimerId);
  }

  function closeModal(params) {
    modalWindow.classList.remove('modal--active');
    document.body.style.overflow = '';
  }

  // открываю модалку 
  button.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  
  modalWindow.addEventListener('click', (e)=>{
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  // открыавю модальное окно при пролистывании до конца
   function showModalByScroll(params) {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 10 ) {

        openModal();
        window.removeEventListener('scroll',showModalByScroll);
        }
      }
      window.addEventListener('scroll',showModalByScroll);

      //чтобы срабатывало закрытие при нажатии кнопки на клаве ескейп
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modalWindow.classList.contains('modal--active')) {
        closeModal();
      }
    });
    //вызову модальное окно через некоторе время 
    const modalTimerId = setTimeout(openModal, 60000);



      // Создаю дополнительное окно типа благорадности за отправку формы 

    function showThanksModal(message) { // в аргументы передаю объект message где находятся сообщения и мне нужно всеголишь выбрать нужное
      const prevModalDialog = document.querySelector('.modal__dialog');

      /* Прячу текущее */
      prevModalDialog.classList.add('hide');
      openModal();

      /* Создаю новое и присваеваю ему класс  modal__dialog */
      const thanksModal = document.createElement('div'); 
      thanksModal.classList.add('modal__dialog');

      /* Тперь надо сформировать вёрстку */
      thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div> `;

      // и указываю куда его добавляю
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
        thanksModal.remove(); 
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
      }, 4000);
    }
});
    

