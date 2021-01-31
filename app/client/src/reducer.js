
let initialState = {
  user: {},
  hasError: null,
  isLogedIn: null
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGIN_SUCCESS': 
      return {
        ...state,
        hasError: false,
        isLogedIn: true,
      }
    case 'LOGIN_FAILUR':
      return {
        ...state,
        user: {},
        hasError: true
      }
    default:
       return state;
  }
}
export default reducer;