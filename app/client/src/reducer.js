
let initialState = {
  user: !!localStorage.getItem("user") || {},
  hasError: null,
  isLoggedIn: localStorage.getItem("user") || null
}

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGIN_SUCCESS': 
    localStorage.setItem("user", JSON.stringify(action.payload))
      return {
        ...state,
        isLoggedIn: true,
        hasError: false,
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