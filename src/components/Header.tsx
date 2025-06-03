import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../styles/global';


const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Petit Pas 🐾</Text>
      <Text style={styles.subtitle}>Chaque jour, une petite victoire ✨</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    color: COLORS.grey,
    marginTop: SIZES.base,
    fontFamily: FONTS.regular,
  },
});


export default Header;


