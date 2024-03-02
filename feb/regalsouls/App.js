import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Booking from "./component/booking";
import Contacts from "./component/contacts";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regal Souls</Text>
      <Text style={styles.text}>
        Welcome to Regal Souls, where everyone deserves to live their life with purpose and clarity. The mission is to provide you with the guidance to navigate life's challenges.
      </Text>
      <Text style={styles.text}>
        Our resident tarot reader, Majeestic Gi, is highly skilled in the art of tarot and has helped countless individuals gain a deeper understanding of their life's path.
      </Text>
      <Text style={styles.text}>
        With Regal Souls, you can book a reading and trust that you will receive the most accurate and insightful guidance available. Simply submit your request, and we will be in touch with you promptly to schedule your session with Majeestic Gi.
      </Text>
      <Text style={styles.text}>
        Thank you
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Booking" component={Booking} />
        <Tab.Screen name="Contacts" component={Contacts} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#D4AF37',
  },
  text: {
    color: 'white',
    marginBottom: 10,
    padding:10 
  },
});
