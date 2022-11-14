import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  TextInput, Text, View, 
  FlatList, KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getFBAuth, saveAndDispatch } from '../data/DB';
import { addChatMessage } from '../data/Actions';

function ChatScreen({navigation, route}) {

  // const currentUser = {
  //   displayName: 'Alice',
  //   uid: '1234'
  // };

  // const otherUser = {
  //   displayName: 'Bob',
  //   uid: '2345'
  // };

  // const initMessages = [
  //   {
  //     author: '1234',
  //     recipient: '2345',
  //     text: 'Hello!',
  //     id: 'ABC'
  //   },
  //   {
  //     author: '2345',
  //     recipient: '1234',
  //     text: 'Oh hello there!',
  //     id: 'DEF'
  //   },
  // ];

  const [inputText, setInputText] = useState('');

  const currentUser = useSelector(state => {
    const currUserId = getFBAuth().currentUser.uid;
    return state.users.find(u => u.uid === currUserId);
  });  
  const otherUser = useSelector(state => {
    const participants = state.activeChat.participants;
    const currUserId = getFBAuth().currentUser.uid;
    const otherUserId = participants.find(id => id !== currUserId); // find the other one
    return state.users.find(u => u.uid === otherUserId);
  });
  const messages = useSelector(state => state.activeChat.messages);

  const sendMessage = (author, recipient, text) => {
    saveAndDispatch(addChatMessage(author.uid, recipient.uid, text));
    setInputText('');
  };

  let flatListRef = undefined;

  return (
    <KeyboardAvoidingView 
      style={chatStyles.container}
      behavior={"height"}
      keyboardVerticalOffset={100}>
        <View style={chatStyles.header}>
        <Ionicons 
            name='arrow-back-outline' 
            size={36}
            color='black'
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={chatStyles.headerText}>
            Chat with {otherUser?.displayName}
          </Text>
        </View>
      <View style={chatStyles.messageListContainer}>
        <FlatList
          data={messages}
          ref={(ref) => {flatListRef = ref}}
          onContentSizeChange={() => {
            if (flatListRef) {
              flatListRef.scrollToEnd();
            }
          }}
          renderItem={({item})=>{
            return (
              <View style={item.author === currentUser.uid ? 
                chatStyles.chatTextSelfContainer :
                chatStyles.chatTextOtherContainer
              }>
                <Text style={item.author === currentUser.uid ? 
                  chatStyles.chatTextSelf :
                  chatStyles.chatTextOther
                }>{item.message}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={chatStyles.inputContainer}>
        <View style={chatStyles.inputRow}>
          <TextInput 
            style={chatStyles.inputBox}
            value={inputText}
            returnKeyType={'send'}
            onChangeText={(text) => {
              setInputText(text)
            }}
            onSubmitEditing={() => {
              sendMessage(currentUser, otherUser, inputText);
            }}
          />
          <Ionicons 
            name='md-send' 
            size={36}
            color='lightblue'
            onPress={() => {
              sendMessage(currentUser, otherUser, inputText);
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    paddingBottom: '5%',
  },
  headerText: {
    fontSize: 32,
    paddingLeft: '5%'    
  },
    messageListContainer: {
      flex: 0.9,
      justifyContent: 'flex-end',
      alignItems: 'stretch',
      width: '100%',
      alignSelf: 'center',
      paddingTop: '3%',
    },
      chatTextSelfContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5, 
        marginRight: 20,
        marginLeft: 40,
        backgroundColor: 'lightblue',
        borderRadius: 6
      },
        chatTextSelf: {
          fontSize: 18,
          textAlign: 'right',
        },
      chatTextOtherContainer: {
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5, 
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: 'lightgray',
        borderRadius: 6
      },
        chatTextOther: {
          fontSize: 18,
          textAlign: 'left',
        },
    inputContainer: {
      flex: 0.1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    },
      inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },  
      inputBox: {
        flex: 0.8,
        borderWidth: 1,
        borderColor: 'rgb(2, 2, 2)',
        borderRadius: 6,
        alignSelf: 'center',
        fontSize: 18,
        height: 40,
        padding: 5,
        margin: 5
      }
});

export default ChatScreen;