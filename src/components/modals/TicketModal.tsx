import React, { useState } from 'react';
import { X, ShoppingCart, Ticket, Smartphone } from 'lucide-react';
import { events } from '../../data/mockData';
import { TicketData } from '../../types';

interface TicketModalProps {
  eventId: string;
  onClose: () => void;
}

export const TicketModal: React.FC<TicketModalProps> = ({ eventId, onClose }) => {
  const event = events.find((e) => e.id === eventId);
  const [ticketData, setTicketData] = useState<TicketData>({
    quantity: 1,
    ticketType: 'standard',
    totalPrice: 1500,
    paymentMethod: 'upi',
  });
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  if (!event) return null;

  const TICKET_PRICES = {
    standard: 1500,
    vip: 2500,
  };

  const handleQuantityChange = (quantity: number) => {
    const newQuantity = Math.max(1, Math.min(10, quantity));
    setTicketData({
      ...ticketData,
      quantity: newQuantity,
      totalPrice: newQuantity * TICKET_PRICES[ticketData.ticketType],
    });
  };

  const handleTicketTypeChange = (type: 'standard' | 'vip') => {
    setTicketData({
      ...ticketData,
      ticketType: type,
      totalPrice: ticketData.quantity * TICKET_PRICES[type],
    });
  };

  const processPayment = () => {
    setProcessingPayment(true);
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentComplete(true);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-industrial-gray border border-industrial-gray-light rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-industrial-gray border-b border-industrial-gray-light px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Ticket size={20} className="text-acid-green" />
            Get Tickets
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-acid-green transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!paymentComplete ? (
            <>
              {/* Event Summary */}
              <div className="mb-6 pb-6 border-b border-industrial-gray-light">
                <h3 className="text-lg font-bold text-acid-green mb-2">{event.title}</h3>
                <p className="text-sm text-gray-400">{event.date}</p>
              </div>

              {/* Ticket Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-acid-green mb-3">
                  TICKET TYPE
                </label>
                <div className="space-y-2">
                  {(['standard', 'vip'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTicketTypeChange(type)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        ticketData.ticketType === type
                          ? 'bg-acid-green text-black border-acid-green'
                          : 'border-industrial-gray-light text-white hover:border-acid-green'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{type} Ticket</span>
                        <span className="font-bold">₹{TICKET_PRICES[type]}</span>
                      </div>
                      <p className="text-xs opacity-75 mt-1">
                        {type === 'standard'
                          ? 'General Admission + Playlist Access'
                          : 'Premium Access + Meet & Greet + Priority Seating'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-acid-green mb-3">
                  QUANTITY
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(ticketData.quantity - 1)}
                    className="px-3 py-2 bg-industrial-gray-light hover:bg-industrial-gray-lighter rounded"
                  >
                    −
                  </button>
                  <span className="text-center font-bold min-w-12">{ticketData.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(ticketData.quantity + 1)}
                    className="px-3 py-2 bg-industrial-gray-light hover:bg-industrial-gray-lighter rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6 pb-6 border-b border-industrial-gray-light">
                <label className="block text-sm font-bold text-acid-green mb-3">
                  PAYMENT METHOD
                </label>
                <div className="space-y-2">
                  {(['upi', 'card'] as const).map((method) => (
                    <button
                      key={method}
                      onClick={() => setTicketData({ ...ticketData, paymentMethod: method })}
                      className={`w-full p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                        ticketData.paymentMethod === method
                          ? 'bg-acid-green text-black border-acid-green'
                          : 'border-industrial-gray-light text-white hover:border-acid-green'
                      }`}
                    >
                      {method === 'upi' ? (
                        <Smartphone size={18} />
                      ) : (
                        <ShoppingCart size={18} />
                      )}
                      <span className="font-medium capitalize">
                        {method === 'upi' ? 'UPI' : 'Card'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-black rounded-lg p-4 mb-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">
                    {ticketData.quantity}x {ticketData.ticketType.charAt(0).toUpperCase() + ticketData.ticketType.slice(1)}
                  </span>
                  <span className="text-white">₹{(ticketData.quantity * TICKET_PRICES[ticketData.ticketType]).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service Fee</span>
                  <span className="text-white">₹{(ticketData.totalPrice * 0.1).toFixed(0)}</span>
                </div>
                <div className="border-t border-industrial-gray-light pt-2 flex justify-between font-bold">
                  <span className="text-acid-green">TOTAL</span>
                  <span className="text-acid-green">₹{(ticketData.totalPrice + ticketData.totalPrice * 0.1).toFixed(0)}</span>
                </div>
              </div>

              {/* Proceed to Payment */}
              <button
                onClick={processPayment}
                disabled={processingPayment}
                className={`w-full py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  processingPayment
                    ? 'bg-industrial-gray-light opacity-50'
                    : 'bg-acid-green text-black hover:shadow-neon-green-lg'
                }`}
              >
                {processingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} />
                    Proceed to {ticketData.paymentMethod === 'upi' ? 'UPI' : 'Card'} Payment
                  </>
                )}
              </button>
            </>
          ) : (
            /* Success */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-acid-green text-black rounded-full mb-4 animate-pulse-neon">
                <Ticket size={32} />
              </div>
              <h3 className="text-2xl font-bold text-acid-green mb-3">Tickets Secured!</h3>
              <p className="text-gray-300 mb-4">
                You have {ticketData.quantity} {ticketData.ticketType} ticket(s) for {event.title}
              </p>
              <div className="bg-black rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-400 mb-2">Confirmation Email</p>
                <p className="font-mono text-acid-green text-sm">Sent to your registered email</p>
              </div>
              <p className="text-sm text-gray-400">
                Coordinates will be revealed 4 hours before the event
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
