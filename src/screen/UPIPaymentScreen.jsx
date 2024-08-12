import React, { useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
    const [processingPayment, setProcessingPayment] = useState(false);
    //const navigation = useNavigation(); // Uncomment if using navigation

    const createUPIUrl = (payeeAddress, amount, transactionRef, transactionNote) => {
        return `upi://pay?pa=${encodeURIComponent(payeeAddress)}&pn=${encodeURIComponent('ASR PAY')}&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}&tr=${encodeURIComponent(transactionRef)}`;
    };

    const handleUPIPayment = () => {
        if (processingPayment) return; // Prevent multiple clicks

        const upiUrl = createUPIUrl('gopes.in@okicici', '1.00', 'TXNjkkjj', 'Payment for services');
        console.log('UPI URL:', upiUrl);

        Linking.canOpenURL(upiUrl)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Error', 'No UPI app found on your device.');
                    setProcessingPayment(false);
                } else {
                    setProcessingPayment(true);

                    // Open UPI URL
                    Linking.openURL(upiUrl)
                        .catch(err => {
                            console.error('Error opening UPI URL', err);
                            Alert.alert('Error', 'Unable to open UPI app.');
                            setProcessingPayment(false);
                        });

                    // Handle result and possible timeout
                    setTimeout(() => {
                        setProcessingPayment(false);
                        // Handle payment result or redirect
                        // You might want to use a backend to verify transaction status or handle payment response
                        // navigation.navigate('OrderStatus', { status: 'pending' });
                    }, 10000); // Increased timeout to 10 seconds
                }
            })
            .catch(err => {
                console.error('Error checking URL support', err);
                Alert.alert('Error', 'Unable to process payment.');
                setProcessingPayment(false);
            });
    };

    return (
        <View style={styles.payButtonContainer}>
            <TouchableOpacity 
                style={styles.payButton} 
                onPress={handleUPIPayment} 
                disabled={processingPayment}
            >
                <Text style={styles.payButtonText}>
                    {processingPayment ? 'Processing...' : 'Pay Now'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    payButtonContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    payButton: {
        backgroundColor: '#ff6347',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PaymentScreen;
