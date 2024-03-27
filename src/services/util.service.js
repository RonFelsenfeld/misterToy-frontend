export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  loadFromStorage,
  saveToStorage,
  animateCSS,
  debounce,
  getRandomColor,
}

function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

// In our utilService
function animateCSS(el, animation) {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`

    el.classList.add(`${prefix}animated`, animationName)

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation()
      el.classList.remove(`${prefix}animated`, animationName)
      resolve('Animation ended')
    }
    el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function getRandomColor() {
  const colors = [
    '#F0FFFF',
    '#FFE4E1',
    '#FFF8DC',
    '#F0FFF0',
    '#F5F5DC',
    '#FAF0E6',
    '#F0E68C',
    '#FFFAF0',
    '#FFFFF0',
    '#F0F8FF',
    '#F0E6EE',
    '#F5DEB3',
    '#FAEBD7',
    '#FFEFD5',
    '#FFDAB9',
    '#FDF5E6',
    '#FFD700',
    '#FFFACD',
    '#FFF5EE',
    '#FFE4B5',
    '#FFF0F5',
    '#FFE4C4',
    '#FFFAFA',
    '#FFEBCD',
    '#FFF5DC',
    '#FFE4E1',
    '#FFF8DC',
    '#F0FFF0',
    '#F5F5DC',
    '#FAF0E6',
  ]

  return colors[getRandomIntInclusive(0, colors.length - 1)]
}
