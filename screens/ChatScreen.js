import { Button, Input, Icon } from '@rneui/themed';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';


function ChatScreen({navigation, route}) {

  const currentUser = "Bob";
  const otherUser = "Alice";

  const dummyChat = [
    {
      author: "Alice",
      message: "Hello, Bob",
      timestamp: Date.now()
    },
    {
      author: "Bob",
      message: "Why hi there, Alice",
      timestamp: Date.now() + 1
    }
  ];

  const [messages, setMessages] = useState(dummyChat);
  const [inputText, setInputText] = useState('');
  let scrollView;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior='position'>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat with {otherUser} </Text>
      </View>
      <View style={styles.body}>
        <ScrollView
          ref={ref=>scrollView = ref}
          contentContainerStyle={styles.scrollContainer}
        >
          {messages.map(msg => {
            return (
              <View 
                key={msg.timestamp}
                style={[styles.messageBubble, 
                  msg.author === currentUser ?
                  styles.self :
                  styles.other 
                ]}>
                <Text style={styles.messageText}>{msg.message}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Input
          containerStyle={styles.inputBox}
          placeholder="Enter chat message"
          value={inputText}
          onChangeText={text=>setInputText(text)}
        />
        <Button
          buttonStyle={styles.sendButton}
          onPress={()=>{
            setMessages(messages.concat({
              author: currentUser,
              message: inputText,
              timestamp: Date.now()
            }));
            setInputText('');
            scrollView.scrollToEnd()
          }}
        >
          <Icon 
            name="send"
            size={32}
            color="purple"  
          />
        </Button>
      </View>
    </KeyboardAvoidingView>
  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end', 
    alignItems: 'center',
    padding: '3%'
  },
  headerText: {
    fontSize: 32
  },
  body: {
    flex: 0.8,
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'stretch',
    padding: '3%'
  },
  scrollContainer: {
    flex: 1.0, 
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'stretch',
    padding: '3%'
  },
  messageBubble: {
    borderRadius: 6,
    padding: '2%'
  },
  messageText: {
    fontSize: 18
  },
  self: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightgreen'
  },
  other: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray'
  },
  footer: {
    flex: 0.1, 
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    padding: '3%'
  },
  inputBox: {
    width: '80%'
  },
  sendButton: {
    backgroundColor: 'white',
  }
});

export default ChatScreen;
