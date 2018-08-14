import * as types from '../actions/actionTypes';

export default function userReducer(state = null, action) {
  // state variable here reps just an array of courses
  switch(action.type) {
    case types.LOGIN_USER_SUCCESS:
     return Object.assign({}, state, action.user)
    case types.LOGOUT_USER_SUCCESS: {
        return Object.assign({}, state, null)
    }
    case types.UPDATE_USER_SCORE: {
        return Object.assign({}, state, action.user)
    }
    default: 
      return state;
  }
}