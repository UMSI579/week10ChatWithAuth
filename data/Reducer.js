
import { actionTypes } from "./Actions"

const _loadUsers = (state, action) => {
  const {users} = action.payload;
  for (u of users) {
    console.log('loading user', u);
  }
  return {
    ...state,
    users: users
  }
}

const _loadActiveChat = (state, action) => {
  const { participants, messages } = action.payload;
  const newActiveChat = {
    participants: participants,
    messages: messages
  };
  console.log('in _loadActiveChat, loading:', newActiveChat);
  return {
    ...state,
    activeChat: newActiveChat
  }
}


// mainly here to document the store's data structure
const initialState = {
  users: [],
  activeChat: {
    participants: [],
    messages: [] // note that in Firebase these will be stored in a colletion, not array
  }
}

function rootReducer(state=initialState, action) {
  console.log('in rootReducer, action:', action);
  switch (action.type) {
    case actionTypes.LOAD_USERS:
      return _loadUsers(state, action);
    case actionTypes.LOAD_ACTIVE_CHAT:
      return _loadActiveChat(state, action);
    default:
      return state;
  }
}

export { rootReducer };