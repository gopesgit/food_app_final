import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { CheckBox, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/userContext';
import { API_DELIVERY_ADDRESS } from '../global/data';
import { updateData, deleteData } from '../global/somecommonFunction';

const ChangeAddressScreen = () => {
    const { adresses, getAddressesList } = useContext(UserContext);
    const navigation = useNavigation();
  console.log(adresses);
    const toggleAddress = async (id, status) => {
        const formdata = new FormData();
        formdata.append('_method', 'put');
        formdata.append('is_default', status.toString()); // Set is_default = 1 for the selected address, 0 for others
        await updateData(formdata, `${API_DELIVERY_ADDRESS}/${id}`);
    };

    const handleSelectAddress = async (id) => {
        try {
            await Promise.all(adresses.map(async (element) => {
                if (element.id !== id) {
                    await toggleAddress(element.id, 0);
                }
            }));
            await toggleAddress(id, 1);
            console.log('All addresses updated successfully');
            getAddressesList(); // Refresh the addresses list after updating
        } catch (error) {
            console.error('Error updating addresses:', error);
            Alert.alert('Error', 'Failed to update address.');
        }
    };

    const handleEditAddress = (item) => {
        navigation.navigate('Edit-Address', { addressItem: item });
    };

    const handleDeleteAddress = async (item) => {
        try {
            const formdata = new FormData();
            formdata.append('_method', 'put');
            formdata.append('active',0); // Set is_default = 1 for the selected address, 0 for others
            await updateData(formdata, `${API_DELIVERY_ADDRESS}/${item.id}`);
            getAddressesList(); // Refresh the addresses list after deleting
        } catch (error) {
            console.error('Error deleting address:', error);
            Alert.alert('Error', 'Failed to delete address.');
        }
    };

    const renderItem = ({ item }) => (
        <View key={item.id} style={styles.addressContainer}>
            <View style={styles.addressDetails}>
                <CheckBox
                    checked={item.is_default}
                    onPress={() => handleSelectAddress(item.id)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    containerStyle={styles.checkboxContainer}
                />
                <View style={styles.addressInfo}>
                    <Text style={styles.addressText}>{item.street_address}</Text>
                    <Text>{item.description}</Text>
                    <Text style={styles.phoneText}>Phone: {item.description}</Text>
                    <Text style={styles.locationText}>{item.near_location}, {item.city}, {item.state}, {item.country}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEditAddress(item)} style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteAddress(item)} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
                    <Icon name="arrow-back" type="material" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Addresses</Text>
            </View>

            <FlatList
                data={adresses}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Add-Address')}>
                <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',        
        paddingTop: 20,
    },
    header: {        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#007bff',
        borderBottomWidth: 1,
        borderBottomColor: '#0056b3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    headerIcon: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    flatListContent: {
        paddingBottom: 20,
    },
    addressContainer: {
        marginVertical:10,
       
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    addressDetails: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    addressInfo: {
        flex: 1,
        marginLeft: 10,
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    phoneText: {
        fontSize: 14,
        color: '#888',
    },
    locationText: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    checkboxContainer: {
        margin: 0,
        padding: 0,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    addButton: {
        marginTop: 20,
        backgroundColor: '#28a745',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
});

export default ChangeAddressScreen;
