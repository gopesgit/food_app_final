import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, Switch } from 'react-native';
import * as Location from 'expo-location';
import { AuthContext } from '../context/authContext';


const AddressForm = ({ initialValues, onSubmit }) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const { user } = useContext(AuthContext);
    
    console.log(user);
    useEffect(() => {
        // Assuming getPermissions handles permission checks
        // getPermissions();
    }, []);

    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    const handleSubmit = () => {
        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            Alert.alert('Validation Error', 'Please fill all required fields.');
        } else {
            onSubmit(formData);
        }
    };

    const validateFormData = (data) => {
        let errors = {};
        if (!data.street_address) {
            errors.street_address = 'Street Address is required';
        }
        if (!data.city) {
            errors.city = 'City is required';
        }
        if (!data.state) {
            errors.state = 'State is required';
        }
        if (!data.postal_code) {
            errors.postal_code = 'Postal Code is required';
        }
        if (!data.country) {
            errors.country = 'Country is required';
        }
        if (!data.description) {
            errors.description = 'Description is required';
        }
        if (!data.near_location) {
            errors.near_location = 'Near Location is required';
        }
      

        return errors;
    };

    const fetchCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Location Permission', 'Permission to access location was denied.');
                return;
            }
            const { coords } = await Location.getCurrentPositionAsync({});
            const location = await Location.reverseGeocodeAsync({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
            console.log(location);
            const addressParts = location[0].formattedAddress.split(',').map(part => part.trim());
            const addressWithoutCode = addressParts.slice(1).join(', ');
            setFormData({
                ...formData,
                latitude: coords.latitude.toString(),
                longitude: coords.longitude.toString(),
                postal_code: location[0].postalCode || '',
                street_address: addressWithoutCode||'',
                city: location[0].city || '',
                state: location[0].region || '',
                country: location[0].country || '',
                description:user.phone ,
                near_location: location[0].streetNumber|| '',
             
                is_default:0,
                active:1,

            });
        } catch (error) {
            console.error('Error fetching location:', error);
            Alert.alert('Location Error', 'Failed to fetch current location.');
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <TextInput
                    placeholder="Street Address"
                    multiline
                    value={formData.street_address}
                    onChangeText={(text) => handleChange('street_address', text)}
                    style={styles.textInput}
                />
                {errors.street_address && <Text style={styles.error}>{errors.street_address}</Text>}

                <TextInput
                    placeholder="City"
                    value={formData.city}
                    onChangeText={(text) => handleChange('city', text)}
                    style={styles.textInput}
                />
                {errors.city && <Text style={styles.error}>{errors.city}</Text>}

                <TextInput
                    placeholder="State"
                    value={formData.state}
                    onChangeText={(text) => handleChange('state', text)}
                    style={styles.textInput}
                />
                {errors.state && <Text style={styles.error}>{errors.state}</Text>}

                <TextInput
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChangeText={(text) => handleChange('postal_code', text)}
                    keyboardType="numeric"
                    style={styles.textInput}
                />
                {errors.postal_code && <Text style={styles.error}>{errors.postal_code}</Text>}

                <TextInput
                    placeholder="Country"
                    value={formData.country}
                    onChangeText={(text) => handleChange('country', text)}
                    style={styles.textInput}
                />
                {errors.country && <Text style={styles.error}>{errors.country}</Text>}

                <TextInput
                    placeholder="Description"
                    
                    value={formData.description}
                    onChangeText={(text) => handleChange('description', text)}
                    style={styles.textInput}
                />
                {errors.description && <Text style={styles.error}>{errors.description}</Text>}

                <TextInput
                    placeholder="Near Location"
                    value={formData.near_location}
                    onChangeText={(text) => handleChange('near_location', text)}
                    style={styles.textInput}
                />
                {errors.near_location && <Text style={styles.error}>{errors.near_location}</Text>}

                
{/* 
                <TextInput
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChangeText={(text) => handleChange('latitude', text)}
                    keyboardType="numeric"
                    style={styles.textInput}
                />
                <TextInput
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChangeText={(text) => handleChange('longitude', text)}
                    keyboardType="numeric"
                    style={styles.textInput}
                /> */}

                {/* <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Default Address</Text>
                    <Switch
                        value={formData.is_default}
                        onValueChange={(value) => handleChange('is_default', value)}
                    />
                </View>

                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>Active</Text>
                    <Switch
                        value={formData.active}
                        onValueChange={(value) => handleChange('active', value)}
                    />
                </View> */}

                <TouchableOpacity style={styles.locationButton} onPress={fetchCurrentLocation}>
                    <Text style={styles.locationButtonText}>Get Current Location</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    error: {
        color: '#d9534f',
        marginBottom: 10,
        fontSize: 14,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        fontSize: 16,
        marginRight: 10,
        color: '#333',
    },
    locationButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    locationButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#28a745',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    submitButtonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddressForm;
