import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { database, ref, get } from 'src/firebase'; // Firebase設定をインポート

export default function TabOneScreen() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const messageRef = ref(database, 'messages/message');
        const snapshot = await get(messageRef);
        if (snapshot.exists()) {
          setMessage(snapshot.val());
        } else {
          setMessage('No message found');
        }
      } catch (error) {
        setMessage('Error fetching message');
        console.error(error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
