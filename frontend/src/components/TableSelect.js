import React from 'react';
import './TableSelect.css';

function TableSelect({ tables, onSelectTable, onClearTable, pendingOrders, onCompletePendingOrder, onCancelPendingOrder, onStartNewOrder, onClosePendingOrders }) {
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClosePendingOrders?.();
    }
  };

  return (
    <div className="table-select-container">
      <h2>Select a Table</h2>

      {/* Pending Orders Modal */}
      {pendingOrders && pendingOrders.length > 0 && (
        <div className="pending-orders-modal" onClick={handleModalBackdropClick}>
          <div className="pending-orders-content">
            <div className="modal-header">
              <h3>📋 Pending Orders for This Table</h3>
              <button 
                className="close-modal-btn"
                onClick={() => onClosePendingOrders?.()}
                title="Close"
              >
                ✕
              </button>
            </div>
            <div className="pending-orders-list">
              {pendingOrders.map((order) => (
                <div key={order.id} className="pending-order-item">
                  <div className="order-info">
                    <div className="order-id">Order #{order.id}</div>
                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item.itemId} className="item-detail">
                          {item.itemName} x{item.quantity}
                        </div>
                      ))}
                    </div>
                    <div className="order-total">Total: ₹{order.totalAmount}</div>
                  </div>
                  <div className="order-actions">
                    <button
                      className="complete-order-btn"
                      onClick={() => onCompletePendingOrder(order.id)}
                    >
                      ✓ Complete
                    </button>
                    <button
                      className="cancel-order-btn"
                      onClick={() => onCancelPendingOrder(order.id)}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="new-order-btn"
              onClick={() => onStartNewOrder()}
            >
              + Start New Order
            </button>
          </div>
        </div>
      )}

      <div className="tables-grid">
        {tables.map((table) => (
          <div key={table.id} className="table-card-wrapper">
            <button
              className={`table-card ${table.status}`}
              onClick={() => onSelectTable(table)}
              disabled={table.status === 'occupied'}
              title={table.status === 'occupied' ? 'Table is being used' : 'Available to use'}
            >
              <div className="table-number">🪑 {table.tableName}</div>
              <div className="table-capacity">Seats: {table.occupancy}</div>
              <div className={`table-status ${table.status}`}>
                {table.status === 'available' ? '✓ Available' : '⏳ In Use'}
              </div>
            </button>
            {table.status === 'occupied' && (
              <button
                className="clear-table-btn"
                onClick={() => onClearTable(table.id)}
                title="Clean and clear this table"
              >
                🧹 Clean
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableSelect;
