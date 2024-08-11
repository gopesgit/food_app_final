import React, { useContext, useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import HomeHeader from '../component/HomeHeader';
import FetuaredRow from '../component/FetuaredRow';
import { FoodViewContext } from '../context/viewContext';

export default function HomeScreen() {
  const { foodmenuCata, restaurant } = useContext(FoodViewContext);

  return (
    <View style={styles.homeContainer}>
      <HomeHeader />
      <ScrollView stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        
        {/* Search and Location Bar */}
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <Icon type='Ionicon' name='search' size={25} color="#666" onPress={() => console.log("Search")} />
            <TextInput placeholder="Restaurants" style={styles.searchInput} />
            <View style={styles.locationContainer}>
              <Icon type='material-community' name='map-marker' size={25} color="#666" onPress={() => console.log("Map")} />
              <Text style={styles.locationText}>Hamilton</Text>
            </View>
          </View>
        </View>

        {/* Image Carousel */}
        <View style={styles.sliderContainer}>
          <Swiper style={styles.swiper} autoplay={true}>
            <View style={styles.slider}>
              <Image source={{ uri: "https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" }} style={styles.slideImage} />
              <Text style={styles.textOverlayTop}>Some Text...</Text>
              <Text style={styles.textOverlayBottom}>Some Text...</Text>
            </View>
            <View style={styles.slider}>
              <Image source={{ uri: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141351.jpg" }} style={styles.slideImage} />
            </View>
            <View style={styles.slider}>
              <Image source={{ uri: "https://hospibuz.com/wp-content/uploads/2023/10/Bengali-food-1.jpg" }} style={styles.slideImage} />
            </View>
            <View style={styles.slider}>
              <Image source={{ uri: "https://assets.epicurious.com/photos/624d9590857fa7e509238b59/16:9/w_2560%2Cc_limit/RegionalChinese_HERO_033122_31320.jpg" }} style={styles.slideImage} />
            </View>
          </Swiper>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {foodmenuCata ? (
            <FlatList
              data={foodmenuCata}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable style={styles.categoryCard} onPress={() => console.log("Category Pressed")}>
                  <Image source={{ uri: item.image_url }} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{item.name}</Text>
                </Pressable>
              )}
            />
          ) : (
            <ActivityIndicator size="large" color="#007AFF" />
          )}
        </View>

        {/* Featured Restaurants */}
        {restaurant && (
          <View style={styles.featuredContainer}>
            <FetuaredRow item={restaurant.filter((item)=>!item.closed&item.active)} title="Open Restaurants" />
          </View>
        )}
          {restaurant && (
          <View style={styles.featuredContainer}>
            <FetuaredRow item={restaurant.filter((item)=>item.closed&item.active)} title="Featured Restaurants" />
          </View>
        )}
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchBarContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    paddingLeft: 8,
  },
  locationText: {
    color: '#666',
    marginLeft: 4,
  },
  sliderContainer: {
    marginHorizontal: 8,
  },
  swiper: {
    height: 180,
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textOverlayTop: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textOverlayBottom: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    paddingVertical: 6,
  },
  categoryCard: {
    marginHorizontal: 8,
    padding:8,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  featuredContainer: {
     paddingHorizontal: 8,
  },
});
