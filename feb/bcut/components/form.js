

import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity,View,Platform } from 'react-native';
import TimePickerAndroid from "@react-native-community/datetimepicker";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Button,Image, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


// import {Link} from "@react-navigation/native";
import {loadStripe} from "@stripe/stripe-js";
import pic from "../images/cutTrap.png";

const stripePromise = loadStripe("pk_test_51Oia2ME02fj2AjRf2JEN09ww7eJklTtuJFaZLQUXBRcLgCC8TRwy36OQg54s4BwYpxeYSAvLJv4daoX3vMIuzcrN00d4dfDJHm")//put stripe api
// this is so it easy to navigare through 
const tab = createBottomTabNavigator()



function Form(){


const [datePickerVisibility, setDatePickerVisibility] = useState(false);
  const [timePickerVisibility, setTimePickerVisibility] = useState({
    startTime: false,
    endTime: false,
  });

  const [formData,setFormData] = useState({
     name: "",
    date: null,
    start:new Date(),
    end: new Date(),
    email: "",
    phone: "",
    price: 0,
  });

  
  const [total,setTotal] = useState(0);
  const [confirmed,setConfirmed] = useState(false);
  const [date,setDate] = useState(new Date());
  const [show,setShow] = useState(false);
  const [mode,setMode] = useState('date');


const onChange = (e,selectedDate)=>{
    setDate(selectedDate)
    setShow(false)
  }

const showMode = (modeToShow) =>{
    setShow(true)
    setMode(modeToShow)
}
const openDatePicker = () => {
  setDatePickerVisibility(true);
};

const onDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setDatePickerVisibility(false);
    } else {
      setFormData({ ...formData, date: selectedDate });
      setDatePickerVisibility(false);
    }
  };
//to check dates
 useEffect(() => {
    console.log(formData.date);
  }, [formData.date]);


  const openStartTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: formData.start.getHours(),
        minute: formData.start.getMinutes(),
        is24Hour: true,
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        const selectedTime = new Date();
        selectedTime.setHours(hour);
        selectedTime.setMinutes(minute);
        setFormData({ ...formData, start: selectedTime });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };

  const openEndTimePicker = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: formData.end.getHours(),
        minute: formData.end.getMinutes(),
        is24Hour: true,
      });

      if (action !== TimePickerAndroid.dismissedAction) {
        const selectedTime = new Date();
        selectedTime.setHours(hour);
        selectedTime.setMinutes(minute);
        setFormData({ ...formData, end: selectedTime });
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  };
  const renderTimePicker = (label, openTimePicker, selectedTime) => {
    return (
      <View style={styles.formGroup}>
        <Text style={styles.label}>{label}:</Text>
        <TouchableOpacity onPress={openTimePicker}>
          <Text>{selectedTime ? selectedTime.toLocaleTimeString() : 'Select Time'}</Text>
        </TouchableOpacity>
        {Platform.OS === 'android' && timePickerVisibility[label.toLowerCase()] && (
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={(event, selectedTime) =>
              label === 'Start Time' ? onStartTimeChange(event, selectedTime) : onEndTimeChange(event, selectedTime)
            }
          />
        )}
      </View>
    );
  };

// const openStartTimePicker = () => {
//     setTimePickerVisibility({ ...timePickerVisibility, startTime: true });
//   };

//   const openEndTimePicker = () => {
//     setTimePickerVisibility({ ...timePickerVisibility, endTime: true });
//   };

  const onStartTimeChange = (event, selectedTime) => {
    setTimePickerVisibility({ ...timePickerVisibility, startTime: false });
    if (event.type !== 'dismissed') {
      setFormData({ ...formData, start: selectedTime });
    }
  };

  const onEndTimeChange = (event, selectedTime) => {
    setTimePickerVisibility({ ...timePickerVisibility, endTime: false });
    if (event.type !== 'dismissed') {
      setFormData({ ...formData, end: selectedTime });
    }
  };


  const formHandler = async (e) => {
    e.preventDefault();

    // Check for time conflicts before submitting the form
    const conflicts = await checkTimeConflicts(formData.date, formData.start, formData.end);

    if (conflicts) {
      alert("Selected time is already booked. Please choose a different time.");
    } else {
      // If no conflicts, proceed with submitting the form
      submitForm();
    }
  };



  const handleTimeChange = () => {
  if (formData.start && formData.end) {
    const startTime = new Date(`${formData.date}T${formData.start}`);
    const endTime = new Date(`${formData.date}T${formData.end}`);
    const timeDifference = endTime - startTime;
    const timeinHRS = timeDifference / (1000 * 60 * 60);
    const totalCharge = timeinHRS * 5; // $5 per hr
    setTotal(totalCharge);
    setFormData({ ...formData, price: totalCharge });
  } else {
    // Handle the case where either start or end time is undefined
    console.warn('Start or end time is undefined');
  }
};


