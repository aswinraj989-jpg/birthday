import React, { useState } from 'react';
import './MenuBoard.css';

function MenuBoard({ items, onAddItem }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(items.map(item => item.category))];
  
  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="menu-board">
      <h2>📋 Menu</h2>
      
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <div className="item-name">{item.name}</div>
            <div className="item-category">{item.category}</div>
            <div className="item-price">₹{item.price}</div>
            <button
              className="add-btn"
              onClick={() => onAddItem(item)}
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuBoard;
