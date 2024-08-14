import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image, Pressable, RefreshControl } from 'react-native';
import { Icon } from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import { UserContext } from '../context/userContext';
import { formatDate, getData } from '../global/somecommonFunction';
import { API_ORDER_BY_USER } from '../global/data';
import { AuthContext } from '../context/authContext';

// Function to render star ratings
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<Icon key={i} name='star' type='material' size={20} color='#FFD700' />);
    } else if (i - rating < 1) {
      stars.push(<Icon key={i} name='star-half' type='material' size={20} color='#FFD700' />);
    } else {
      stars.push(<Icon key={i} name='star-border' type='material' size={20} color='#FFD700' />);
    }
  }
  return stars;
};

// Component to render order details
const renderOrderDetail = (details, discount_amount, delivery_fees, status_restaurant) => {
  const totalAmount = details.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View>
      <View style={styles.statusContainer}>
     
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Quantity</Text>
          <Text style={styles.tableHeaderText}>Price</Text>
        </View>
        {details.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>₹{item.price}</Text>
          </View>
        ))}
        <View style={styles.tableFooter}>
          <Text style={styles.tableFooterText}>Total:</Text>
          <Text style={styles.tableFooterText}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.tableFooter}>
          <Text style={styles.tableFooterText}>Discount Amount:</Text>
          <Text style={styles.tableFooterText}>₹{discount_amount.toFixed(2)}</Text>
        </View>
        <View style={styles.tableFooter}>
          <Text style={styles.tableFooterText}>Delivery Fees:</Text>
          <Text style={styles.tableFooterText}>₹{delivery_fees.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const OrderListScreen = () => {
  const navigation = useNavigation();
  const { order, getOrderList } = useContext(UserContext);
  const [orders, setOrders] = useState(order || []);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const { user } = useContext(AuthContext);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setOrders((await getData(API_ORDER_BY_USER + user.email)));
    } catch (error) {
      console.error("Failed to refresh orders", error);
    } finally {
      setRefreshing(false);
    }
  }, [user.email]);

  const filteredOrders = orders.filter(item => {
    if (filter === 'all') return true;
    return item.status_restaurant === filter;
  });

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Image source={{ uri: item.restaurant.image_url || 'https://via.placeholder.com/50' }} style={styles.restaurantImage} />
        <View style={styles.orderInfo}>
          <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
          <Text style={styles.location}>{item.restaurant.street_address}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Order-Details", { orderId: item.id })}>
          <Icon name="dots-vertical" type="material-community" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => setExpandedOrder(expandedOrder === item.id ? null : item.id)}>
        <View style={styles.orderStatusContainer}>
          <Text style={styles.orderStatusText}>
            {item.status_restaurant === 'pending' && item.status_delivery === 'pending' && item.status_payment === 'pending' ?
              "Order has not been accepted by the restaurant." :
              item.status_restaurant === 'accept' && item.status_delivery === 'pending' && item.status_payment === 'pending' ?
                "Order is accepted by the restaurant but not yet delivered." :
                item.status_restaurant === 'delivery' && item.status_delivery === 'pending' && item.status_payment === 'pending' ?
                  "Order is prepared and ready for delivery." :
                  item.status_restaurant === 'accept' && item.status_delivery === 'accept' && item.status_payment === 'pending' ?
                    "Order is accepted and ready for delivery." :
                    item.status_restaurant === 'delivery' && item.status_delivery === 'accept' && item.status_payment === 'pending' ?
                      "Order is being delivered." :
                      item.status_restaurant === 'delivery' && item.status_delivery === 'delivery' && item.status_payment === 'pending' ?
                        "Order is delivered but payment is pending" :
                        item.status_restaurant === 'delivery' && item.status_delivery === 'delivery' && item.status_payment === 'paid' ?
                          "Order is delivered and payment is completed." :

                          item.status_restaurant === 'pending' && item.status_delivery === 'pending' && item.status_payment === 'paid' ?
                            "Order has not been accepted by the restaurant and payment is completed." :
                            item.status_restaurant === 'accept' && item.status_delivery === 'pending' && item.status_payment === 'paid' ?
                              "Order is accepted by the restaurant but not yet delivered." :
                              item.status_restaurant === 'delivery' && item.status_delivery === 'pending' && item.status_payment === 'paid' ?
                                "Order is prepared and ready for delivery." :
                                item.status_restaurant === 'accept' && item.status_delivery === 'accept' && item.status_payment === 'paid' ?
                                  "Order is accepted and ready for delivery." :
                                  item.status_restaurant === 'delivery' && item.status_delivery === 'accept' && item.status_payment === 'paid' ?
                                    "Order is being delivered." :
                                    item.status_restaurant === 'delivery' && item.status_delivery === 'delivery' && item.status_payment === 'paid' ?
                                      "Order is delivered but payment is pending" : "Unknown status combination."
            }
          </Text>
         
          <View style={[styles.orderHeader,{justifyContent:'space-evenly',marginTop:2,borderRadius:2}]}>
            <Text style={styles.orderTime}>{formatDate(item.created_at)}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status_restaurant) }]}>
              {getStatusText(item.status_restaurant)}
            </Text>
            <TouchableOpacity onPress={() => setExpandedOrder(expandedOrder === item.id ? null : item.id)}>
              <Icon name={expandedOrder === item.id ? 'chevron-up' : 'chevron-down'} type='material-community' size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      <Collapsible collapsed={expandedOrder !== item.id}>
        <View style={styles.orderDetailsContainer}>
          {renderOrderDetail(item.order_details, item.discount_amount, item.delivery_fees, item.status_restaurant)}
        </View>
      </Collapsible>
      <View style={styles.orderFooter}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>Rate:</Text>
          {renderStars(item.rating)}
        </View>
        <Text style={styles.paymentStatus}>{item.paymentStatus}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon} accessibilityLabel="Back">
          <Icon name="arrow-back" type="material" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="search" type="material" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by restaurant or dish"
          placeholderTextColor="#888"
        />
        <Icon name="mic" type="material" size={24} color="#888" />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, filter === 'pending' && styles.activeFilter]} onPress={() => setFilter('pending')}>
          <Text style={styles.filterText}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'accept' && styles.activeFilter]} onPress={() => setFilter('accept')}>
          <Text style={styles.filterText}>Accepted</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'delivery' && styles.activeFilter]} onPress={() => setFilter('delivery')}>
          <Text style={styles.filterText}>Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, filter === 'all' && styles.activeFilter]} onPress={() => setFilter('all')}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.orderList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff6347']}
          />
        }
      />
    </View>
  );
};

// Utility function to get status color
const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return '#f33';
    case 'accept':
      return '#ff6347';
    case 'delivery':
      return '#4caf50';
    default:
      return '#666';
  }
};

// Utility function to get status text
const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'accept':
      return 'Accepted';
    case 'delivery':
      return 'Delivery';
    default:
      return 'Unknown';
  }
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#f1f1f1',
  },
  activeFilter: {
    backgroundColor: '#ff6347',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  orderList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  orderInfo: {
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
  orderDetailsContainer: {
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 5,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tableFooterText: {
    fontWeight: 'bold',
    color: '#333',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#333',
  },
  orderStatusContainer: {
    marginBottom: 10,
  },
  orderStatusText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '900',
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
    fontWeight: '900',
  },
  status: {
    fontSize: 14,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginRight: 10,
  },
  paymentStatus: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
  },
});

export default OrderListScreen;
