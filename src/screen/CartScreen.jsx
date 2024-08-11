import { useNavigation } from '@react-navigation/native';
import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { CartContext } from '../context/cartContext';
import CartRow from '../component/CartRow';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';
import { FoodViewContext } from '../context/viewContext';
import { API_COUPON_BY_RES, API_DELIVERY_FEES_BY_RES } from '../global/data';
import { getData } from '../global/somecommonFunction';

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItem, totalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { adresses } = useContext(UserContext);
  const { restaurant } = useContext(FoodViewContext);
  const [appliedCouponID,setAppliedCoupon]=useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [coupons, setCoupons] = useState([]);
  const [discount, setDiscount] = useState(0.00);
  const [resDeliCharg, setDelCharg] = useState([]);
  const [error, setError] = useState(null);
  const [isValidating, setIsValidating] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [distance, setDistance] = useState(null);
  const [deliverfees, setDeliveryFees] = useState(0.0);

  const defaultaddress = adresses.find(item => item.is_default === 1);
  const ordered_restaurant = restaurant.find(item => item.id === cartItem[0]?.restaurant_id);

  useEffect(() => {
    if (ordered_restaurant) {
      fetchDeliverFessApi();
      fetchCouponApi();
    }
  }, [ordered_restaurant]);

  useEffect(() => {
    if (defaultaddress && ordered_restaurant) {
      const userLat = parseFloat(defaultaddress.latitude);
      const userLon = parseFloat(defaultaddress.longitude);
      const restaurantLat = parseFloat(ordered_restaurant.latitude);
      const restaurantLon = parseFloat(ordered_restaurant.longitude);
      const calculatedDistance = calculateDistance(userLat, userLon, restaurantLat, restaurantLon);
      setDistance(calculatedDistance);
      fetchDeliveryFees();
    }
  }, [defaultaddress, ordered_restaurant, cartItem,distance]);

  const fetchDeliverFessApi = async () => {
    try {
      const response = await getData(`${API_DELIVERY_FEES_BY_RES}${ordered_restaurant.id}`);
      if (response) {
        setDelCharg(response);
      } else {
        setDeliveryFees(Math.round((distance * 2) + 20));
        setDelCharg([]);
      }
    } catch (error) {
      console.error('Error fetching delivery fees:', error);
    }
  };

  const fetchCouponApi = async () => {
    try {
      const response = await getData(`${API_COUPON_BY_RES}${ordered_restaurant.id}`);
      if (response) {
        setCoupons(response);
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const fetchDeliveryFees = async () => {
    try {
      if (resDeliCharg.length) {
        const cleanedData = resDeliCharg
          .filter(item => item.is_active === 1)
          .map(item => ({
            ...item,
            max_distance: parseFloat(item.max_distance),
            min_distance: parseFloat(item.min_distance),
            max_order_amount: parseFloat(item.max_order_amount),
            min_order_amount: parseFloat(item.min_order_amount),
            delivery_fee: parseFloat(item.delivery_fee),
          }));

        const applicableRule = cleanedData.find(rule =>
          (distance >= rule.min_distance && distance <= rule.max_distance) ||
          (totalPrice >= rule.min_order_amount && totalPrice <= rule.max_order_amount)
        );

        if (applicableRule) {
          setDeliveryFees(applicableRule.delivery_fee);
        } else {
          setDeliveryFees(0);
        }
      }
    } catch (error) {
      console.error('Error calculating delivery fees:', error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
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
  const removeCoupon=()=>{
    setIsCouponApplied(false);
    setDiscount(0.0);
    setAppliedCoupon(null);
  }

  const validateCoupon = async () => {
    setIsValidating(true);
    try {
      // Fetch coupons if not already fetched
      await fetchCouponApi();

      const coupon = coupons.find(item => item.code === couponCode);
      console.log(coupon);
      if (coupon) {
        const currentDate = new Date();
        const validFrom = new Date(coupon.valid_from);
        const validUntil = new Date(coupon.valid_until);
        const minOrderVal = parseFloat(coupon.min_order_val);
        
        if (coupon.active && currentDate >= validFrom && currentDate <= validUntil && totalPrice >= minOrderVal && coupon.quantity) {
          setDiscount(parseFloat(coupon.discount_value));
          setIsCouponApplied(true);
          setAppliedCoupon(coupon.id);
          setError(null);
          Alert.alert('Coupon Applied', `Discount of ₹${coupon.discount_value} applied.`);
        } else {
          setError('Coupon is not valid or does not meet the minimum order value.');
          setDiscount(0);
          setAppliedCoupon(null);
        }
      } else {
        setError('Invalid coupon code');
        setDiscount(0);
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setError('An error occurred while validating the coupon.');
    } finally {
      setIsValidating(false);
    }
  };

  const navigateToPayment = () => {
    if (cartItem.length !== 0 && defaultaddress) {
      navigation.navigate("Payment", {
        discount: parseFloat(discount),
        deliveryCharge: parseFloat(deliverfees),
        adrress:adresses.find(item => item.is_default === 1).id,
        appliedCouponID:appliedCouponID,        
      });
    } else {
      navigation.navigate("home-screen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Delivery</Text>
          <TouchableOpacity onPress={() => navigation.navigate(adresses.length === 0 ? 'Add-Address' : 'Change-Address')}>
            <Text style={styles.changeText}>{adresses.length === 0 ? "Add Address" : "Change"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            {adresses.length === 0 ? "Add Your Address"
              : !defaultaddress ? "Choose Default Address"
              : `${defaultaddress.street_address},\nPhone: ${defaultaddress.description}`}
          </Text>
        </View>
        {cartItem.map((item, index) => (
          <CartRow item={item} key={index} />
        ))}
        {coupons.length > 0 && (
          <>
            <View style={styles.section}>
              <TouchableOpacity onPress={() => navigation.navigate('AllCoupons', { allcoupons: coupons, setCouponCode })}>
                <Text style={styles.sectionTitle}>View all restaurant coupons</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <TextInput
                style={styles.couponInput}
                placeholder="Enter coupon code"
                value={couponCode}
                onChangeText={setCouponCode}
                editable={!isCouponApplied}
              />
              <TouchableOpacity
                style={styles.applyButton}
                onPress={!isCouponApplied ?validateCoupon:removeCoupon}
                disabled={isValidating}
              >
                <Text style={styles.applyButtonText}>
                  {isValidating ? "Validating..." : (isCouponApplied ? "REMOVE" : "APPLY")}
                </Text>
              </TouchableOpacity>
              {discount > 0 && <Text style={styles.success}>YOU HAVE SAVED ₹{discount} IN THIS ORDER</Text>}
              {error && <Text style={styles.error}>{error}</Text>}
            </View>
          </>
        )}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery within 51 mins</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{user.name}, {user.phone}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Bill ₹{totalPrice}</Text>
          <Text style={styles.inclText}>Excl. taxes and charges</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Bill Summary</Text>
          <Text style={styles.inclText}>Item total ₹{totalPrice}</Text>
          <Text style={styles.inclText}>Restaurant delivery partner fee ₹{deliverfees}</Text>
          {discount > 0 && <Text style={styles.inclText}>Discount ₹{discount}</Text>}
          <Text style={styles.inclText}>Grand Total ₹{totalPrice + deliverfees - discount}</Text>
        </View>
        {distance !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Distance to Restaurant: {distance.toFixed(2)} km</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={navigateToPayment}>
          <Text style={styles.footerButtonText}>{cartItem.length !== 0 && defaultaddress ? "Payment" : "Home"}</Text>
          <Text style={styles.footerTotalText}> TOTAL ₹{totalPrice + deliverfees - discount}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginTop: 12,
  },
  scrollView: {
    paddingHorizontal: 12,
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
    textTransform: 'uppercase',
  },
  success: {
    marginTop: 16,
    color: 'green',
  },
  error: {
    marginTop: 16,
    color: 'red',
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
