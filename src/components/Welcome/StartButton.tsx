import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function StartButton() {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auth')}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { margin: 20 },
  button: { backgroundColor: '#D16BA5', paddingVertical: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});

