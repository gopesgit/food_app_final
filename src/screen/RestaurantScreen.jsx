import React, { useContext, useState, useRef, useEffect, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity, Modal, FlatList, RefreshControl } from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import DishRow from '../component/DishRow';
import CartIcon from '../component/CartIcon';
import { FoodViewContext } from '../context/viewContext';
import { getData } from '../global/somecommonFunction';
import { API_REST_FOOD } from '../global/data';

const RestaurantScreen = () => {
    const { params } = useRoute();
    const { id } = params;
    const navigation = useNavigation();
    const { foodmenuCata } = useContext(FoodViewContext);
    const [restaurant, setRestaurant] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [menuButtonText, setMenuButtonText] = useState("Menu");
    const [refreshing, setRefreshing] = useState(false);
    const scrollViewRef = useRef(null);
    const sectionRefs = useRef([]);

    const fetchRestaurantDetails = useCallback(async () => {
        try {
            const response = await getData(`${API_REST_FOOD}${id}/details`);
            // Assuming `response` is an array and we're filtering for active items
            //const data=response.filter(item => item.active)
            setRestaurant(response);
            //console.log(restaurant);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchRestaurantDetails();
    }, [fetchRestaurantDetails]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchRestaurantDetails();
        setRefreshing(false);
    };

    if (!restaurant || !foodmenuCata) {
        return <Text style={styles.loadingText}>Loading...</Text>;
    }

    const categories = foodmenuCata.map(category => ({
        ...category,
        items: restaurant.foods.filter(food => food.category_id === category.id)
    })).filter(category => category.items.length > 0);

    const filteredItems = selectedCategory
        ? categories.find(cat => cat.id === selectedCategory)?.items || []
        : restaurant.foods;

    const scrollToSection = (sectionIndex) => {
        setSelectedCategory(null);
        setModalVisible(false);
        setMenuButtonText("Menu");
        sectionRefs.current[sectionIndex]?.measureLayout(
            scrollViewRef.current,
            (x, y) => {
                scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
            }
        );
    };

    const toggleModal = () => {
        setModalVisible(prev => !prev);
        setMenuButtonText(prev => (prev === "Menu" ? "Close" : "Menu"));
    };
    console.log("catgories=>",categories);
    return (
        <View style={styles.container}>
            <CartIcon />
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ScrollView 
                ref={scrollViewRef} 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.imageContainer}>
                    <Image source={{ uri: restaurant.image_url }} style={styles.restaurantImage} />
                    <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.goBack()}>
                        <Icon type='material-community' name='arrow-left' size={32} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <Image source={{ uri: restaurant.logo_url }} style={styles.restaurantLogo} />
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Rating imageSize={18} readonly fractions={1} startingValue={restaurant.rating} />
                        <Text style={styles.ratingText}>{restaurant.rating}</Text>
                        <Text style={styles.reviewsText}>({restaurant.reviews} reviews)</Text>
                    </View>
                    <View style={styles.addressContainer}>
                        <Icon type='material-community' name='map-marker' size={20} color="#666" />
                        <Text style={styles.addressText}>Nearby {restaurant.street_address}</Text>
                    </View>
                    <Text style={styles.descriptionText}>{restaurant.description}</Text>
                </View>
                <View style={styles.filterContainer}>
                    <FlatList
                        data={categories}
                        horizontal
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.filterButton,
                                    selectedCategory === item.id && styles.selectedFilterButton
                                ]}
                                onPress={() => setSelectedCategory(item.id)}
                            >
                                <Text style={[
                                    styles.filterButtonText,
                                    selectedCategory === item.id && styles.selectedFilterButtonText
                                ]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.menuContainer}>
                    {
                    filteredItems.filter((item)=>item.active).map((dish, index) => (
                        <DishRow item={dish} key={index} />
                    ))}
                </View>
            </ScrollView>
            {/* <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
                <Icon name="restaurant-menu" size={30} color="#fff" />
                <Text style={styles.menuButtonText}>{menuButtonText}</Text>
            </TouchableOpacity> */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={toggleModal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Menu</Text>
                        {categories.map((category, index) => (
                            <TouchableOpacity key={index} onPress={() => scrollToSection(index)}>
                                <View style={styles.categoryRow}>
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                    <Text style={styles.categoryItemCount}>{category.items.length}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
    },
    imageContainer: {
        position: 'relative',
    },
    restaurantImage: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
    },
    backIconContainer: {
        position: 'absolute',
        top: 30,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 50,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    logoContainer: {
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -30 }],
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 50,
        padding: 10,
    },
    restaurantLogo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
    },
    detailsContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        marginTop: -20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    restaurantName: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#222',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    ratingText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5,
    },
    reviewsText: {
        fontSize: 16,
        color: '#555',
        marginLeft: 5,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    addressText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    descriptionText: {
        fontSize: 15,
        color: '#666',
        marginTop: 10,
    },
    filterContainer: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    filterButton: {
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
    },
    selectedFilterButton: {
        backgroundColor: '#ff6347',
    },
    filterButtonText: {
        fontSize: 16,
        color: '#555',
    },
    selectedFilterButtonText: {
        color: '#fff',
    },
    menuContainer: {
        paddingBottom: 100,
    },
    menuButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#ff6347',
        padding: 15,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    menuButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    categoryText: {
        fontSize: 18,
    },
    categoryItemCount: {
        fontSize: 18,
        color: '#777',
    },
});

export default RestaurantScreen;
