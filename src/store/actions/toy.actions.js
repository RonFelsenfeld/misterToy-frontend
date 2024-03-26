import { toyService } from '../../services/toy.service.js'
import {
  ADD_TOY,
  REMOVE_TOY,
  SET_IS_LOADING,
  SET_TOYS,
  UPDATE_TOY,
} from '../reducers/toy.reducer.js'
import { store } from '../store.js'

export function loadToys() {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })

  return toyService
    .query()
    .then(toys => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch(err => {
      console.log('Toy action -> Cannot load toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch(err => {
      console.log('Toy action -> Cannot remove toy', err)
      throw err
    })
}

export function saveToy(toy) {
  const type = toy.id ? UPDATE_TOY : ADD_TOY

  return toyService
    .save(toy)
    .then(savedToy => {
      store.dispatch({ type, toy: savedToy })
      return saveToy
    })
    .catch(err => {
      console.log('Toy action -> Cannot save toy', err)
      throw err
    })
}