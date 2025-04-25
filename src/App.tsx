import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { database, ref, get } from './firebase';

const App = () => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMessage = async () => {
      const messageRef = ref(database, 'messages/message');
      const snapshot = await get(messageRef);
      if (snapshot.exists()) {
        setMessage(snapshot.val());
      } else {
        setMessage("No message found");
      }
    };
    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default App;
