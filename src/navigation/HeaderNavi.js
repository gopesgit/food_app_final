import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { Icon } from 'react-native-elements';
import { logout } from '../global/somecommonFunction';
import { AuthContext } from '../context/authContext';

const HeaderNavi = ({ onLogout, onOrders, onAccount, onClose }) => {
  const navigation = useNavigation();
  const { setUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);

  const openWhatsApp = () => {
    const url = 'whatsapp://send?phone=917003446332';
    Linking.openURL(url).catch((err) => {
      console.error('An error occurred', err);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="arrow-back" type="material" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Menu</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Icon name="account-circle" type="material" size={50} color="#007AFF" />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            {/*<TouchableOpacity>
              <Text style={styles.viewActivity}>View activity</Text>
            </TouchableOpacity>*/}
          </View>
        </View>
        {/*<TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.premiumText}>Join Premium</Text>
          
        </TouchableOpacity>*/}
        <TouchableOpacity style={styles.premiumButton} onPress={() => navigation.navigate('ProfileDetails')}>
          <Text style={styles.optionText}>Account</Text>
          <View style={styles.spacer} />
          <Icon name="chevron-right" type="material" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionCard}>
          <Icon name="heart-outline" type="material-community" size={30} color="#007AFF" />
          <Text style={styles.actionText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard} onPress={openWhatsApp}>
          <Icon name="whatsapp" type="material-community" size={30} color="#007AFF" />
          <Text style={styles.actionText}>Get Help</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionList}>
        <TouchableOpacity style={styles.optionItem} onPress={()=>navigation.navigate("Order-List")}>
          <Icon name="list-alt" type="material" size={24} color="#333" />
          <Text style={styles.optionText}>Orders</Text>
          <View style={styles.spacer} />
          <Icon name="chevron-right" type="material" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={() => logout(setUser)}>
          <Icon name="logout" type="material-community" size={24} color="#333" />
          <Text style={styles.optionText}>Logout</Text>
          <View style={styles.spacer} />
          <Icon name="chevron-right" type="material" size={24} color="#333" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    top:25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  spacer: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewActivity: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
  },
  premiumText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  optionList: {
    marginTop: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default HeaderNavi;
