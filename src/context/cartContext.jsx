import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [restaurantId, setRestaurantId] = useState(null); // Store the current restaurant ID

    useEffect(() => {
        if (cartItem.length === 0) {
            setTotalPrice(0);
            setTotalQuantity(0);
            setRestaurantId(null);
            return;
        }

        // Calculate total price and quantity of items in cart
        let total = 0;
        let totalq = 0;
        cartItem.forEach(item => {
            total += item.price * item.quantity;
            totalq += item.quantity;
        });
        setTotalPrice(total);
        setTotalQuantity(totalq);

        // Set the restaurant ID if the cart is not empty
        const firstItemRestaurantId = cartItem[0].restaurant_id;
        setRestaurantId(firstItemRestaurantId);
    }, [cartItem]);

    const updateCartItem = (item, updatedQuantity) => {
        if (updatedQuantity === 0) {
            // Remove item from cartItem if quantity is 0
            const updatedCartItems = cartItem.filter(citem => citem.id !== item.id);
            setCartItem(updatedCartItems);
        } else {
            // Check if the restaurant ID is set and matches the current item
            if (restaurantId === null) {
                // Set restaurant ID if cart is empty
                setRestaurantId(item.restaurant_id);
            } else if (restaurantId !== item.restaurant_id) {
                // If item from a different restaurant is attempted to be added
                alert("You can only add items from one restaurant to your cart.");
                return; // Prevent adding item to cart
            }

            // Proceed with updating or adding item
            const existingItemIndex = cartItem.findIndex(citem => citem.id === item.id);

            if (existingItemIndex !== -1) {
                // If item exists, update its quantity
                const updatedCartItems = [...cartItem];
                updatedCartItems[existingItemIndex] = {
                    ...updatedCartItems[existingItemIndex],
                    quantity: updatedQuantity
                };
                setCartItem(updatedCartItems);
            } else {
                // If item does not exist, add it to cartItem
                const newItem = {
                    id: item.id,
                    name: item.name,
                    quantity: updatedQuantity,
                    price: item.price,
                    restaurant_id: item.restaurant_id,
                    food_image_url: item.food_image_url,
                };
                setCartItem([...cartItem, newItem]);
            }
        }
    };

    return (
        <CartContext.Provider value={{ cartItem, updateCartItem, totalPrice, totalQuantity, restaurantId }}>
            {children}
        </CartContext.Provider>
    );
};
