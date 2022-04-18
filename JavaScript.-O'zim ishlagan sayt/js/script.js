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


})