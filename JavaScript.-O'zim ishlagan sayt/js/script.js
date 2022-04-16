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


  





























})