import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Booking from "./component/booking";
import Contacts from "./component/contacts";
import pic from "./images/regalSouls.jpeg";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={pic} style={styles.logo} />
        <Text style={styles.title}>Regal Souls</Text>
      </View>
      <Text style={styles.text}>
        Welcome to Regal Souls, where purpose meets clarity. Our skilled tarot reader, Majeestic Gi, offers insightful guidance.
        {'\n\n'}
        <Text>
          Book a session:
          {'\n'}
          <Text style={styles.woop}>
            • 30 mins: $40 {'\n'}
            • 1 hour: $80 {'\n'}
            • 1.5 hours: $120
          </Text>
        </Text>
        {'\n\n'}
        Submit your request, and we'll promptly schedule your session. Thank you for choosing Regal Souls!
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    margin: 10,
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
    padding: 10,
  },
  woop: {
    flexDirection: "row",
  },
});
