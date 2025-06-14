import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Welcome/Header';
import WhyPetitPas from '../components/Welcome/WhyPetitPas';
import Features from '../components/Welcome/Features';
import StartButton from '../components/Welcome/StartButton';


export default function WelcomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <WhyPetitPas />
      <Features />
      <StartButton />
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE4F2',
    paddingVertical: 30,
  },
});





