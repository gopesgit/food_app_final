import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/cartContext';

const CartIcon = () => {
  const navigation = useNavigation();
  const { totalPrice, totalQuantity } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        style={styles.button}
      >
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>
            {totalQuantity}
          </Text>
        </View>
        <Text style={styles.buttonText}>
          View Cart
        </Text>
        <Text style={styles.priceText}>
          Rs. {totalPrice}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10, // Slightly more padding from the bottom
    width: '100%',
    paddingHorizontal: 10, // Increased padding for better spacing
    zIndex: 50,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F97316',
    borderRadius: 12, // Rounded corners for button
    paddingVertical: 10, // Consistent vertical padding
    paddingHorizontal: 15, // Consistent horizontal padding
    shadowColor: 'rgba(0, 0, 0, 0.3)', // Subtle shadow for better effect
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
  },
  quantityContainer: {
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 20, // More rounded container
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Slightly less opacity
  },
  quantityText: {
    fontWeight: '700',
    color: '#000', // Darker color for better contrast
    fontSize: 16, // Consistent font size
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    fontSize: 16, // Consistent font size
  },
  priceText: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 16, // Consistent font size
  },
});

export default CartIcon;
