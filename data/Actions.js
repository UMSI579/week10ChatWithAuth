
const actionTypes = {
  LOAD_USERS: 'LOAD_USERS',
  CREATE_USER: 'CREATE_USER',
  LOAD_ACTIVE_CHAT: 'LOAD_ACTIVE_CHAT',
  ADD_CHAT_MESSAGE: 'ADD_CHAT_MESSAGE'
}

const loadUsers = (users) => {
  return {
    type: actionTypes.LOAD_USERS,
    payload: {
      users: users
    }
  }
}

const createUser = (user) => {
  return {
    type: actionTypes.CREATE_USER,
    payload: {
      user: user
    }
  }
}

const loadActiveChat = (user1Id, user2Id, messages) => {
  return {
    type: actionTypes.LOAD_ACTIVE_CHAT,
    payload: {
      participants: [user1Id, user2Id],
      messages: messages
    }
  }
}

const addChatMessage = (authorId, recipientId, message) => {
  return {
    type: actionTypes.ADD_CHAT_MESSAGE,
    payload: {
      author: authorId,
      recipient: recipientId,
      message: message
    }
  }
}

export { 
  actionTypes, 
  loadUsers, 
  createUser,
  loadActiveChat,
  addChatMessage
};