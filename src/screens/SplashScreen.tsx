import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SplashScreen() {
  const navigation = useNavigation();


  useEffect(() => {
    const timer = setTimeout(() => {

     // navigation.navigate('Welcome');
    }, 3000); // 3 secondes
    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://lien-de-ton-logo-ici' }}
        style={styles.logo}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});


