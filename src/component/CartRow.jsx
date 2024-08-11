import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { CartContext } from '../context/cartContext';

const CartRow = ({ item, removeCoupon }) => {
    const { cartItem, updateCartItem } = useContext(CartContext)
    const [quantity, setQuantity] = useState(0);
    console.log("==>",cartItem);
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
            //removeCoupon();
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        updateCartItem(item, quantity + 1);
        //removeCoupon();
    };
    const totalPrice = item.price * quantity;
    return (
        <View className="flex-row items-center bg-white p-3 rounded shadow mb-3 "
            style={{ shadowColor: "rgba(0, 0, 0, 0.5)", shadowRadius: 12 }} >
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Image
                    className="rounded-xl"
                    style={{ height: 50, width: 50 }}
                    source={{ uri: item.food_image_url }}
                />
            </View>
            <View style={{ flex: 3 }}>
                <Text className="font-extrabold">{item.name}</Text>
                <Text className="text-gray-500 font-bold">Rs. {item.price}</Text>
                <Text className="text-gray-700 font-bold text-xs">{quantity} X Rs .{item.price}={totalPrice}</Text>
            </View>
            <View style={{ flex: 1,marginRight:12}}>
          
                <View className="flex-row items-center">
                    <Icon
                        type='material-community'
                        name='minus-circle-outline'
                        size={22}
                        color={"#000"}
                        onPress={() => decreaseQuantity()}
                    />
                    <Text className="px-3">{quantity}</Text>
                    <Icon
                        type='material-community'
                        name='plus-circle-outline'
                        size={22}
                        color={"#000"}

                        onPress={() => increaseQuantity()}
                    />

                </View>
            </View>

        </View>
        
    )
}
export default CartRow
const styles = StyleSheet.create({})