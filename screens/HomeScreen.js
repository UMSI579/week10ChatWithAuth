import { Button } from '@rneui/themed';
import { View, Text, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { subscribeToUserUpdates, addOrSelectChat, unsubscribeFromUsers } from '../data/Actions';
import { getAuthUser, signOut } from '../AuthManager';

function HomeScreen({navigation}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeToUserUpdates());
  }, []);

  const users = useSelector(state => state.users);
  const currentAuthUser = getAuthUser();

  return (
    <View style={styles.container}>
      <Text>
        You're signed in, { currentAuthUser?.displayName }!
      </Text>
      <Text>
        Here are your friends!
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={users}
          renderItem={({item}) => {
            if (item.key === currentAuthUser?.uid) {
              return (<View/>)
            } else {
              return (
                <TouchableOpacity
                  onPress={()=>{
                    dispatch(addOrSelectChat(currentAuthUser.uid, item.key)); // race condition?
                    navigation.navigate('Chat', {
                      currentUserId: currentAuthUser.uid, 
                      otherUserId: item.key
                    })
                  }}
                >
                  <Text>{item.displayName}</Text>
                </TouchableOpacity>
              )
            }
          }}
        />
      </View>
      <Button
        onPress={async () => {
          try {
            unsubscribeFromUsers();
            await signOut();
          } catch (error) {
            Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
          }
        }}
      >
        Now sign out!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  listContainer: {
    flex: 0.5,
    witdh: '100%',

  }
});

export default HomeScreen;