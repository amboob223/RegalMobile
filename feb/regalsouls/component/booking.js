import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import pic  from "../images/regalSouls.jpeg";

const BookingForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [target, setTarget] = useState('');
 

  const handleBooking = async() => {
    // Handle booking logic here
    try {

        const body ={ first:firstName,
                      last:lastName,
                      email:email,
                      phone:phone,
                      birthdate:birthdate,
                      target:target,
                    }

        const response = await fetch("http://172.18.28.238:3000/souls",{
            method:"POST",
            headers:{"Content-type":"Application/json"},
            body:JSON.stringify(body)
        })

    console.log('Booking details:', {
      firstName,
      lastName,
      email,
      phone,
      birthdate,
      target
    });

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setBirthdate('');
    setTarget('');
  
    } catch (error) {
        console.error(error)
    }
    // Show a success message or navigate to another screen
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
  <Image source={pic} style={{ width: 50, height: 50, marginRight: 10 }} />
      <Text style={styles.heading}>Make a Booking</Text>
</View>
<View>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Birthdate"
        value={birthdate}
        onChangeText={(text) => setBirthdate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Target"
        value={target}
        onChangeText={(text) => setTarget(text)}
      />

</View>
      
  

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book My Reading</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color:"#D4AF37" 
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:"white" 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BookingForm;


