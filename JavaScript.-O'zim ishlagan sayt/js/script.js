document.addEventListener('DOMContentLoaded', () => {
  // Loader start
  const loader = document.querySelector('.loader');
  setTimeout(function () {
    loader.style.opacity = '0'
    setTimeout(function () {
      loader.style.display = 'none'
    }, 1000)
  }, 1500)
  // Loader end

  // tabHeader start
  const tabContent = document.querySelectorAll('.tabcontent'),
    headerParents = document.querySelector('.tabheader__items'),
    tabs = document.querySelectorAll('.tabheader__item');

  function hiedTabContent() {
    tabContent.forEach(item => {
      item.style.display = 'none';
    })
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active')
    })
  }

  function tabView(i = 0) {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active')
  }
  hiedTabContent()
  tabView()

  headerParents.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (e.target == item) {
          hiedTabContent()
          tabView(i)
        }
      })
    }
  })
  // tabHeader end

  // Modal start 
  const modal = document.querySelector('.modal'),
    btnOpensModal = document.querySelectorAll('[data-opensModal]'),
    btnCloseModal = document.querySelector('[data-closeModal]');

  function modalOpening() {
    modal.classList.add('show');
    modal.classList.remove('hied');
    document.body.style.overflow = 'hidden'
  }

  function modalCloses() {
    modal.classList.add('hied');
    modal.classList.remove('show');
    document.body.style.overflow = ''
  }

  btnOpensModal.forEach((item) => {
    item.addEventListener('click', () => {
      modalOpening();
      clearInterval(modalTimer)
    })
  })

  btnCloseModal.addEventListener('click', () => {
    modalCloses();
  })

  modal.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('modal')) {
      modalCloses()
    }
  })

  const modalTimer = setTimeout(modalOpening, 5000);

  function showMyModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modalOpening()
      window.removeEventListener('scroll', showMyModalByScroll)
    }
  }
  window.addEventListener('scroll', showMyModalByScroll)

  // Modal end

  // class 

  class CarCard {
    constructor(src, alt, title, descr, price, parentSelectr, ...classess) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.parent = document.querySelector(parentSelectr)
      this.classess = classess
      this.tansfer = 10800
      this.changeToUSD()
    };
    changeToUSD() {
      this.price = this.price * this.tansfer;
    }

    render() {
      const element = document.createElement('div');

      element.innerHTML = `
      <div class="menu__item">
        <img src=${this.src} alt=${this.alt} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> $</div>
        </div>
      </div>
      `
      this.parent.append(element);
    }

  }

  new CarCard(
    'img/tabs/1.jpg',
    'Car',
    '2021 Mercedes-Benz C-Class',
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    550,
    '.menu .container',
    'red'
  ).render();
  new CarCard(
    'img/tabs/2.jpg',
    'Car',
    '2021 Mercedes-Benz C-Class',
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    2030,
    '.menu .container',

  ).render();
  new CarCard(
    'img/tabs/3.jpg',
    'Car',
    '2021 Mercedes-Benz C-Class',
    ` The 2021 Mercedes-Benz C-Class finishes in the top half of our
      luxury small car rankings. It's powerful and upscale, but it has
      so-so handli...`,
    500,
    '.menu .container',

  ).render();
  // date vaqt 

  const deadline = '2022-05-01';

  function getTime(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(total / (1000 * 60 * 60 * 24)),
      hours = Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((total / 1000 / 60) % 60)
    seconds = Math.floor((total / 1000) % 60)
    return {
      total: total,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock()

    function updateClock() {
      const time = getTime(endtime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total <= 0) {
        clearInterval(timeInterval)
      }
    }
  }
  setClock(".timer", deadline);

  // slider
  // corousel

  const slides = document.querySelectorAll('.offer__slide'),
    slider = document.querySelector('.offer__slider'),
    next = document.querySelector('.offer__slider-next'),
    prev = document.querySelector('.offer__slider-prev'),
    current = document.querySelector('#current'),
    total = document.querySelector('#total'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');

  let slideIndex = 1,
    offset = 0;

  showCurrent(slideIndex)
  showTotal(slides.length)

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = "0.5s all";
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  })

  slider.style.position = 'relative';
  const indicator = document.createElement('ol'),
    dots = [];
  indicator.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `
  slider.append(indicator);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li')
    dot.setAttribute('data-slide-to', i + 1)
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin: 0 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: 0.5;
      transform: opacity 0.6s ease;
    `
    if (i == 0) {
      dot.style.opacity = 1
    }
    indicator.append(dot)
    dots.push(dot)
  }

  next.addEventListener('click', () => {

    if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    nextCurrentSlide()
    dotActive()
  });

  prev.addEventListener('click', () => {

    if (offset == 0) {

      offset = (+width.slice(0, width.length - 2) * (slides.length - 1))
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    prevCurrentSlide()
    dotActive()
  })
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to')

      slideIndex = slideTo
      offset = +width.slice(0, width.length - 2) * (slideTo - 1)
      slidesField.style.transform = `translateX(-${offset}px)`

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`
      } else {
        current.textContent = slideIndex
      }
      dotActive()
    })
  })
  function dotActive() {
    dots.forEach(dot => dot.style.opacity = '0.5')
    dots[slideIndex - 1].style.opacity = 1;
  }

  function nextCurrentSlide() {
    if (slideIndex == slides.length) {
      slideIndex = 1
    } else {
      slideIndex++
    }
    showCurrent(slideIndex)
  }

  function prevCurrentSlide() {
    if (slideIndex == 1) {
      slideIndex = slides.length
    } else {
      slideIndex--
    }
    showCurrent(slideIndex)
  }

  function showCurrent(index) {
    if (index > 0 && index < 10) {
      current.textContent = `0${index}`;
    } else {
      current.textContent = index;
    }
  }
  function showTotal(index) {
    if (index > 0 && index < 10) {
      total.textContent = `0${index}`;
    } else {
      total.textContent = index;
    }
  }
  //  accordion 

  const accordion = document.querySelectorAll('.accordion');

  accordion.forEach(acc => {
    acc.addEventListener('click', () => {
      acc.classList.toggle('active');
      const panel = acc.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px'
      }
    })
  })


  // AJAX 
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Murojatingiz qabul qilindi',
    failure: 'Error'
  }

  forms.forEach(item => {
    postData(item)
  })


  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
    display: block;
    margin: 0 auto;
    `
      form.insertAdjacentElement('afterend', statusMessage);

      const request = new XMLHttpRequest()
      request.open('POST', 'server.php')
      request.setRequestHeader('Content-type', 'application/json')
      const formData = new FormData(form)

      const object = {}
      formData.forEach(function (value, key) {
        object[key] = value
      })

      const json = JSON.stringify(object)

      request.send(json)

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success)
          form.reset()
          statusMessage.remove()

        } else {
          showThanksModal(message.failure)
        }
      })
    })
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog')

    prevModalDialog.classList.add('hide')
    modalOpening()
    const thanksModal = document.createElement('div')
    thanksModal.classList.add('modal__dialog')
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `

    document.querySelector('.modal').append(thanksModal)
    setTimeout(() => {
      thanksModal.remove()
      prevModalDialog.classList.add('show')
      prevModalDialog.classList.remove('hide')
      modalCloses()
    }, 4000)
  }







})