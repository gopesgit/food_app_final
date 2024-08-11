import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { CartContext } from '../context/cartContext';

const DishRow = ({ item }) => {
  const { cartItem, updateCartItem } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const existingItemIndex = cartItem.findIndex(citem => citem.id === item.id);
    if (existingItemIndex !== -1) {
      const existingQuantity = cartItem[existingItemIndex].quantity;
      setQuantity(existingQuantity);
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
      <View style={styles.dishInfoContainer}>
        <View style={styles.headerRow}>
          <Icon
            name={item.isVeg ? 'circle' : 'circle'}
            type='material-community'
            size={16}
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
      <View style={styles.imageAndButtonContainer}>
        <Image
          style={styles.foodImage}
          source={{ uri: item.food_image_url }}
        />
        <View style={styles.addButtonContainer}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={increaseQuantity}>
              <Text style={styles.addButtonText}>ADD</Text>
              <Icon name="plus" type="material-community" size={20} color="#fff" />
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
      </View>
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
          size={16}
          color='#FFD700'
        />
      );
    } else if (i - rating < 1) {
      stars.push(
        <Icon
          key={i}
          name='star-half'
          type='material'
          size={16}
          color='#FFD700'
        />
      );
    } else {
      stars.push(
        <Icon
          key={i}
          name='star-border'
          type='material'
          size={16}
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
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'flex-start',
  },
  imageAndButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  dishInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dishDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  addButtonContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
});

// import { useContext, useEffect, useState } from 'react';
// import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
// import { Icon } from 'react-native-elements'
// import { CartContext } from '../context/cartContext';

// const DishRow = ({ item }) => {
//     const { cartItem, updateCartItem }=useContext(CartContext)
//     // const existingItemIndex = cartItem.findIndex(citem => citem.id === item.id);
//     // const existingquantity=existingItemIndex!==-1?cartItem[existingItemIndex].quantity:0
//     // console.log(existingquantity);
//     const [quantity, setQuantity] = useState(0);
//     //const [cartItem,setCartItem]=useState([]);
    
//     useEffect(() => {
//         const existingItemIndex = cartItem.findIndex(citem => citem.id === item.id);
//         if (existingItemIndex !== -1) {
//           const existingQuantity = cartItem[existingItemIndex].quantity;
//           setQuantity(existingQuantity);
//         }
//       }, [cartItem]);

//     const decreaseQuantity = () => {
//         if (quantity > 0) {
//             setQuantity(quantity - 1);
//             updateCartItem(item,quantity - 1);
//         }
//     };

//     const increaseQuantity = () => {
//         setQuantity(quantity + 1);
//         updateCartItem(item,quantity + 1);
//     };
  
//     return (
        
//         <View 
//         style={{ shadowColor: "rgba(0, 0, 0, 0.5)", shadowRadius:12}}
//         className="flex-row items-center bg-stone-50 p-3 rounded-3xl shadow mb-3 mx-2">
//             <Image
//                 className="rounded-3xl"
//                 style={{ height: 100, width: 100 }}
//                 source={{uri:item.food_image_url}}
//             />
//             <View className="flex flex-1 space-y-3">
//                 <View className="pl-3">
//                     <Text className="text-xl">{item.name}</Text>
//                     <Text className="text-gray-700">{item.description}</Text>
//                 </View>
//                 <View className="flex-row justify-between pl-3 items-center">
//                     <Text className="text-gray-700 text-lg font-bold">${item.price}</Text>
//                     <View className="flex-row items-center">
//                     <Icon
//                             type='material-community'
//                             name='minus-circle-outline'
//                             size={22}
//                             color={"#000"}                            
//                             onPress={() => decreaseQuantity()}
//                         />
//                         <Text className="px-3">{quantity}</Text>
//                         <Icon
//                             type='material-community'
//                             name='plus-circle-outline'
//                             size={22}
//                             color={"#000"}
                            
//                             onPress={() => increaseQuantity()}
//                         />
                      
//                     </View>
//                 </View>
//             </View>
//         </View>
//     )
// }
// export default DishRow
// const styles = StyleSheet.create({})