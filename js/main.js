(function () {
  /*------------------
        Preloader
    --------------------*/
  window.addEventListener("load", function () {
    var loaders = document.querySelectorAll(".loader");
    loaders.forEach(function (loader) {
      fadeOut(loader, 400);
    });

    var preloder = document.getElementById("preloder");
    setTimeout(function () {
      fadeOut(preloder, 600);
    }, 200);
  });

  /*------------------
        Background Set
    --------------------*/
  function setBackgrounds() {
    document.querySelectorAll(".set-bg").forEach(function (element) {
      var bg;
      if (
        window.innerWidth <= 767 &&
        element.hasAttribute("data-setbg-mobile")
      ) {
        bg = element.getAttribute("data-setbg-mobile");
      } else {
        bg = element.getAttribute("data-setbg");
      }
      element.style.backgroundImage = "url(" + bg + ")";
    });
  }

  setBackgrounds();

  window.addEventListener("resize", function () {
    setBackgrounds();
  });

  /*------------------
      Controle do Menu Offcanvas
  --------------------*/
  var canvasOpen = document.querySelector(".canvas-open");
  var offcanvasMenu = document.querySelector(".offcanvas-menu-wrapper");
  var offcanvasOverlay = document.querySelector(".offcanvas-menu-overlay");
  var canvasClose = document.querySelector(".canvas-close");

  if (canvasOpen) {
    canvasOpen.addEventListener("click", function () {
      offcanvasMenu.classList.add("show-offcanvas-menu-wrapper");
      offcanvasOverlay.classList.add("active");
    });
  }

  if (canvasClose) {
    canvasClose.addEventListener("click", function () {
      offcanvasMenu.classList.remove("show-offcanvas-menu-wrapper");
      offcanvasOverlay.classList.remove("active");
    });
  }

  if (offcanvasOverlay) {
    offcanvasOverlay.addEventListener("click", function () {
      offcanvasMenu.classList.remove("show-offcanvas-menu-wrapper");
      offcanvasOverlay.classList.remove("active");
    });
  }

  /*------------------
        Rolagem Menu
    --------------------*/
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(".nav-menu .active").classList.remove("active");
      link.parentElement.classList.add("active");

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    });
  });

  /*------------------
        Formulário de Captura de Leads
    --------------------*/
  (function () {
    var leadForm = document.getElementById("lead-form");
    var mainContent = document.getElementById("main-content");
    var leadFormContainer = document.getElementById("lead-form-container");

    // Impedir a rolagem quando o formulário estiver visível
    document.body.classList.add("body-no-scroll");

    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Obter valores do formulário
      var name = leadForm.elements["name"].value.trim();
      var email = leadForm.elements["email"].value.trim();
      var phone = leadForm.elements["phone"].value.trim();

      // Validar campos
      var valid = true;
      var errorMessage = "";

      // Validar nome
      if (name === "") {
        valid = false;
        errorMessage += "Por favor, insira seu nome.\n";
      }

      // Validar e-mail
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        valid = false;
        errorMessage += "Por favor, insira um e-mail válido.\n";
      }

      // Validar telefone
      var phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
      if (!phoneRegex.test(phone)) {
        valid = false;
        errorMessage +=
          "Por favor, insira um telefone válido no formato (99) 99999-9999.\n";
      }

      if (!valid) {
        alert(errorMessage);
        return;
      }

      // Armazenar o nome do usuário
      localStorage.setItem("userName", name);

      // Ocultar o formulário e mostrar o conteúdo principal
      leadFormContainer.style.display = "none";
      mainContent.style.display = "block";

      // Permitir a rolagem novamente
      document.body.classList.remove("body-no-scroll");

      var welcomeElements = document.querySelectorAll(".welcome-name");
      welcomeElements.forEach(function (element) {
        element.textContent = name;
      });
    });

    // Aplicar máscara no campo de telefone
    var phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", function (event) {
      var input = phoneInput.value.replace(/\D/g, "").substring(0, 11);
      var areaCode = input.substring(0, 2);
      var firstPart = input.substring(2, 7);
      var secondPart = input.substring(7, 11);

      if (input.length > 7) {
        phoneInput.value = `(${areaCode}) ${firstPart}-${secondPart}`;
      } else if (input.length > 2) {
        phoneInput.value = `(${areaCode}) ${firstPart}`;
      } else if (input.length > 0) {
        phoneInput.value = `(${areaCode}`;
      }
    });
  })();

  /*------------------
        Swiper Hero Slider
    --------------------*/
  var heroSwiper = new Swiper(".hero-slider", {
    loop: true,
    speed: 1200,
    navigation: {
      nextEl: ".hero-slider .swiper-button-next",
      prevEl: ".hero-slider .swiper-button-prev",
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  /*------------------
        Swiper Feedback Slider
    --------------------*/
  var feedbackSwiper = new Swiper(".feedback-slider", {
    loop: true,
    speed: 1200,
    navigation: {
      nextEl: ".feedback-slider .swiper-button-next",
      prevEl: ".feedback-slider .swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  });

  /*------------------
        Countdown
    --------------------*/
  function updateCountdown() {
    const deadline = new Date("2024-11-09T14:00:00-03:00").getTime();
    const now = new Date().getTime();
    const t = deadline - now;

    if (t >= 0) {
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((t % (1000 * 60)) / 1000);

      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
    } else {
      document.getElementById("countdown").innerHTML = "Evento Iniciado!";
    }
  }

  setInterval(updateCountdown, 1000);

  /*------------------
        Função FadeOut
    --------------------*/
  function fadeOut(element, duration, callback) {
    element.style.opacity = 1;

    var startTime = performance.now();

    function fade() {
      var elapsed = performance.now() - startTime;
      var progress = elapsed / duration;
      if (progress < 1) {
        element.style.opacity = 1 - progress;
        requestAnimationFrame(fade);
      } else {
        element.style.opacity = 0;
        element.style.display = "none";
        if (typeof callback === "function") callback();
      }
    }

    fade();
  }
})();

/*------------------
    Modal de Imagens
--------------------*/
(function () {
  var modal = document.getElementById("modal");
  var modalImg = document.getElementById("modal-image");
  var links = document.querySelectorAll(".galeria .gs-item a");
  var currentIndex = 0;

  var closeBtn = document.querySelector(".modal .close");
  var nextBtn = document.querySelector(".modal .next");
  var prevBtn = document.querySelector(".modal .prev");

  links.forEach(function (link, index) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(index);
    });
  });

  function openModal(index) {
    currentIndex = index;
    modal.style.display = "block";
    var imgSrc = links[currentIndex].parentElement.getAttribute("data-setbg");
    modalImg.src = imgSrc;
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % links.length;
    updateModalImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + links.length) % links.length;
    updateModalImage();
  }

  function updateModalImage() {
    var imgSrc = links[currentIndex].parentElement.getAttribute("data-setbg");
    modalImg.src = imgSrc;
  }

  closeBtn.addEventListener("click", closeModal);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  modal.addEventListener("click", function (e) {
    if (e.target == modal) {
      closeModal();
    }
  });

  // Navegação por teclado
  document.addEventListener("keydown", function (e) {
    if (modal.style.display == "block") {
      if (e.key == "ArrowRight") {
        showNext();
      } else if (e.key == "ArrowLeft") {
        showPrev();
      } else if (e.key == "Escape") {
        closeModal();
      }
    }
  });
})();
