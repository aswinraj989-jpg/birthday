# Quick Start Guide - Restaurant Billing Software

## Prerequisites
- Node.js 14+ installed
- npm or yarn package manager

## Installation & Running

### Option 1: Run Both Backend and Frontend (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

Then open `http://localhost:3000` in your browser.

## Workflow

### 1. Select a Table
- Click on any available table from the home screen
- Only available tables can be selected

### 2. Add Items to Order
- Browse items by category (Rice, Curry, Bread, Beverages, Appetizer)
- Click "+ Add" to add items to your order
- Items are displayed in the Order Summary panel

### 3. Manage Order
- View quantities and prices in the summary
- Click "✕" to remove items from the order
- See subtotal, tax, and grand total automatically calculated

### 4. Create Bill
- Click "Create Bill" when ready to finalize the order
- The bill will show all items, subtotal, tax (5%), and total

### 5. Payment
- Click "💳 Pay Bill" to process payment
- Table status changes back to "available"

## Default Credentials

**Home Page:** No login required

## Test Data

### Tables
- 4 tables with varying capacities (4, 6, 4, 8 seats)

### Menu Items
- 5 sample items across different categories
- Prices range from ₹50 to ₹320

## Features

✅ Real-time table occupancy tracking
✅ Dynamic menu with category filtering
✅ Automatic tax calculation (5%)
✅ Order summary with item removal
✅ Professional bill generation
✅ Payment processing
✅ Responsive design

## API Testing

Test the API using Postman or cURL:

```bash
# Get all tables
curl http://localhost:5000/api/tables

# Get all items
curl http://localhost:5000/api/items

# Get health check
curl http://localhost:5000/api/health
```

## Troubleshooting

**Port 5000 already in use:**
- Change the PORT in `backend/.env` to another port
- Update proxy in `frontend/package.json` accordingly

**Module not found errors:**
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**React app not connecting to backend:**
- Ensure backend is running on port 5000
- Check proxy setting in `frontend/package.json`

## Next Steps

1. Add more menu items to `backend/models/data.js`
2. Create additional tables in the data
3. Customize colors in CSS files
4. Add more features like discounts, coupons
5. Integrate a real database (MongoDB/PostgreSQL)

Enjoy your Restaurant Billing Software! 🍽️