const handleConfirm = ()=>{
  handleTimeChange()
  setConfirmed(true)
}


const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for time conflicts before submitting the form
    const conflicts = await checkTimeConflicts(formData.date, formData.start, formData.end);

   if (conflicts) {
      alert(
        "Selected time is already booked. Please choose a different time."
      );
    } else {
      // If no conflicts, proceed with submitting the form
      submitForm();
    }
  };

  

  const checkTimeConflicts = async (date, start, end) => {
    try {
      const response = await fetch(`http://localhost:5000/sign?date=${date}&start=${start}&end=${end}`);
      const data = await response.json();
      return data.conflicts; // Assuming the server responds with a property 'conflicts'
    } catch (error) {
      console.error("Error checking time conflicts:", error);
      return true; // Assume conflict in case of an error
    }
  };

  const submitForm = async () => {
    try {
      // Proceed with submitting the form (making a POST request to sign endpoint)
      const response = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      handlePayment()
  
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // Clear form data after successful submission
        setFormData({
          name: "",
          date: new Date(),
          start: null,
          end: null,
          email: "",
          phone: ""
        });
  
        setTotal(0); // Reset total charge
        setConfirmed(false); // Reset confirmation status
        alert("Thank you for submitting!");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  
const handlePayment = async () => {
  
  try {
  
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer sk_test_51Oia2ME02fj2AjRfCm6lH09HloiDztl2Qm0Qf4VjvAORMYCR38bs4qvXZbWs8fjYXfdVMur8D1Jf8ZMupnZ4A2wU00hzkAXUBT`,
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1, priceInCents:Math.round(total * 100) }, // Use tot as the price in cents
        ],
      }),
    });

    if (response.ok) {
      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error('Failed to create checkout session');
    }
  } catch (error) {
    console.error('Error handling checkout:', error);
  }
};
  return (
    <View style={{ width: "80%", margin: "0 auto" }}>
      <View style={{ flexDirection: "col", justifyContent: "space-between", marginTop: "2%", fontSize: 20 }}>
        <View style={{flexDirection:"row"}}>
            <Image source={pic} style={{ width: 50, height:50, margin:10}} />
        <View>
           <Text style={{ fontSize: 24 }}>What is the CutTrap</Text>
          <Text style={{display:"flex"}}>
            The CutTrap allows you to book and pay for booth rental time. Store owners can make an account to track or remove daily bookings through CutTrap.
          </Text>
        </View>
       
        </View>
        <View>
          </View>
          {/* this */}
            <View style={{display:"flex" ,justifyContent:"center", alignSelf:"center"}}> 
            
              <View style={{alignSelf:"center",alignContent:"center"}} >
          <Text style={{ fontSize: 24 }}>Book your booth space</Text>
          <TextInput placeholder="Date" onChangeText={(value) => setFormData({ ...formData, name: value })} />
           <Button title="show date" onPress={()=>showMode("date")}/>
            <View>
              <DateTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                            />
            
            </View>
              
           
           <Button title='show Time' onPress={()=>showMode("time")}/>
           <View style={styles.formGroup}>
        <Text style={styles.label}>Date:</Text>
       
        {renderTimePicker("Start Time", openStartTimePicker, formData.start)}
      {renderTimePicker("End Time", openEndTimePicker, formData.end)}
      </View>
      <View style={styles.formGroup}>

    {datePickerVisibility && (
      <DateTimePicker
        value={formData.date}
        mode="date"
        display="default"
        onChange={onDateChange}
        title="show Datetime"
      />
    )}
        {/* <Text style={styles.label}>Start Time:</Text>
        <TouchableOpacity onPress={openStartTimePicker}>
          <Text>{formData.start.toLocaleTimeString(formData.start)}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>End Time:</Text>
        <TouchableOpacity onPress={openEndTimePicker}>
          <Text>{formData.end.toLocaleTimeString()}</Text>
        </TouchableOpacity> */}
      </View>
          <TextInput placeholder="Email" onChangeText={(value) => setFormData({ ...formData, email: value })} />
          <TextInput placeholder="Phone" onChangeText={(value) => setFormData({ ...formData, phone: value })} />

          {confirmed ? (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          )}

          <View>
            <Text>${total} is your total</Text>
          </View>
          </View>
            </View>
        
      </View>
    </View>



    
  );

 
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  }})
export default Form;