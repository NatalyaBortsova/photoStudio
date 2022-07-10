document.addEventListener("DOMContentLoaded", function (event) {
  const burger = document.querySelector(".burger");

  const menu = document.querySelector(".burger-menu");
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

  function changeActiveItem(activeItem = 0) {
    let menuItems = document.querySelectorAll(".menu__item");

    menuItems[activeItem].classList.add("active");

    for (const menuItem of menuItems) {
      menuItem.addEventListener("click", () => {
        clearActiveClasses();

        menuItem.classList.add("active");
      });
    }

    function clearActiveClasses() {
      menuItems.forEach((menuItem) => {
        menuItem.classList.remove("active");
      });
    }
  }

  changeActiveItem();
  ////////////////////////anchors
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

  //////////////////////////Location-modal

  const modalLocation = document.querySelector(".modal_location");
  const modalWrapperLocation = modalLocation.querySelector(".modal__wrapper");
  const openModalLocationBtn = document.querySelector(".location__button");
  const closeModalLocationBtn = modalLocation.querySelector(".modal__close");
  const modalLocationContent = modalLocation.querySelector(".modal__content");
  const locationForm = modalLocation.querySelector(".modal__form");
  const greetingLocationWindow = modalLocation.querySelector(".greeting");
  const closeBtnLocationGreeting =
    modalLocation.querySelector(".greeting__close");

  function openModalLocation() {
    modalLocation.classList.add("active");
    document.body.style.overflow = "hidden";
    modalLocationContent.style.visibility = "visible";
    modalLocationContent.style.opacity = 1;
    greetingLocationWindow.classList.remove("active");
    locationForm.elements.name.value = "";
    locationForm.elements.email.value = "";
    locationForm.elements.phone.value = "";
    label.textContent = labelTextcontent;
  }

  function closeModalLocation() {
    modalLocation.classList.remove("active");
    document.body.style.overflow = "";
  }

  openModalLocationBtn.addEventListener("click", openModalLocation);

  closeModalLocationBtn.addEventListener("click", closeModalLocation);

  modalLocation.addEventListener("click", (e) => {
    if (
      e.target === modalLocation ||
      (e.target === modalWrapperLocation &&
        greetingLocationWindow.classList.contains("active"))
    ) {
      closeModalLocation();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      (e.code === "Escape" && modalLocation.classList.contains("active")) ||
      (e.code === "Escape" &&
        greetingLocationWindow.classList.contains("active"))
    ) {
      closeModalLocation();
    }
  });

  function submitLocationForm() {
    locationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalLocationContent.style.visibility = "hidden";
      modalLocationContent.style.opacity = 0;
      greetingLocationWindow.classList.add("active");
    });
  }

  submitLocationForm();

  closeBtnLocationGreeting.addEventListener("click", () => {
    closeModalLocation();
  });

  ////////////////////////////Location Select

  const selectBlock = document.querySelector(".modal__input_select");
  const modalSelect = selectBlock.querySelector(".modal__select");
  const modalOptions = document.querySelectorAll(".modal__option");
  const label = document.querySelector(".modal__filter-selected");
  const labelTextcontent = label.textContent;
  function openSelectBox() {
    selectBlock.classList.toggle("active");
    modalSelect.classList.toggle("active");
  }

  selectBlock.addEventListener("click", openSelectBox);

  modalOptions.forEach((option) => {
    option.addEventListener("click", () => {
      label.textContent = option.textContent;
    });
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

  const locationPhone = document.querySelector("#locationPhone");
  const inputLocationMask = new Inputmask("+38(999)-999-99-99");
  inputMask.mask(locationPhone);

  const contactPhone = document.querySelector("#contactPhone");
  const inputContactMask = new Inputmask("+38(999)-999-99-99");
  inputMask.mask(contactPhone);

  const orderPhone = document.querySelector("#orderPhone");
  const inputOrderMask = new Inputmask("+38(999)-999-99-99");
  inputMask.mask(orderPhone);

  /////////////////////////Modal-gift
  const modalGift = document.querySelector(".modal");
  const modalWrapperGift = document.querySelector(".modal__wrapper");
  const openModalWindow = document.querySelector(".modal-button");
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
          event.target
            .closest(".card__content")
            .querySelector(".card__price").innerHTML =
            +input.value * +count + +price + " " + "₴";
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

  /////////////////////////////Slider Feedback

  const swiperFeedback = new Swiper(".feedback__slider", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 16,
    allowTouchMove: false,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: ".feedback__slider-button--next",
      prevEl: ".feedback__slider-button--prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 25,
      },

      768: {
        slidesPerView: 3,
      },
    },
  });

  ////////////////////////////Feedback text

  document
    .querySelector(".feedback__wrapper")
    .addEventListener("click", (e) => {
      if (e.target.classList.contains("feedback__showmore")) {
        const feedbackShowmore = e.target;
        const feedbackText = e.target
          .closest(".feedback__slide")
          .querySelector(".feedback__text");

        feedbackText.classList.remove("collapse");
        feedbackShowmore.classList.remove("show");
        feedbackBtn.style.bottom = 10 + "px";
      }
    });

  const feedbackText = document.querySelectorAll(".feedback__text");
  const feedbackShowmore = document.querySelectorAll(".feedback__showmore");
  const textLength = 290;

  feedbackText.forEach((text) => {
    if (text.textContent.length < textLength) {
      text.nextElementSibling.classList.remove("show");
    }
  });

  ////////////////////////////Feedback popup

  const modalFeedback = document.querySelector(".modal_feedback");
  const closeBtn = modalFeedback.querySelector(".modal__close");
  const feedbackForm = modalFeedback.querySelector(".modal__form");
  const modalFeedbackWrapper = modalFeedback.querySelector(".modal__wrapper");
  const greetingFeedbackWindow = modalFeedback.querySelector(".greeting");
  const modalFeedbackContent = modalFeedback.querySelector(".modal__content");
  const closeBtnFeedbackGreeting =
    modalFeedback.querySelector(".greeting__close");

  document.querySelector(".feedback").addEventListener("click", (e) => {
    if (e.target.classList.contains("feedback__button")) {
      const feedbackBtn = e.target;
      modalFeedback.classList.add("active");
      document.body.style.overflow = "hidden";
      modalFeedbackContent.style.visibility = "visible";
      modalFeedbackContent.style.opacity = 1;
      greetingFeedbackWindow.classList.remove("active");
      feedbackForm.elements.feedbackName.value = "";
      feedbackForm.elements.feedbackEmail.value = "";
      feedbackForm.elements.message.value = "";
    }
  });

  closeBtn.addEventListener("click", closeFeedbackModal);

  function closeFeedbackModal() {
    if (modalFeedback.classList.contains("active")) {
      modalFeedback.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  modalFeedback.addEventListener("click", (e) => {
    if (
      e.target === modalFeedback ||
      (e.target === modalFeedbackWrapper &&
        greetingFeedbackWindow.classList.contains("active"))
    ) {
      closeFeedbackModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      (e.code === "Escape" && modalFeedback.classList.contains("active")) ||
      (e.code === "Escape" &&
        greetingFeedbackWindow.classList.contains("active"))
    ) {
      closeFeedbackModal();
    }
  });

  function submitFeedbackForm() {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalFeedbackContent.style.visibility = "hidden";
      modalFeedbackContent.style.opacity = 0;
      greetingFeedbackWindow.classList.add("active");
    });
  }

  submitFeedbackForm();

  closeBtnFeedbackGreeting.addEventListener("click", closeFeedbackModal);

  ////////////////////openAddressWindow

  const openContactBtn = document.querySelector(".contact__address-open");
  openContactBtn.addEventListener("click", openContactWindow);

  function openContactWindow() {
    const contactWindow = document.querySelector(".contact__address");
    contactWindow.classList.toggle("open");
    if (openContactBtn.textContent === "Открыть адрес") {
      openContactBtn.textContent = "Закрыть адрес";
    } else if (openContactBtn.textContent === "Закрыть адрес") {
      openContactBtn.textContent = "Открыть адрес";
    }
  }

  //////////////////////modal order

  const modalOrder = document.querySelector(".modal_order");
  const modalWrapperOrder = modalOrder.querySelector(".modal__wrapper");
  const openOrderWindowBtn = document.querySelectorAll("[data-order='order']");
  const closeOrderWindow = modalOrder.querySelector(".modal__close");
  const modalOrderContent = modalOrder.querySelector(".modal__content");
  const orderForm = modalOrder.querySelector(".modal__form");
  const greetingOrderWindow = modalOrder.querySelector(".greeting");
  const closeBtnOrderGreeting = modalOrder.querySelector(".greeting__close");

  function openOrderModal() {
    modalOrder.classList.add("active");
    document.body.style.overflow = "hidden";
    modalOrderContent.style.visibility = "visible";
    modalOrderContent.style.opacity = 1;
    greetingOrderWindow.classList.remove("active");
    orderForm.elements.name.value = "";
    orderForm.elements.email.value = "";
    orderForm.elements.phone.value = "";
  }

  function closeOrderModal() {
    modalOrder.classList.remove("active");
    document.body.style.overflow = "";
  }

  openOrderWindowBtn.forEach((btn) => {
    btn.addEventListener("click", openOrderModal);
  });

  closeOrderWindow.addEventListener("click", closeOrderModal);

  modalOrder.addEventListener("click", (e) => {
    if (
      e.target === modalOrder ||
      (e.target === modalWrapperOrder &&
        greetingOrderWindow.classList.contains("active"))
    ) {
      closeOrderModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (
      (e.code === "Escape" && modalOrder.classList.contains("active")) ||
      (e.code === "Escape" && greetingOrderWindow.classList.contains("active"))
    ) {
      closeOrderModal();
    }
  });

  function submitOrderForm() {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modalOrderContent.style.visibility = "hidden";
      modalOrderContent.style.opacity = 0;
      greetingOrderWindow.classList.add("active");
    });
  }

  submitOrderForm();

  closeBtnOrderGreeting.addEventListener("click", () => {
    closeOrderModal();
  });
  //////////////////////////////////modal Submit
  const modalSubmit = document.querySelector(".modal_submit");
  const openModalSubmitBtn = document.querySelector('[data-submit="submit"]');
  const closeModalSubmitBtn = modalSubmit.querySelector(".modal__close");
  const modalSubmitWrapper = modalSubmit.querySelector(".modal__wrapper");
  const contactForm = document.querySelector(".contact__form");

  function openSubmitModal() {
    if (
      contactForm.name.value.length > 0 &&
      contactForm.email.value.length > 0 &&
      contactForm.phone.value.length > 0
    ) {
      modalSubmit.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      alert("Заполните пожалуйста форму");
    }
  }

  function closeSubmitModal() {
    modalSubmit.classList.remove("active");
    document.body.style.overflow = "";
    contactForm.elements.name.value = "";
    contactForm.elements.email.value = "";
    contactForm.elements.phone.value = "";
  }

  openModalSubmitBtn.addEventListener("click", openSubmitModal);

  closeModalSubmitBtn.addEventListener("click", closeSubmitModal);

  modalSubmit.addEventListener("click", (e) => {
    if (
      e.target === modalSubmit ||
      (e.target === modalSubmitWrapper &&
        modalSubmit.classList.contains("active"))
    ) {
      closeSubmitModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modalSubmit.classList.contains("active")) {
      closeSubmitModal();
    }
  });
});
