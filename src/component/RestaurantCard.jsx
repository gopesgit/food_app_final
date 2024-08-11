import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const RestaurantCard = ({ restaurant }) => {
    const navigation = useNavigation();
   
    const handlePress = () => {
        navigation.navigate('Restaurant', { id: restaurant.id });
    };

    const restaurantName = restaurant?.name || 'Unknown Restaurant';
    const restaurantImage = restaurant?.image_url || 'https://via.placeholder.com/150';
    const restaurantRating = restaurant?.rating || 'No rating';
    const restaurantReviews = restaurant?.reviews || 'No reviews';
    const restaurantAddress = restaurant?.street_address ? restaurant.street_address.substring(0, 30) : 'No address available';
    const restaurantDescription = restaurant?.description.substring(0,30) || 'No description available';
    const restaurantBranch = restaurant?.branch || 'No branch specified';

    return (
        <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
            <Image
                source={{ uri: restaurantImage }}
                style={styles.restaurantImage}
                resizeMode="cover"
            />
            <View style={styles.infoContainer}>
                <Text style={styles.restaurantName}>{restaurantName}</Text>
                <View style={styles.ratingContainer}>
                    <Image
                        source={require('./../../assets/images/staricon.png')}
                        style={styles.starIcon}
                    />
                    <Text style={styles.ratingText}>{restaurantRating}</Text>
                    <Text style={styles.reviewsText}>({restaurantReviews} reviews)</Text>
                </View>
                <View style={styles.addressContainer}>
                    <Icon
                        name="map-pin"
                        type="feather"
                        color="#666"
                        size={16}
                        containerStyle={styles.addressIcon}
                    />
                    <Text style={styles.addressText}>Nearby {restaurantAddress}</Text>
                </View>
                <Text style={styles.branchText}>Branch: {restaurantBranch}</Text>
                <Text style={styles.descriptionText}>{restaurantDescription}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default RestaurantCard;

const styles = StyleSheet.create({
    cardContainer: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 15,
        elevation: 5,  // For Android shadow
        marginHorizontal: 8, // Add horizontal margin to separate cards
    },
    restaurantImage: {
        height: 120,
        width: 250,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    infoContainer: {
        padding: 10,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    starIcon: {
        height: 16,
        width: 16,
        marginRight: 5,
    },
    ratingText: {
        color: '#555',
        fontSize: 14,
    },
    reviewsText: {
        color: '#555',
        fontSize: 14,
        marginLeft: 5,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    addressIcon: {
        marginRight: 5,
    },
    addressText: {
        color: '#666',
        fontSize: 12,
    },
    branchText: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
    descriptionText: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
});
