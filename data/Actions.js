

import { initializeApp, getApps } from 'firebase/app';
import { setDoc, addDoc, doc, getFirestore, getDocs, 
  collection, onSnapshot, query, where } from 'firebase/firestore';

import { firebaseConfig } from '../Secrets';
import { ADD_USER, LOAD_USERS, SET_CURRENT_CHAT } from './Reducer';

let app;

const apps = getApps();
if (apps.length == 0) { 
  app = initializeApp(firebaseConfig);
} else {
  app = apps[0];
}

const db = getFirestore(app);

let usersSnapshotUnsub = undefined;
let chatSnapshotUnsub = undefined;

const subscribeToUserUpdates = () => {
  unsubscribeFromUsers();
  return (dispatch) => {
    usersSnapshotUnsub = onSnapshot(collection(db, 'users'), usersSnapshot => {
      const updatedUsers = usersSnapshot.docs.map(uSnap => {
        return uSnap.data(); // already has key?
      });
      dispatch({
        type: LOAD_USERS,
        payload: {
          users: updatedUsers
        }
      });
    });
  }
}

const addUser = (user) => {
  return async (dispatch) => {
    userToAdd = {
      displayName: user.displayName,
      email: user.email,
      key: user.uid
    };
    await setDoc(doc(db, 'users', user.uid), userToAdd);
  }
}

const addOrSelectChat = (user1id, user2id) => {
  return async (dispatch) => {
    const chatQuery = query(collection(db, 'chats'),
      where('participants', 'array-contains', user1id),
    );
    const results = await getDocs(chatQuery);

    chatSnap = results.docs?.find(elem=>elem.data().participants.includes(user2id));
    let theChat;
    if (!chatSnap) {
      theChat = {
        participants: [user1id, user2id],
      }
      const chatRef = await addDoc(collection(db, 'chats'), theChat);
      theChat.id = chatRef.id
    } else {
      theChat = {
        ...chatSnap.data(),
        id: chatSnap.id
      }
    }
  
    dispatch({
      type: SET_CURRENT_CHAT,
      payload: {
        currentChat: theChat
      }
    }); // initial dispatch

    unsubscribeFromChat();

    chatSnapshotUnsub = onSnapshot(
      collection(db, 'chats', theChat.id, 'messages'), 
      (messagesSnapshot) => {
        const messages = messagesSnapshot.docs.map(msgSnap => {
          const message = msgSnap.data();
          return {
            ...message,
            timestamp: message.timestamp.seconds,
            id: msgSnap.id
          }
        });
        dispatch({
          type: SET_CURRENT_CHAT,
          payload: {
            currentChat: {
              ...theChat,
              messages: messages
            }
          }
        })
      }
    );
  }
}

const addCurrentChatMessage = (message) => {
  return async (dispatch, getState) => {
    const currentChat = getState().currentChat;
    const messageCollection = collection(db, 'chats', currentChat.id, 'messages');
    await addDoc(messageCollection, message); // no need to dispatch
  }
}

const unsubscribeFromUsers = () => {
  if (usersSnapshotUnsub) {
    usersSnapshotUnsub();
    usersSnapshotUnsub = undefined;
  }
}

const unsubscribeFromChat = () => {
  if (chatSnapshotUnsub) {
    chatSnapshotUnsub();
    chatSnapshotUnsub = undefined;
  }
}

export { 
  addUser, 
  subscribeToUserUpdates, 
  addOrSelectChat, 
  addCurrentChatMessage,
  unsubscribeFromChat,
  unsubscribeFromUsers
}