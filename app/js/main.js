document.addEventListener("DOMContentLoaded", function (event) {
  const burger = document.querySelector(".burger");

  const menu = document.querySelector(".menu");
  const menuLink = document.querySelectorAll(".menu__link");
  const bodyLock = document.querySelector("body");
  burger.setAttribute("aria-label", "Открыть меню");

  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
    if (menu.classList.contains("active")) {
      burger.classList.add("burger_active");
      burger.setAttribute("aria-label", "Закрыть меню");
      bodyLock.classList.add("lock");
    } else {
      burger.classList.remove("burger_active");
      burger.setAttribute("aria-label", "Открыть меню");
      bodyLock.classList.remove("lock");
    }
  });

  menuLink.forEach((el) => {
    el.addEventListener("click", () => {
      menu.classList.remove("active");
      burger.classList.remove("burger_active");
      bodyLock.classList.remove("lock");
    });
  });

  ///////////////////////////////////////////////////////////////////////
  //Swiper-slider

  const swiper = new Swiper(".portfolio__slider", {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: 3,
    preventClicks: false,
    keyboard: {
      enabled: true,
    },
    loop: true,

    coverflowEffect: {
      rotate: 20,
      depth: 25,
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        coverflowEffect: {
          rotate: 0,
          depth: 0,
        },
      },

      500: {
        slidesPerView: 2,
      },

      1000: {
        slidesPerView: 3,
      },
    },

    pagination: {
      el: ".portfolio__pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  ////////////////////////////////////////////
  baguetteBox.run(".portfolio__wrapper");

  /////////////////////////////////////////////////////////////////////

  const contactBlock = document.querySelector(".phone-contact");

  function changeSize() {
    if (document.documentElement.clientWidth < 576) {
      menu.append(contactBlock);
    } else {
      menu.insertAdjacentElement("afterend", contactBlock);
    }
  }

  changeSize();

  window.addEventListener("resize", changeSize);

  //////////////////////////////////////////////////////////

  let menuItems = document.getElementsByClassName("menu__item");
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener("click", function () {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  const anchors = document.querySelectorAll('[data-where="anchor"]');

  for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const blockID = anchor.getAttribute("href");
      document.querySelector("" + blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }
  ///////////////////////////////////////////////////////////

  AOS.init();

  /////////////////////////////////////////////////////////////
  //slider-location
  const swiperLocation = new Swiper(".location__slider", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    preventClicks: false,
    keyboard: {
      enabled: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      414: {
        slidesPerView: 1.25,
        spaceBetween: 10,
      },

      575: {
        slidesPerView: 2,
      },

      768: {
        slidesPerView: 3,
      },
    },
  });

  //////////////////////////////Showmore Block

  const infoBlockText = document.querySelectorAll(".info-block__text");
  const openInfoBlockBtn = document.querySelectorAll(".info-block__button");

  for (let i = 0; i < openInfoBlockBtn.length; i++) {
    openInfoBlockBtn[i].addEventListener("click", () => {
      openInfoBlockBtn[i].classList.toggle("active");
      openInfoBlockBtn[i].previousElementSibling.classList.toggle("close");
    });
  }

  ////////////////////inputMask
  const phone = document.querySelector("#phone");
  const inputMask = new Inputmask("+38(999)-999-99-99");
  inputMask.mask(phone);

  /////////////////////////Modal
  const modalGift = document.querySelector(".modal");
  const modalWrapperGift = document.querySelector(".modal__wrapper");
  const openModalWindow = document.querySelector(".gift__image-button");
  const closeModalWindow = document.querySelector(".modal__close");
  const modalContent = document.querySelector(".modal__content");
  const giftForm = document.querySelector(".modal__form");
  const greetingWindow = document.querySelector(".greeting");
  const closeBtnGreeting = document.querySelector(".greeting__close");

  function openModal() {
    modalGift.classList.add("active");
    document.body.style.overflow = "hidden";
    modalContent.style.visibility = "visible";
    modalContent.style.opacity = 1;
    greetingWindow.classList.remove("active");
    giftForm.elements.name.value = "";
    giftForm.elements.email.value = "";
    giftForm.elements.phone.value = "";
  }

  function closeModal() {
    modalGift.classList.remove("active");
    document.body.style.overflow = "";
  }

  openModalWindow.addEventListener("click", openModal);

  closeModalWindow.addEventListener("click", closeModal);

  modalGift.addEventListener("click", (e) => {
    if (
      e.target === modalGift ||
      (e.target === modalWrapperGift &&
        greetingWindow.classList.contains("active"))
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      (e.code === "Escape" && modalGift.classList.contains("active")) ||
      (e.code === "Escape" && greetingWindow.classList.contains("active"))
    ) {
      closeModal();
    }
  });

  function submitForm() {
    giftForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalContent.style.visibility = "hidden";
      modalContent.style.opacity = 0;
      greetingWindow.classList.add("active");
    });
  }

  submitForm();

  closeBtnGreeting.addEventListener("click", () => {
    closeModal();
  });

  ////////////////////CalculateForm

  // const calculateBtnOpen = document.querySelectorAll(".card__services-item");
  // const calculateWindow = document.querySelector(".calculate");
  // const calculateInput = document.querySelector(".calculate__input");
  // const calculateBtnSave = document.querySelector(".calculate__button");
  // const cardPrice = document.querySelectorAll(".card__price");
  // let textPriceNumber;
  // let number;

  // function openCalculateWindow() {
  //   calculateWindow.classList.add("active");
  // }

  // function closeCalculateWindow() {
  //   calculateWindow.classList.remove("active");
  // }

  // calculateWindow.addEventListener("click", (e) => {
  //   if (
  //     e.target === calculateWindow &&
  //     calculateWindow.classList.contains("active")
  //   ) {
  //     closeCalculateWindow();
  //   }
  // });

  // document.addEventListener("keydown", (e) => {
  //   if (e.code === "Escape" && calculateWindow.classList.contains("active")) {
  //     closeCalculateWindow();
  //   }
  // });

  // calculateBtnOpen.forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     openCalculateWindow();
  //     let target = e.target;
  //     const currBtn = target.dataset.calculate;
  //   });
  // });

  // // calculateBtnSave.addEventListener("click", closeCalculateWindow);

  // const takeNumber = () => {
  //   for (let i = 0; i < cardPrice.length; i++) {
  //     let textPrice = cardPrice[i];
  //     textPriceNumber = textPrice.outerText.slice(0, -2);
  //   }
  // };

  // calculateInput.addEventListener("input", () => {
  //   number = +calculateInput.value;
  // });

  // calculateBtnSave.addEventListener("click", (e) => {
  //   takeNumber(price);
  //   console.log(price)
  //   let calculate = number * 50 + Number(textPriceNumber);
  //   cardPrice.outerText += calculate + "₴";
  //   number = "";
  // });

  //   tabs.addEventListener('click', e => {
  //     const currTab = e.target.dataset.btn;
  //     changeClass(e.target);
  //     for(let i = 0; i < content.length; i++) {
  //         content[i].classList.remove('active');
  //         if(content[i].dataset.content === currTab) {
  //             content[i].classList.add('active');
  //         }
  //     }
  // })

  const popup = document.querySelector(".calculate");

  document.querySelector(".price__list").addEventListener("click", (event) => {
    if (event.target.classList.contains("card__services-btn")) {
      const count = event.target.getAttribute("data-calculate");
      const price = event.target.getAttribute("data-price");
      const priceBtn = event.target;

      popup.classList.add("active");
      document
        .querySelector(".calculate__button")
        .addEventListener("click", changeTitle);

      function changeTitle() {
        const input = document.querySelector(".calculate__input");

        if (+input.value) {
            event.target.closest('.card__content').querySelector('.card__price').innerHTML = +input.value * +count + +price + " " + "₴";            
        }
        popup.classList.remove("active");
        document
          .querySelector(".calculate__button")
          .removeEventListener("click", changeTitle);
        input.value = "";
      }
    }
  });

  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("active") && e.target === popup) {
      popup.classList.remove("active");
    }
  });
});
