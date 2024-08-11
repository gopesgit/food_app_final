export const API_FOOD_CATEGORIE="http://shop.mondalsoft.com/api/foodcategorie"
export const API_RESTAURANT="http://shop.mondalsoft.com/api/restaurant"
export const API_USER="http://shop.mondalsoft.com/api/user"
export const API_DELIVERY_ADDRESS="https://shop.mondalsoft.com/api/deliveryaddress"
export const API_ORDER="https://shop.mondalsoft.com/api/order"
export const API_ORDER_ITEM="https://shop.mondalsoft.com/api/orderdetails"
export const API_REST_FOOD="http://shop.mondalsoft.com/api/restaurant/"
export const API_DELIVERY_FEES_BY_RES="https://shop.mondalsoft.com/api/deliveryfeesbyrestaurants/"
export const API_COUPON_BY_RES="https://shop.mondalsoft.com/api/couponall/"
export const API_ORDER_BY_USER="https://shop.mondalsoft.com/api/orderbyuser/"
export const pizzaShops = {
    id: 1,
    title: "Authentic Pizza Joints",
    description: "Savor the taste of authentic pizzas from top pizzerias.",
    restaurants: [
      {
        id: 1,
        name: "Papa Johns",
        image: require("./../../assets/images/papajohn.jpeg"),
        //image:require("./../../assets/images/
        description:
          "Indulge in the crispy goodness of Pepperoni Pizza at Papa Johns.",
        lng: -79.9188239,
        lat: 43.264743,
        address: "1234, 5th Avenue ",
        rating: 4.3,
        reviews: 932,
        categories: "Italian Pizza",
        dishes: [
          {
            id: 1,
            name: "Pepperoni Pizza",
            description:
              "Classic pepperoni pizza topped with premium ingredients.",
            price: 11.99,
            image: require("./../../assets/images/PepperoniPizza.jpg"),
          },
          {
            id: 2,
            name: "BBQ Chicken Pizza",
            description:
              "Experience the tangy delight of BBQ chicken with onions on a pizza.",
            price: 13.99,
            image: require("./../../assets/images/BBQChicken.jpg"),
          },
          {
            id: 3,
            name: "Garlic Breadsticks",
            description:
              "Savor the aroma of freshly baked breadsticks with garlic butter.",
            price: 4.99,
            image: require("./../../assets/images/GarlicBreadsticks.jpg"),
          },
        ],
      },
      {
        id: 2,
        name: "Dominos",
        image: require("./../../assets/images/dominos.jpeg"),
        description:
          "Experience the cheesy paradise with a wide range of pizzas at Dominos.",
        lng: -79.938974,
        lat: 43.2202607,
        address: "2, Northwind Ave ",
        rating: 4.0,
        reviews: 575,
        categories: "Italian Fast Food",
        dishes: [
          {
            id: 1,
            name: "Margherita Pizza",
            description: "Simplicity at its best with classic Margherita Pizza.",
            price: 9.99,
            image: require("./../../assets/images/Margherita.jpg"),
          },
          {
            id: 2,
            name: "Supreme Pizza",
            description: "Indulge in a pizza loaded with a variety of toppings.",
            price: 14.99,
            image: require("./../../assets/images/Supreme.jpg"),
          },
          {
            id: 3,
            name: "Chicken Wings",
            description:
              "Add a spicy twist to your meal with our buffalo chicken wings.",
            price: 8.99,
            image: require("./../../assets/images/Wings.jpg"),
          },
        ],
      },
      {
        id: 3,
        name: "Pizza Hut",
        image: require("./../../assets/images/pizzahut.jpeg"),
        description:
          "Enjoy a family-friendly dining experience with a variety of pizzas at Pizza Hut.",
        lng: -79.93,
        lat: 43.22,
        address: "434, Second Street ",
        rating: 4.2,
        reviews: 293,
        categories: "American Pizza",
        dishes: [
          {
            id: 1,
            name: "Hawaiian Pizza",
            description:
              "Escape to the tropics with our Hawaiian Pizza featuring ham, pineapple, and cheese.",
            price: 12.99,
            image: require("./../../assets/images/Hawaiian.jpg"),
          },
          {
            id: 2,
            name: "Veggie Supreme Pizza",
            description:
              "Indulge in a veggie-packed delight with our Veggie Supreme Pizza.",
            price: 11.99,
            image: require("./../../assets/images/Veggie.jpg"),
          },
          {
            id: 3,
            name: "Stuffed Crust Pizza",
            description:
              "Experience the ooey-gooey delight of our cheese-filled Stuffed Crust Pizza.",
            price: 13.99,
            image: require("./../../assets/images/Stuffed.jpg"),
          },
        ],
      },
    ],
  };