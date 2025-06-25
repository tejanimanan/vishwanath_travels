// components/VishwanathTicket.jsx
import React from 'react';
// import './ticket.css'; // Optional: External styles if needed

export default function VishwanathTicket({ booking }) {
  return (
    <div className="ticket border border-dark p-3 mb-3" style={{ width: '300px', fontFamily: 'Arial, sans-serif' }}>
      <div className="text-center mb-2">
        <h5 className="fw-bold m-0">વિશ્વનાથ ટ્રાવેલ્સ</h5>
        <small>Vishwanath Travels</small>
      </div>
      <div className="border border-dark p-2">
        <p className="m-1"><b>તારીખ :</b> {booking.date}</p>
        <p className="m-1"><b>ગામ :</b> {booking.takeoff}</p>
        <p className="m-1"><b>થી :</b> {booking.destination}</p>
        <p className="m-1"><b>સીટ નં. :</b> {booking.coupleSeats ? booking.coupleSeats.join(', ') : booking.seat}</p>
        <p className="m-1"><b>કુલ સીટ :</b> {booking.coupleSeats ? booking.coupleSeats.length : 1}</p>
        <p className="m-1"><b>ગાડી નં. :</b> {booking.busNumber}</p>
        <p className="m-1"><b>કુલ રકમ :</b> ₹500</p>
      </div>
      <div className="mt-2 text-center">
        <small>હેડ ઓફિસ સુરત / ભાવનગર</small>
      </div>
    </div>
  );
}
