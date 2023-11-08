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

  return (
    <View style={styles.container} >
      {/*           
        KeyboardAvoidingView does what it sounds like it would.
        You may need to read the docs and play around with it
        to get it to work as you expect. This works OK on my iPhone.
      */}
      <KeyboardAvoidingView 
        behavior='position'>
        <View style={styles.header}>
          <Text style={styles.headerText}>Chat with {otherUser} </Text>
        </View>
        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
          >
          {/*           
            Here is an alternative to a FlatList for rendering a list
            in a scrolling view. If you have more than one list you need
            to render and you want them to be part of the same scroll view
            you'll need to use this approach. If you just have one list
            you can choose which you prefer.
          */}
            {messages.map(msg => {
              /*           
                Note the use of conditional styling and alignSelf to render
                different messages on different sides of the screen. Also note 
                that if you're rendering a list of components each one needs to 
                have a "key", just like a FlatList.
              */
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
          {/*           
            When the user clicks "send" the message is added to the list
          */}
          <Button
            buttonStyle={styles.sendButton}
            onPress={()=>{
              setMessages(messages.concat({
                author: currentUser,
                message: inputText,
                timestamp: Date.now()
              }));
              setInputText('');
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
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
    padding: '3%',
    //backgroundColor: 'tan'
  },
  scrollContainer: {
    flex: 1.0, 
    width: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'stretch',
    padding: '3%',
    //backgroundColor: 'pink'
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
