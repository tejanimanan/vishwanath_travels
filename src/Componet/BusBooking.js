import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { ref, set, onValue, remove } from 'firebase/database';

const TOTAL_SEATS = 36; // Increased to 36
const lowerDeckLayout = [
  ['A', 4, 3],
  ['C', 8, 7],
  ['E', 12,11],
  ['G', 16, 15],
  ['I', 20, 19],
  ['K', 24, 23],
  
];

const upperDeckLayout = [
  ['B', 2, 1],
  ['D', 6, 5],
  ['F', 10, 9],
  ['H', 14, 13],
  ['J', 18, 17],
  ['L', 22, 21],
];
const renderDeck = (layout, reservedSeatNumbers, handleSeatClick) => {
  return layout.map((row, rowIndex) => (
    <div className="d-flex mb-2" key={rowIndex}>
      {row.map((cell, colIndex) => {
        const isNumber = typeof cell === 'number';
        const isReserved = reservedSeatNumbers.includes(cell);
        return (
          <div
            key={colIndex}
            className={`d-flex align-items-center justify-content-center border me-2 ${isNumber ? 'btn' : ''} ${isReserved ? 'btn-danger' : isNumber ? 'btn-outline-primary' : 'bg-dark text-white'}`}
            style={{
              width: 50,
              height: 50,
              cursor: isNumber && !isReserved ? 'pointer' : 'default'
            }}
            onClick={() => isNumber && !isReserved && handleSeatClick(cell)}
          >
            {cell}
          </div>
        );
      })}
    </div>
  ));
};


const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function BusBooking() {
  const { busId } = useParams();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    takeoff: '',
    destination: '',
    date: getTodayDate(),
    busNumber: '',
  });
  const [reservedSeats, setReservedSeats] = useState([]); // [{seat, name, number, takeoff, destination, date}]
  const [filterDate, setFilterDate] = useState(getTodayDate());
  const [modalBooking, setModalBooking] = useState(null); // For modal
  const [message, setMessage] = useState(null); // For error/success messages

  // Load reserved seats from Firebase for this bus and date
  useEffect(() => {
    if (!busId || !filterDate) return;
    const bookingsRef = ref(database, `bookings/${busId}/${filterDate}`);
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bookingsArr = Object.values(data);
        setReservedSeats(bookingsArr);
      } else {
        setReservedSeats([]);
      }
    });
    return () => unsubscribe();
  }, [busId, filterDate]);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      seat: selectedSeat,
      ...formData,
      busName: busId,
    };
    set(ref(database, `bookings/${busId}/${formData.date}/${selectedSeat}`), booking)
      .then(() => {
        setMessage({ type: 'success', text: 'Booking successful!' });
      })
      .catch(() => {
        setMessage({ type: 'danger', text: 'Booking failed. Please try again.' });
      });
    setSelectedSeat(null);
    setFormData({
      name: '',
      number: '',
      takeoff: '',
      destination: '',
      date: getTodayDate(),
      busNumber: '',
    });
  };

  // Filter bookings for the selected date
  const bookingsForDate = reservedSeats.filter(b => b.date === filterDate);
  const reservedSeatNumbers = bookingsForDate.map(b => b.seat);

  // Delete booking by index in bookingsForDate
  const handleDeleteBooking = (booking) => {
    remove(ref(database, `bookings/${busId}/${booking.date}/${booking.seat}`))
      .then(() => {
        setMessage({ type: 'success', text: 'Booking deleted.' });
      })
      .catch(() => {
        setMessage({ type: 'danger', text: 'Failed to delete booking.' });
      });
  };

  // Modal close handler
  const handleCloseModal = () => setModalBooking(null);
  // Reserve form modal handler
  const handleCloseReserveModal = () => setSelectedSeat(null);

  return (
    <div className="container mt-4">
      {message && (
        <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}
      {/* Modal for booked ticket details */}
      {modalBooking && (
        <div className="modal show fade" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booked Ticket Details</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <p><b>Bus:</b> {modalBooking.busName}</p>
                <p><b>Bus Number:</b> {modalBooking.busNumber}</p>
                <p><b>Seat:</b> {modalBooking.seat}</p>
                <p><b>Name:</b> {modalBooking.name}</p>
                <p><b>Mobile:</b> {modalBooking.number}</p>
                <p><b>From:</b> {modalBooking.takeoff}</p>
                <p><b>To:</b> {modalBooking.destination}</p>
                <p><b>Date:</b> {modalBooking.date}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal for reserve seat form */}
      {selectedSeat && (
        <div className="modal show fade" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reserve Seat {selectedSeat}</h5>
                <button type="button" className="btn-close" onClick={handleCloseReserveModal}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Passenger Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Takeoff Place</label>
                    <input
                      type="text"
                      className="form-control"
                      name="takeoff"
                      value={formData.takeoff}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Destination Place</label>
                    <input
                      type="text"
                      className="form-control"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Bus Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="busNumber"
                      value={formData.busNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">Reserve</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={handleCloseReserveModal}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-4 d-flex align-items-center">
            Bus Seat Booking - <span className="text-primary ms-2">{busId}</span>
            {busId === 'Tarzzan' && (
              <img src="/vishwanath/public/v1.png" alt="Tarzzan" style={{ width: 40, height: 40, marginLeft: 10, borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
            )}
          </h2>
          {/* <div className="d-flex flex-wrap" style={{ maxWidth: 500 }}>
            {[...Array(TOTAL_SEATS)].map((_, i) => {
              const seatNum = i + 1;
              const isReserved = reservedSeatNumbers.includes(seatNum);
              return (
                <button
                  key={seatNum}
                  className={`m-2 btn ${isReserved ? 'btn-danger' : 'btn-outline-primary'}`}
                  style={{ width: 50, height: 50 }}
                  disabled={isReserved}
                  onClick={() => handleSeatClick(seatNum)}
                >
                  {seatNum}
                </button>
              );
            })}
          </div> */}
          <div className="d-flex justify-content-around flex-wrap">
            <div>
              <h5 className="text-center">Lower Deck</h5>
              {renderDeck(lowerDeckLayout, reservedSeatNumbers, handleSeatClick)}
            </div>
            <div>
              <h5 className="text-center">Upper Deck</h5>
              {renderDeck(upperDeckLayout, reservedSeatNumbers, handleSeatClick)}
            </div>
          </div>

        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <span className="fw-bold">Passenger List</span>
              <input
                type="date"
                className="form-control form-control-sm ms-2"
                style={{ width: 'auto' }}
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
              />
            </div>
            <div className="card-body" style={{ maxHeight: 400, overflowY: 'auto' }}>
              {bookingsForDate.length === 0 ? (
                <div className="text-muted">No bookings for this date.</div>
              ) : (
                <ul className="list-group">
                  {bookingsForDate.map((b, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} onClick={() => setModalBooking(b)}>
                      <div>
                        <div><b>Seat:</b> {b.seat}</div>
                        <div><b>Name:</b> {b.name}</div>
                        <div><b>Mobile:</b> {b.number}</div>
                        <div><b>From:</b> {b.takeoff} <b>To:</b> {b.destination}</div>
                        <div><b>Bus Name:</b> {b.busName}</div>
                        <div><b>Bus Number:</b> {b.busNumber}</div>
                      </div>
                      <button className="btn btn-sm btn-danger" onClick={e => { e.stopPropagation(); handleDeleteBooking(b); }} title="Delete Booking">Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 