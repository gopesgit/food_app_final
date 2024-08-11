import { Linking, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useContext, useEffect, useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
    const [processingPayment, setProcessingPayment] = useState(false);
    const navigation = useNavigation();
    const timeoutRef = useRef(null);

    const createUPIUrl = (payeeAddress, amount, transactionRef, transactionNote) => {
        return `upi://pay?pa=${payeeAddress}&pn=ASR PAY&am=${amount}&cu=INR&tn=${transactionNote}&tr=${transactionRef}`;
    };

    const handleUPIPayment = () => {
        if (processingPayment) return; // Prevent multiple clicks

        const upiUrl = createUPIUrl('ars@upi', '50.00', 'TXN12345', 'Payment for services');
        console.log('UPI URL:', upiUrl);

        Linking.canOpenURL(upiUrl)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Error', 'No UPI app found on your device.');
                } else {
                    setProcessingPayment(true);
                    console.log('Payment initiated, setting timeout for 5 seconds.');

                    timeoutRef.current = setTimeout(() => {
                        if (processingPayment) {
                            console.log('Timeout reached, navigating to OrderStatus with failure status.');
                            setProcessingPayment(false);
                            navigation.navigate('OrderStatus', { status: 'failure' });
                        }
                    }, 5000); // 5 seconds

                    Linking.openURL(upiUrl)
                        .then(() => {
                            console.log('UPI URL opened, adding event listener.');
                            Linking.addEventListener('url', handlePaymentResponse);
                        })
                        .catch(err => {
                            console.error('Error opening UPI URL', err);
                            clearTimeout(timeoutRef.current);
                            setProcessingPayment(false);
                        });
                }
            })
            .catch(err => console.error('Error opening UPI URL', err));
    };

    const handlePaymentResponse = (event) => {
        const { url } = event;
        console.log('Payment response URL:', url);

        if (url.includes('upi://pay')) {
            const status = url.match(/Status=([^&]+)/i);
            if (status && status[1]) {
                const paymentStatus = status[1].toLowerCase();
                console.log('Payment status:', paymentStatus);
                if (paymentStatus === 'success') {
                    console.log('Navigating to OrderStatus with success status.');
                    navigation.navigate('OrderStatus', { status: 'success' });
                } else {
                    console.log('Navigating to OrderStatus with failure status.');
                    navigation.navigate('OrderStatus', { status: 'failure' });
                }
            }
            clearTimeout(timeoutRef.current);
            setProcessingPayment(false);
            Linking.removeAllListeners('url');
        }
    };

    useEffect(() => {
        console.log('Component mounted, setting up cleanup.');
        return () => {
            console.log('Component unmounted, removing URL listener and clearing timeout.');
            Linking.removeAllListeners('url');
            clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <View style={styles.payButtonContainer}>
            <TouchableOpacity style={styles.payButton} onPress={handleUPIPayment} disabled={processingPayment}>
                <Text style={styles.payButtonText}>{processingPayment ? 'Processing...' : 'Pay Now'}</Text>
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
    wrapper: { height: 150 },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default PaymentScreen;
