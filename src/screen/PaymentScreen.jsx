import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CartContext } from '../context/cartContext';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import { API_ORDER, API_ORDER_ITEM } from '../global/data';
import { insertData } from '../global/somecommonFunction';
import RNUpiPayment from 'react-native-upi-payment';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { adrress, discount, deliveryCharge, appliedCouponID } = route.params;
  const { cartItem, setCartItem, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { adresses, getOrderList } = useContext(UserContext);
  const defaultAddress = adresses.find(item => item.is_default === 1);
  const restaurantIds = [...new Set(cartItem.map(item => item.restaurant_id))];
  const paymentMethods = [
    { label: 'Cash on Delivery', value: 'cash' },
    { label: 'Online Payment', value: 'netbanking' },
  ];
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleCheck = (method) => {
    setSelectedMethod(method);
  };

  const handleOrder = async () => {
    let formData = new FormData();
    let today = new Date().toISOString().slice(0, 10);
    formData.append('date', today);
    formData.append('orderuser_id', user.email);
    formData.append('delivery_address_id', adrress);
    formData.append('restaurant_id', restaurantIds[0]);
    formData.append('status_restaurant', 'pending');
    formData.append('status_delivery', 'pending');
    formData.append('amount', totalPrice);
    formData.append('delivery_fees', deliveryCharge);
    formData.append('discount_amount', discount);
    
    if (appliedCouponID !== null && appliedCouponID !== undefined) {
      formData.append('coupon_id', appliedCouponID);
    }

    if (selectedMethod === 'cash') {
      formData.append('status_payment', 'pending');
      formData.append('payment_method', 'cash');
      formData.append('payment_transaction', 'cash');
      await submitOrder(formData);
    }

    if (selectedMethod === 'netbanking') {
      console.log("netbanking");
      
      RNUpiPayment.initializePayment(
        {
          vpa: 'john@upi', // replace with actual VPA
          payeeName: 'John Doe',
          amount: totalPrice.toString(),
          transactionRef: 'unique-transaction-ref',
        },
        (data) => successCallback(data, formData),
        failureCallback
      );
    }
  };

  const successCallback = async (data, formData) => {
    console.log("SuccessCallBack:", data);
    if (data.Status === 'SUCCESS') {
      formData.append('status_payment', 'success');
      formData.append('payment_method', 'netbanking');
      formData.append('payment_transaction', data.transactionId);
      //await submitOrder(formData);
    } else {
      console.log("Transaction failed:", data);
    }
  };

  const failureCallback = (data) => {
    console.log("FailureCallBack:", data);
    // Handle failure (e.g., show a message to the user)
  };

  const submitOrder = async (formData) => {
    try {
      let order_id = (await insertData(formData, API_ORDER, "Order Submit")).id;
      if (order_id) {
        for (let i = 0; i < cartItem.length; i++) {
          const item = cartItem[i];
          let formDataItem = new FormData();
          formDataItem.append('order_id', order_id);
          formDataItem.append('food_id', item.id);
          formDataItem.append('restaurant_id', item.restaurant_id);
          formDataItem.append('name', item.name);
          formDataItem.append('quantity', item.quantity.toString());
          formDataItem.append('price', item.price.toString());
          await insertData(formDataItem, API_ORDER_ITEM, item.name + " Order");
        }
      }
      setCartItem([]);
      getOrderList();
      navigation.navigate("Order-List");
    } catch (error) {
      console.error("Order submission failed:", error);
      // Handle the error (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    if (cartItem.length === 0) {
      navigation.navigate("home-screen");
    }
  }, [cartItem, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Payment Method</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Amount: ₹{parseFloat(totalPrice) + parseFloat(deliveryCharge) - parseFloat(discount)}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map((method, index) => (
            <CheckBox
              key={index}
              title={method.label}
              checked={selectedMethod === method.value}
              onPress={() => handleCheck(method.value)}
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              containerStyle={styles.checkBoxContainer}
              textStyle={styles.checkBoxText}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title={selectedMethod === 'cash' ? "Order Now" : "Pay Now"}
          onPress={handleOrder}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitleStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#E74C3C',
    paddingTop: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  summaryContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ECF0F1',
    marginVertical: 20,
    borderRadius: 10,
    elevation: 3,
  },
  summaryText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  paymentMethodsContainer: {
    paddingTop: 20,
  },
  checkBoxContainer: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  checkBoxText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonStyle: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
  },
  buttonTitleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
