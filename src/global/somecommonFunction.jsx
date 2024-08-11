import axios from "axios";
import { API_USER } from "./data";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
export const login = async (data, setUser) => {
    //console.log(data);
    try {
      const response = await axios.get(API_USER, { params: data });
      console.log('Response:', response.data);
      if(response.data.type==="customer"){
        await AsyncStorage.setItem('auth', JSON.stringify(response.data))
        setUser(response.data)
      }
  
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }
  export const logout = async (setUser) => {
    try {
      setUser({token:null})
      await AsyncStorage.removeItem('auth');
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(error.response.data.message, ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }
  export const insertData = async (formdata, APIURL,message="") => {
    console.log(APIURL);
    console.log(formdata);
    try {
      let response = await axios.post(
       APIURL,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Upload successful! ', response.data);       
      ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP)
      return response.data 
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      ToastAndroid.showWithGravity('Somthing wrong Try again!', ToastAndroid.LONG, ToastAndroid.TOP)
    }
  }
  export const updateData = async (formdata, APIURL) => {
    //console.log(APIURL);
    //console.log(formdata);
    try {
      let response = await axios.post(
        APIURL,
       formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      //console.log('Upload successful! ', response.data);
      //ToastAndroid.showWithGravity('update Data', ToastAndroid.LONG, ToastAndroid.TOP)
    } catch (error) {
      console.error('update failed! ', error);
      ToastAndroid.showWithGravity('Error', ToastAndroid.LONG, ToastAndroid.TOP)
      
    }
  }
  // export const deleteData = async (formdata, APIURL) => {
  //   console.log(APIURL);
  //   console.log(formdata);
  //   try {
  //     let response = await axios.post(
  //       APIURL,
  //      formdata,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );
  //     //console.log('Upload successful! ', response.data);
  //     //ToastAndroid.showWithGravity('update Data', ToastAndroid.LONG, ToastAndroid.TOP)
  //   } catch (error) {
  //     console.error('update failed! ', error);
  //     ToastAndroid.showWithGravity('Error', ToastAndroid.LONG, ToastAndroid.TOP)
      
  //   }
  // }
  export const formatOrders = (orders) => {
    return orders.map((order, index) => {
      return {
        ...formatOrder(order),
        //id: (index + 1).toString(), // Assuming id starts from 1 for the formatted orders list
      };
    });
  };
  const formatOrder = (order) => {
    return {
      id: order.id.toString(), // Convert id to string if needed
      restaurant: order.restaurant.name,
      location: order.restaurant.address, // Assuming Kolkata as a constant for the city
      menuLink: 'View menu', // Placeholder for menu link
      orderDetails: `${order.orders[0].quantity} x ${order.orders[0].name}`, // Assuming only one item in orders array
      orderTime: `Order placed on ${new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })}`,
      status: 'Pending', // You can customize status based on 'status_restaurant', 'status_delivery', 'status_payment' fields
      amount: `₹${(order.amount + order.deliveryfees - order.discountamout).toFixed(2)}`, // Calculating total amount
      rating: null, // Assuming rating is not provided in the original data
      paymentStatus:order.status_payment, // Assuming payment status based on 'status_payment'
      paymentFailed: false, // Assuming payment failure status
    };
  };
export const getPermissions=async ()=>{
    let {status}=await Location.requestForegroundPermissionsAsync();
    console.log(status);   
    if(status!=='granted'){
      console.log("please grant location permission");
      return;      
    }   
    let currentlocation=await Location.getCurrentPositionAsync({})
    console.log(currentlocation);
    
  }
  export const getData = async (API_URL) => {
    //console.log(API_URL);
    try {
        const response = await axios.get(API_URL);       
        return response.data
    } catch (error) {
      
        console.log(error);        
    }
  }

  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => degrees * (Math.PI / 180);
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()} ${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
  };
  