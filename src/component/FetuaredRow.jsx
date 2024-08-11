import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import RestaurantCard from './RestaurantCard';

const FetuaredRow = ({ item, title }) => {
    // Function to render each item
    const renderItem = ({ item }) => <RestaurantCard restaurant={item} />;

    // Check if item is an array and has elements
    const isNotEmptyArray = Array.isArray(item) && item.length > 0;

    return (
        <View style={styles.container}>
            {isNotEmptyArray && (
                <>
                    {/* Header Section */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.title}>{title}</Text>
                        {/* Uncomment and adjust this section if you want to use the "See All" button */}
                        {/* <TouchableOpacity style={styles.seeAllButton} onPress={() => console.log('See All Pressed')}>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity> */}
                    </View>

                    {/* FlatList for Restaurant Cards */}
                    <FlatList
                        data={item}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollViewContainer}
                    />
                </>
            )}
        </View>
    );
};

export default FetuaredRow;

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        backgroundColor: '#f8f8f8',
        paddingVertical: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAllButton: {
        backgroundColor: '#007AFF',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    seeAllText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollViewContainer: {
        paddingHorizontal: 8,
    },
});
