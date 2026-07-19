import React, { useState } from 'react';
import './BillView.css';

function BillView({ bills, onPayBill, onEditOrder, onFreeTable, onReenterBill, onCallCleaners }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const unpaidBills = bills.filter(bill => bill.status === 'unpaid');
  const latestBill = unpaidBills[unpaidBills.length - 1];

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) formattedValue = formattedValue.slice(0, 19);
    }
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
    }
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (selectedPaymentMethod === 'card') {
      if (
        !cardDetails.cardNumber ||
        !cardDetails.cardName ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv
      ) {
        alert('Please fill all card details');
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      onPayBill(latestBill.id, selectedPaymentMethod);
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }, 1500);
  };

  if (!latestBill) {
    return <div className="no-bill">No unpaid bills found</div>;
  }

  if (paymentSuccess) {
    return (
      <div className="payment-success-container">
        <div className="success-animation">
          <div className="checkmark">✓</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment</p>
          <p className="transaction-id">Transaction ID: TXN-{Date.now()}</p>
          <p className="amount">₹{latestBill.total.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bill-view-container">
      <button 
        className="back-to-menu-btn"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>

      <div className="bill-payment-wrapper">
        {/* Bill Section */}
        <div className="bill-section">
          <div className="bill-paper">
            <div className="bill-header">
              <h1>🍽️ RECEIPT</h1>
              <div className="bill-number">Bill #{latestBill.id}</div>
              <div className="bill-date">
                {new Date(latestBill.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="bill-separator">═════════════════════════════════</div>

            <div className="bill-details">
              <div className="detail-row">
                <span>Table:</span>
                <span className="table-badge">TABLE {latestBill.tableId}</span>
              </div>
              <div className="detail-row">
                <span>Order ID:</span>
                <span>#{latestBill.orderId}</span>
              </div>
              <div className="detail-row">
                <span>Order Time:</span>
                <span>{new Date(latestBill.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="bill-separator">═════════════════════════════════</div>

            <div className="bill-items">
              <div className="bill-items-header">
                <div>Item</div>
                <div>Qty</div>
                <div>Price</div>
                <div>Amount</div>
              </div>
              {latestBill.items.map((item) => (
                <div key={item.itemId} className="bill-item-row">
                  <div>{item.itemName}</div>
                  <div>{item.quantity}</div>
                  <div>₹{item.price}</div>
                  <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="bill-separator">═════════════════════════════════</div>

            <div className="bill-amounts">
              <div className="amount-row">
                <span>Subtotal:</span>
                <span>₹{latestBill.subtotal.toFixed(2)}</span>
              </div>
              <div className="amount-row">
                <span>Tax ({latestBill.taxRate}%):</span>
                <span>₹{latestBill.taxAmount.toFixed(2)}</span>
              </div>
              <div className="amount-row total">
                <span>TOTAL AMOUNT:</span>
                <span>₹{latestBill.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bill-separator">═════════════════════════════════</div>

            <div className="bill-footer">
              <p>🙏 Thank you for dining with us!</p>
              <p>Please come again</p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="payment-section">
          <div className="payment-card">
            <h2>💳 Payment Information</h2>
            
            <div className="amount-display">
              <div className="payment-amount">₹{latestBill.total.toFixed(2)}</div>
              <div className="amount-label">Total Amount Due</div>
            </div>

            <form onSubmit={handlePayment}>
              {/* Payment Method Selection */}
              <div className="payment-methods">
                <label className={`method-option ${selectedPaymentMethod === 'card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="card"
                    checked={selectedPaymentMethod === 'card'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />
                  <span>💳 Debit/Credit Card</span>
                </label>

                <label className={`method-option ${selectedPaymentMethod === 'upi' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="upi"
                    checked={selectedPaymentMethod === 'upi'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />
                  <span>📱 UPI</span>
                </label>

                <label className={`method-option ${selectedPaymentMethod === 'cash' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="cash"
                    checked={selectedPaymentMethod === 'cash'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />
                  <span>💵 Cash</span>
                </label>

                <label className={`method-option ${selectedPaymentMethod === 'wallet' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value="wallet"
                    checked={selectedPaymentMethod === 'wallet'}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  />
                  <span>👛 Digital Wallet</span>
                </label>
              </div>

              {/* Card Details - Only show for card payment */}
              {selectedPaymentMethod === 'card' && (
                <div className="card-details-form">
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      placeholder="John Doe"
                      value={cardDetails.cardName}
                      onChange={handleCardInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.cardNumber}
                      onChange={handleCardInputChange}
                      maxLength="19"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleCardInputChange}
                        maxLength="5"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={handleCardInputChange}
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'upi' && (
                <div className="payment-info-box">
                  <p>📱 UPI Payment</p>
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., yourname@upi)"
                    className="upi-input"
                  />
                </div>
              )}

              {selectedPaymentMethod === 'cash' && (
                <div className="payment-info-box">
                  <p>💵 Cash Payment</p>
                  <p className="info-text">Please provide ₹{latestBill.total.toFixed(2)} in cash</p>
                </div>
              )}

              {selectedPaymentMethod === 'wallet' && (
                <div className="payment-info-box">
                  <p>👛 Digital Wallet</p>
                  <input
                    type="text"
                    placeholder="Wallet ID or Phone Number"
                    className="wallet-input"
                  />
                </div>
              )}

              {/* Payment Button */}
              <button
                type="submit"
                className="pay-button"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner"></span> Processing Payment...
                  </>
                ) : (
                  `Pay ₹${latestBill.total.toFixed(2)}`
                )}
              </button>

              <div className="action-buttons">
                <button
                  type="button"
                  className="edit-order-btn"
                  onClick={() => onEditOrder(latestBill.id)}
                >
                  ✏️ Edit Order
                </button>
                <button
                  type="button"
                  className="reenter-btn"
                  onClick={() => onReenterBill()}
                >
                  🔙 Re-enter Menu
                </button>
                <button
                  type="button"
                  className="free-table-btn"
                  onClick={() => onFreeTable(latestBill.tableId)}
                >
                  🚪 Free Table
                </button>
                <button
                  type="button"
                  className="cleaners-btn"
                  onClick={() => onCallCleaners()}
                >
                  🧹 Call Cleaners
                </button>
              </div>

              <div className="security-info">
                🔒 Your payment is secure and encrypted
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillView;
