import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { CartContext } from '../context/cartContext';

const DishRow = ({ item }) => {
  const { cartItem, updateCartItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const existingItem = cartItem.find(citem => citem.id === item.id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
    }
  }, [cartItem]);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      updateCartItem(item, quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    updateCartItem(item, quantity + 1);
  };

  return (
    <View style={styles.dishRowContainer}>
      <View style={styles.imageAndInfoContainer}>
        <Image
          style={styles.foodImage}
          source={{ uri: item.food_image_url }}
        />
        <View style={styles.dishInfoContainer}>
          <View style={styles.headerRow}>
            <Icon
              name={item.isVeg ? 'circle' : 'circle'}
              type='material-community'
              size={14}
              color={item.isVeg ? 'green' : 'red'}
            />
            <Text style={styles.dishName}>{item.name}</Text>
          </View>
          <View style={styles.ratingContainer}>
            {renderStars(item.rating)}
            <Text style={styles.ratingText}>{item.rating} ratings</Text>
          </View>
          <Text style={styles.dishPrice}>₹{item.price}</Text>
          <Text style={styles.dishDescription}>{item.description}</Text>
        </View>
      </View>
      {item.deliverable === 1 ? (
        <View style={styles.addButtonContainer}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={increaseQuantity}>
              <Text style={styles.addButtonText}>ADD</Text>
              <Icon name="plus" type="material-community" size={18} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>Currently offline</Text>
        </View>
      )}
    </View>
  );
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Icon
          key={i}
          name='star'
          type='material'
          size={14}
          color='#FFD700'
        />
      );
    } else if (i - rating < 1) {
      stars.push(
        <Icon
          key={i}
          name='star-half'
          type='material'
          size={14}
          color='#FFD700'
        />
      );
    } else {
      stars.push(
        <Icon
          key={i}
          name='star-border'
          type='material'
          size={14}
          color='#FFD700'
        />
      );
    }
  }
  return stars;
};

export default DishRow;

const styles = StyleSheet.create({
  dishRowContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'flex-start',
  },
  imageAndInfoContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 12,
  },
  dishInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  dishPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 2,
  },
  dishDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  quantityText: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 8,
  },
  offlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
  },
  offlineText: {
    fontSize: 14,
    color: '#FF6347',
    fontWeight: 'bold',
  },
});
