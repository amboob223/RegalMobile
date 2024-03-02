import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Component
function Contacts() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feel free to talk anytime</Text>
      <Text style={styles.contactItem}>Email: Regalsoul4@gmail.com</Text>
      <Text style={styles.contactItem}>Instagram</Text>
      <Text style={styles.contactItem}>Twitter</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
   heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:"#D4AF37" 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
});

export default Contacts;
