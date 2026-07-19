// In-memory data storage (you can replace with MongoDB/MySQL later)

let items = [
  // Rice Dishes (10 items)
  { id: 1, name: 'Biryani', category: 'Rice', price: 250 },
  { id: 2, name: 'Fried Rice', category: 'Rice', price: 200 },
  { id: 3, name: 'Pilaf', category: 'Rice', price: 220 },
  { id: 4, name: 'Pulao', category: 'Rice', price: 240 },
  { id: 5, name: 'Hyderabadi Biryani', category: 'Rice', price: 280 },
  { id: 6, name: 'Lemon Rice', category: 'Rice', price: 180 },
  { id: 7, name: 'Coconut Rice', category: 'Rice', price: 190 },
  { id: 8, name: 'Vegetable Pulao', category: 'Rice', price: 210 },
  { id: 9, name: 'Saffron Rice', category: 'Rice', price: 260 },
  { id: 10, name: 'Egg Fried Rice', category: 'Rice', price: 230 },

  // Curry (10 items)
  { id: 11, name: 'Butter Chicken', category: 'Curry', price: 320 },
  { id: 12, name: 'Chicken Tikka Masala', category: 'Curry', price: 310 },
  { id: 13, name: 'Paneer Butter Masala', category: 'Curry', price: 290 },
  { id: 14, name: 'Lamb Curry', category: 'Curry', price: 380 },
  { id: 15, name: 'Fish Curry', category: 'Curry', price: 350 },
  { id: 16, name: 'Prawn Curry', category: 'Curry', price: 380 },
  { id: 17, name: 'Dal Makhani', category: 'Curry', price: 220 },
  { id: 18, name: 'Chole Bhature', category: 'Curry', price: 200 },
  { id: 19, name: 'Chana Masala', category: 'Curry', price: 180 },
  { id: 20, name: 'Aloo Gobi', category: 'Curry', price: 160 },

  // Bread (10 items)
  { id: 21, name: 'Naan', category: 'Bread', price: 50 },
  { id: 22, name: 'Garlic Naan', category: 'Bread', price: 60 },
  { id: 23, name: 'Butter Naan', category: 'Bread', price: 60 },
  { id: 24, name: 'Roti', category: 'Bread', price: 30 },
  { id: 25, name: 'Paratha', category: 'Bread', price: 40 },
  { id: 26, name: 'Kulcha', category: 'Bread', price: 55 },
  { id: 27, name: 'Puri', category: 'Bread', price: 35 },
  { id: 28, name: 'Bhatura', category: 'Bread', price: 50 },
  { id: 29, name: 'Chapati', category: 'Bread', price: 25 },
  { id: 30, name: 'Rumali Roti', category: 'Bread', price: 45 },

  // Appetizers (10 items)
  { id: 31, name: 'Paneer Tikka', category: 'Appetizer', price: 280 },
  { id: 32, name: 'Chicken Tikka', category: 'Appetizer', price: 300 },
  { id: 33, name: 'Seekh Kebab', category: 'Appetizer', price: 320 },
  { id: 34, name: 'Samosa', category: 'Appetizer', price: 80 },
  { id: 35, name: 'Spring Roll', category: 'Appetizer', price: 120 },
  { id: 36, name: 'Pakora', category: 'Appetizer', price: 150 },
  { id: 37, name: 'Fish Fry', category: 'Appetizer', price: 280 },
  { id: 38, name: 'Shrimp Tandoori', category: 'Appetizer', price: 350 },
  { id: 39, name: 'Chicken Lollipop', category: 'Appetizer', price: 250 },
  { id: 40, name: 'Tandoori Mushroom', category: 'Appetizer', price: 200 },

  // Beverages (10 items)
  { id: 41, name: 'Coke', category: 'Beverages', price: 60 },
  { id: 42, name: 'Sprite', category: 'Beverages', price: 60 },
  { id: 43, name: 'Fanta Orange', category: 'Beverages', price: 60 },
  { id: 44, name: 'Mango Lassi', category: 'Beverages', price: 100 },
  { id: 45, name: 'Sweet Lassi', category: 'Beverages', price: 90 },
  { id: 46, name: 'Chaach', category: 'Beverages', price: 50 },
  { id: 47, name: 'Fresh Lemonade', category: 'Beverages', price: 70 },
  { id: 48, name: 'Iced Tea', category: 'Beverages', price: 80 },
  { id: 49, name: 'Mango Shake', category: 'Beverages', price: 110 },
  { id: 50, name: 'Buttermilk', category: 'Beverages', price: 60 },

  // Desserts (9 items)
  { id: 51, name: 'Gulab Jamun', category: 'Desserts', price: 120 },
  { id: 52, name: 'Kheer', category: 'Desserts', price: 100 },
  { id: 53, name: 'Jalebi', category: 'Desserts', price: 80 },
  { id: 54, name: 'Rasgulla', category: 'Desserts', price: 110 },
  { id: 55, name: 'Basundi', category: 'Desserts', price: 90 },
  { id: 56, name: 'Payasam', category: 'Desserts', price: 100 },
  { id: 57, name: 'Ice Cream', category: 'Desserts', price: 120 },
  { id: 58, name: 'Halwa', category: 'Desserts', price: 110 },
  { id: 59, name: 'Laddu', category: 'Desserts', price: 80 },
];

let orders = [
  {
    id: 1,
    tableId: 1,
    items: [
      { itemId: 1, itemName: 'Biryani', price: 250, quantity: 1 },
      { itemId: 29, itemName: 'Coke', price: 60, quantity: 2 },
    ],
    totalAmount: 370,
    status: 'pending',
    createdAt: new Date(),
  },
  {
    id: 2,
    tableId: 3,
    items: [
      { itemId: 8, itemName: 'Butter Chicken', price: 320, quantity: 1 },
      { itemId: 15, itemName: 'Naan', price: 50, quantity: 1 },
      { itemId: 30, itemName: 'Sprite', price: 60, quantity: 1 },
    ],
    totalAmount: 430,
    status: 'pending',
    createdAt: new Date(),
  },
  {
    id: 3,
    tableId: 5,
    items: [
      { itemId: 22, itemName: 'Paneer Tikka', price: 280, quantity: 1 },
      { itemId: 36, itemName: 'Gulab Jamun', price: 120, quantity: 2 },
    ],
    totalAmount: 520,
    status: 'pending',
    createdAt: new Date(),
  },
];

let tables = [
  { id: 1, tableName: 'Table 1', occupancy: 4, status: 'available' },
  { id: 2, tableName: 'Table 2', occupancy: 6, status: 'available' },
  { id: 3, tableName: 'Table 3', occupancy: 4, status: 'available' },
  { id: 4, tableName: 'Table 4', occupancy: 8, status: 'available' },
  { id: 5, tableName: 'Table 5', occupancy: 4, status: 'available' },
  { id: 6, tableName: 'Table 6', occupancy: 6, status: 'available' },
  { id: 7, tableName: 'Table 7', occupancy: 4, status: 'available' },
  { id: 8, tableName: 'Table 8', occupancy: 8, status: 'available' },
  { id: 9, tableName: 'Table 9', occupancy: 4, status: 'available' },
  { id: 10, tableName: 'Table 10', occupancy: 6, status: 'available' },
];

let bills = [];

module.exports = {
  items,
  orders,
  tables,
  bills,
};
