import React from 'react';
import './OrderSummary.css';

function OrderSummary({ order, onRemoveItem, onCreateBill }) {
  return (
    <div className="order-summary">
      <h2>🛒 Order Summary</h2>
      
      <div className="order-items">
        {order.items.length === 0 ? (
          <p className="empty-order">No items added yet</p>
        ) : (
          order.items.map((item) => (
            <div key={item.itemId} className="order-item">
              <div className="item-details">
                <div className="item-info">
                  <div className="item-name">{item.itemName}</div>
                  <div className="item-qty">x{item.quantity}</div>
                </div>
                <div className="item-amount">₹{item.price * item.quantity}</div>
              </div>
              <button
                className="remove-btn"
                onClick={() => onRemoveItem(item.itemId)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      <div className="order-total">
        <div className="total-row">
          <span>Subtotal:</span>
          <span>₹{order.totalAmount}</span>
        </div>
        <div className="total-row">
          <span>Tax (5%):</span>
          <span>₹{Math.round(order.totalAmount * 5 / 100)}</span>
        </div>
        <div className="total-row grand-total">
          <span>Total:</span>
          <span>₹{Math.round(order.totalAmount * 1.05)}</span>
        </div>
      </div>

      <button
        className="create-bill-btn"
        onClick={onCreateBill}
        disabled={order.items.length === 0}
      >
        Create Bill
      </button>
    </div>
  );
}

export default OrderSummary;
