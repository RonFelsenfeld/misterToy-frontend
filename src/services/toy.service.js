import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getDefaultSort,
}

function query(filterBy = {}, sortBy = {}) {
  return storageService.query(STORAGE_KEY).then(toys => {
    let toysToReturn = toys.slice()

    if (filterBy.name) {
      const regExp = new RegExp(filterBy.name, 'i')
      toysToReturn = toysToReturn.filter(toy => regExp.test(toy.name))
    }

    if (filterBy.inStock !== null) {
      switch (filterBy.inStock) {
        case true:
          toysToReturn = toysToReturn.filter(toy => toy.inStock)
          break

        case false:
          toysToReturn = toysToReturn.filter(toy => !toy.inStock)
          break
      }
    }

    toysToReturn = _sortToys(toysToReturn, sortBy)

    return toysToReturn
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: 0,
    labels: [],
    inStock: true,
  }
}

function getDefaultFilter() {
  return { name: '', inStock: null }
}

function getDefaultSort() {
  return { name: 1 }
}

////////////////////////////////////////////////////

function _createToy(name = '') {
  const toy = getEmptyToy()
  const labels = _getLabels()

  toy._id = utilService.makeId()
  toy.name = name
  toy.price = utilService.getRandomIntInclusive(20, 150)
  toy.createdAt = Date.now()
  toy.inStock = Math.random() > 0.3

  while (toy.labels.length < 3) {
    const rndLabel = labels[utilService.getRandomIntInclusive(0, labels.length - 1)]
    if (!toy.labels.includes(rndLabel)) toy.labels.push(rndLabel)
  }

  return toy
}

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = []
    toys.push(_createToy('Bobo'))
    toys.push(_createToy('Popo'))
    toys.push(_createToy('Lala'))
    toys.push(_createToy('Iron man'))
    toys.push(_createToy('Superman'))
    utilService.saveToStorage(STORAGE_KEY, toys)
  }
}

function _getLabels() {
  const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
  ]

  return labels
}

function _sortToys(toys, sortBy) {
  if (sortBy.name) {
    toys = toys.sort((t1, t2) => t1.name.localeCompare(t2.name) * sortBy.name)
  }

  if (sortBy.price) {
    toys = toys.sort((t1, t2) => (t1.price - t2.price) * sortBy.price)
  }

  if (sortBy.createdAt) {
    toys = toys.sort((t1, t2) => (t1.createdAt - t2.createdAt) * sortBy.createdAt)
  }

  return toys
}
