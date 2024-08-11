import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, Clipboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

const CouponsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { allcoupons,setCouponCode } = route.params;
  console.log("====?", allcoupons);
  
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchCode, setSearchCode] = useState('');

  useEffect(() => {
    // Assuming allcoupons is an array of coupon objects
    if (Array.isArray(allcoupons)) {
      setCoupons(allcoupons);
      setIsLoading(false);
    } else {
      Alert.alert('Error', 'Invalid coupon data.');
      setIsLoading(false);
    }
  }, [allcoupons]);

  useEffect(() => {
    handleSearch();  // Perform search when searchCode changes
  }, [searchCode, coupons]);

  const handleSearch = () => {
    const filtered = coupons.filter(coupon =>
      coupon.code.toLowerCase().includes(searchCode.toLowerCase())
    );
    setFilteredCoupons(filtered);
  };

  const handleApplyCoupon = (code) => {
    Clipboard.setString(code);
    setCouponCode(code)
    Alert.alert('Coupon Code', `Coupon code ${code} copied to clipboard`);
  };

  const renderCoupon = ({ item }) => (
    <View style={styles.couponContainer}>
      <Text style={styles.couponTitle}>
        {item.discount_type === 'percentage'
          ? `${item.discount_value}% OFF`
          : `Flat ₹${item.discount_value} OFF`}
      </Text>
      <Text style={styles.couponDescription}>Save ₹{item.discount_max} with this code</Text>
      <Text style={styles.couponCode}>{item.code}</Text>
      <TouchableOpacity style={styles.applyButton} onPress={() => handleApplyCoupon(item.code)}>
        <Text style={styles.applyButtonText}>TAP TO COPY</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" type="material" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant coupons for you</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Type coupon code here"
          value={searchCode}
          onChangeText={setSearchCode}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.bestOffersText}>Best offers for you</Text>
          {filteredCoupons.length > 0 ? (
            <FlatList
              data={filteredCoupons}
              renderItem={renderCoupon}
              keyExtractor={(item) => item.code}
              contentContainerStyle={styles.couponsList}
            />
          ) : (
            <View style={styles.noCouponsContainer}>
              <Text style={styles.noCouponsText}>No Coupons Available</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  bestOffersText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: 10,
    color: '#848484',
  },
  couponsList: {
    paddingVertical: 16,
  },
  couponContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  couponDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  couponCode: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  noCouponsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCouponsText: {
    fontSize: 18,
    color: '#666',
  },
});

export default CouponsScreen;
