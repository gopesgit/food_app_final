import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const orderDetails = {
  restaurant: 'Mio Amore',
  location: 'Barrackpore, Kolkata',
  orderId: '#6024360555',
  orderItems: '5 x Chicken Tikka Pizza [6 inches]',
  orderStatus: 'Order arrived 7 mins early',
  deliveryTime: 'Your delivery partner Santanu reached your location at 2:15 PM',
  deliveryPartner: 'Santanu Bhattacharjee',
  deliveryPartnerInfo: 'Your delivery partner',
  userPhone: '898184XXXX',
  //deliveryAddress: 'C/O - Dilip Roy, Bara Kanthalia, Barrackpore, North 24 PGS, KOLKATA-700121, Near Bara Kanthalia High School',
};

const DetailOrderScreen = () => {
  const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="arrow-back" type="material" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{orderDetails.restaurant}</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{orderDetails.orderStatus}</Text>
        <Text style={styles.statusDetail}>{orderDetails.deliveryTime}</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.restaurantImage} />
          <View style={styles.sectionInfo}>
            <Text style={styles.restaurantName}>{orderDetails.restaurant}</Text>
            <Text style={styles.location}>{orderDetails.location}</Text>
            <TouchableOpacity>
              <Text style={styles.menuLink}>View menu</Text>
            </TouchableOpacity>
          </View>
          <Icon name="phone" type="material-community" size={24} color="#007AFF" />
        </View>
        <Text style={styles.orderDetails}>{orderDetails.orderId}</Text>
        <Text style={styles.orderDetails}>{orderDetails.orderItems}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate Mio Amore</Text>
          {renderStars(0)}
        </View>
        <TouchableOpacity style={styles.reportFraud}>
          <Text style={styles.reportFraudText}>Report a fraud</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.deliveryImage} />
          <View style={styles.sectionInfo}>
            <Text style={styles.deliveryName}>{orderDetails.deliveryPartner}</Text>
            <Text style={styles.deliveryInfo}>{orderDetails.deliveryPartnerInfo}</Text>
          </View>
        </View>
        <Text style={styles.tipText}>Thank {orderDetails.deliveryPartner} by leaving a tip</Text>
        <View style={styles.tipContainer}>
          <TouchableOpacity style={styles.tipButton}>
            <Text style={styles.tipAmount}>₹15</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tipButton, styles.highlightedTip]}>
            <Text style={styles.tipAmount}>₹20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tipButton}>
            <Text style={styles.tipAmount}>₹30</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tipButton}>
            <Text style={styles.tipAmount}>Other</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate Santanu</Text>
          {renderStars(0)}
        </View>
        <TouchableOpacity style={styles.reportFraud}>
          <Text style={styles.reportFraudText}>Report a fraud</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.userPhone}>{orderDetails.userPhone}</Text>
        <Text style={styles.deliveryAddress}>{orderDetails.deliveryAddress}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.helpButton}>
          <Text style={styles.helpText}>Need help with your order?</Text>
          <Icon name="help-circle-outline" type="material-community" size={24} color="#333" />
        </TouchableOpacity>
      </View>


      <View style={styles.section}>
        <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.promoImage} />
        <Text style={styles.promoFooter}>We are on top!</Text>
      </View>
    </ScrollView>
  );
};

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Icon key={i} name='star' type='material' size={20} color='#FFD700' />
      );
    } else if (i - rating < 1) {
      stars.push(
        <Icon  key={i}  name='star-half' type='material' size={20} color='#FFD700' />
      );
    } else {
      stars.push(
        <Icon key={i} name='star-border' type='material' size={20} color='#FFD700' />
      );
    }
  }
  return stars;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    marginVertical:25
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  statusDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    margin: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  sectionInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  menuLink: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
  orderDetails: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  reportFraud: {
    marginTop: 10,
  },
  reportFraudText: {
    fontSize: 14,
    color: '#FF3B30',
  },
  deliveryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  deliveryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#666',
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tipButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  highlightedTip: {
    backgroundColor: '#FFEB3B',
  },
  tipAmount: {
    fontSize: 14,
    color: '#333',
  },
  userPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#666',
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  helpText: {
    fontSize: 16,
    color: '#333',
  },
  scratchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scratchCardText: {
    fontSize: 16,
    color: '#333',
  },
  scratchCardLink: {
    fontSize: 14,
    color: '#007AFF',
  },
  promoHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  promoText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 10,
  },
  joinNow: {
    fontSize: 14,
    color: '#007AFF',
  },
  promoImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    marginTop: 10,
  },
  promoFooter: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default DetailOrderScreen;
