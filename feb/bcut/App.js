import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Image} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
import logo from "./images/cutTrap.png"
import Form from "./components/form"
// import {Link} from "@react-navigation/native";
// this is so it easy to navigare through 


const tab = createBottomTabNavigator()

function App() {

  return (
    <NavigationContainer>
      <tab.Navigator initialRouteName ="Home">
        <tab.Screen name="Home" component = {Home}/>
        <tab.Screen name="Success" component = {Success}/>
        <tab.Screen name = "Cancel" component= {Cancel}/>
    
      </tab.Navigator>
      <StatusBar style='auto'/>

    </NavigationContainer>
  ) 
}

function Home({navigation}){
    return(
  
        <Form/>
      
    )
}

function Success({navigation}){
  return(
    <View>
      <Image source={logo} style={styles.logo}/>
      <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
          <Text>
            Home
          </Text>
      </TouchableOpacity>

    </View>
  )
}

function Cancel({navigation}){
  return(
    <View>
      <Image source={logo} style={styles.logo}/>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <Text>
        You canceled
      </Text>
    </View>
  )


}



const styles = StyleSheet.create({
  container: {
    width: '80%',
    margin: '0 auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '2%',
    fontSize: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});


export default App;
