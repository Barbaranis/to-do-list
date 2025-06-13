import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, StyleSheet } from 'react-native';


import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfilScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import AuthStackNavigator from './AuthStackNavigator';


const Drawer = createDrawerNavigator();


function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
          style={styles.logo}
        />
        <Text style={styles.title}>PetitPas</Text>
        <Text style={styles.subtitle}>Organise ta journée ✨</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Welcome"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: '#D16BA5',
          drawerLabelStyle: { fontSize: 16, marginLeft: -10 },
          drawerStyle: { backgroundColor: '#FFE4F2', width: 260 },
        }}
      >
        <Drawer.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            title: 'Accueil',
            drawerIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Auth"
          component={AuthStackNavigator}
          options={{
            title: 'Connexion',
            drawerIcon: ({ color, size }) => (
              <Icon name="login" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'Mon Profil',
            drawerIcon: ({ color, size }) => (
              <Icon name="account-circle-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{
            title: 'À propos',
            drawerIcon: ({ color, size }) => (
              <Icon name="information-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={ContactScreen}
          options={{
            title: 'Contact',
            drawerIcon: ({ color, size }) => (
              <Icon name="email-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFE4F2',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D16BA5',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
});


