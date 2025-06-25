import React from 'react';
// import './Ticket.css'; // Add optional custom styling if needed
// import logo from '../assets/logo512.png'; // Use correct path to logo

const Ticket = ({ passenger }) => {
  const {
    name,
    village,
    seat,
    totalSeats,
    busNumber,
    price
  } = passenger;

  return (
    <div className="ticket border border-dark p-3" style={{ width: '350px', fontFamily: 'sans-serif', background: '#fff' }}>
      <div className="text-center mb-2">
        <img src={""} alt="Vishwanath Logo" style={{ width: '60px' }} />
        <h5 className="fw-bold mt-1" style={{ fontSize: '18px' }}>વિશ્વનાથ ટ્રાવેલ્સ</h5>
      </div>

      <div className="ticket-body">
        <div className="row border border-dark mb-1 p-1">
          <div className="col-6 border-end border-dark">તારીખ :</div>
          <div className="col-6">{new Date().toLocaleDateString('gu-IN')}</div>
        </div>

        <div className="row border border-dark mb-1 p-1">
          <div className="col-6 border-end border-dark">ગામ :</div>
          <div className="col-6">{village}</div>
        </div>

        <div className="row border border-dark mb-1 p-1">
          <div className="col-6 border-end border-dark">સીટ નં. :</div>
          <div className="col-6">{seat}</div>
        </div>

        <div className="row border border-dark mb-1 p-1">
          <div className="col-6 border-end border-dark">કુલ સીટ :</div>
          <div className="col-6">{totalSeats}</div>
        </div>

        <div className="row border border-dark mb-1 p-1">
          <div className="col-6 border-end border-dark">ગાડી નં. :</div>
          <div className="col-6">₹ {price}</div>
        </div>
      </div>

      <div className="ticket-footer mt-3 text-center" style={{ fontSize: '12px' }}>
        <p className="mb-1 fw-bold text-primary">હેડ ઓફીસ સુરત</p>
        <p className="mb-1">U-8, સહજાનંદ કોમ્પ્લેક્સ, સીઆલ, સુરત. Mo. 98258 12021</p>
        <p className="mb-1 fw-bold text-primary">હેડ ઓફીસ ભાવનગર</p>
        <p>બસ સ્ટેન્ડની સામે, વિજય સરદાર કાફેની બાજુમાં. Mo. 98250 20021</p>
      </div>
    </div>
  );
};

export default Ticket;
