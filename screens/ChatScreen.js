import { Button, Input, Icon } from '@rneui/themed';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


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


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Chat with {otherUser} </Text>
      </View>
      <View style={styles.body}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >
          {dummyChat.map(msg => {
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
        />
        <Button
          buttonStyle={styles.sendButton}
        >
          <Icon 
            name="send"
            size={32}
            color="purple"  
          />
        </Button>
      </View>

    </View>
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
    flex: 0.2,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  body: {
    flex: 0.6,
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
    flex: 0.2, 
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
