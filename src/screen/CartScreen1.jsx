import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { CartContext } from '../context/cartContext';
import CartRow from '../component/CartRow';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItem, updateCartItem, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { adresses, getAddressesList } = useContext(UserContext);
  let defaultaddress = adresses.filter(item => item.is_default === 1);
  const [couponCode, setCouponCode] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery </Text>
          <TouchableOpacity onPress={() => adresses.length === 0 ? navigation.navigate('Add-Address') : navigation.navigate('Change-Address')}>
            <Text style={styles.changeText}>{adresses.length === 0 ? "Add Address" : "Change"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            {adresses.length === 0
              ? "Add Your Address"
              : defaultaddress.length === 0
                ? "Choose Default Addresss"
                : `${defaultaddress[0].address} ,Pin: ${defaultaddress[0].pin},Phone:${defaultaddress[0].phone_no}`}
          </Text>
        </View>
        
        {cartItem && cartItem.map((item, index) => (
          <CartRow item={item} key={index} />
        ))}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>View all restaurant coupons</Text>
        </View>
        <View style={styles.section}>
          <TextInput style={styles.couponInput} placeholder="Enter coupon code" value={couponCode} onChangeText={setCouponCode} />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Save ₹61 with free delivery</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery in 51 mins</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asraul Mondal, +91-8981848015</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Bill ₹{totalPrice}</Text>
          <Text style={styles.inclText}>Incl. taxes and charges</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Bill Summary</Text>
          <Text style={styles.inclText}>Item total ₹ {totalPrice}</Text>
          <Text style={styles.inclText}>Restarunt delivery partner fee ₹{totalPrice}</Text>
          <Text style={styles.inclText}>Grand Total ₹ {parseFloat(totalPrice) + 0} </Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => (cartItem.length !== 0 && defaultaddress.length !== 0 ? navigation.navigate("Payment") : navigation.navigate("home-screen"))}>
          <Text style={styles.footerButtonText}>{cartItem.length !== 0 && defaultaddress.length !== 0 ? "Payment" : "Home"}</Text>
          <Text style={styles.footerTotalText}> TOTAL ₹{totalPrice}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop:12,
  },
  scrollView: {
   paddingHorizontal:12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  changeText: {
    fontSize: 16,
    color: '#007AFF',
  },
  addressContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  applyButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  couponInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  totalContainer: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  inclText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  goldSection: {
    padding: 15,
    backgroundColor: '#FFFAF0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginBottom: 10,
    alignItems: 'center',
  },
  goldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  goldSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 10,
  },
  goldButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goldButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
  },
  footerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CartScreen;


