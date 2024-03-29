import { userService } from '../../services/user.service'

export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
}

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        loggedInUser: action.user,
      }

    default:
      return state
  }
}
