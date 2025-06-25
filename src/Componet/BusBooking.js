import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { database } from '../firebase';
import { ref, set, onValue, remove } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';

const TOTAL_SEATS = 36; // Increased to 36
const lowerDeckLayout = [
  [3, 1, 2],
  [9, 7, 8],
  [15, 13, 14],
  [21, 19, 20],
  [27, 25, 26],
  [33, 31, 32],

];

const upperDeckLayout = [
  [6, 4, 5],
  [12, 10, 11],
  [18, 16, 17],
  [24, 22, 23],
  [30, 28, 29],
  [36, 34, 35],
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

// Define couple seat pairs
const coupleSeatPairs = [
  [1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12],
  [13, 14], [15, 16], [17, 18], [19, 20], [21, 22], [23, 24]
];

// Helper to find the couple seat for a given seat
const getCoupleSeat = (seat) => {
  for (let pair of coupleSeatPairs) {
    if (pair.includes(seat)) {
      return pair.find(s => s !== seat);
    }
  }
  return null;
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
  const [editBooking, setEditBooking] = useState(null);

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

  // When editing, pre-fill the form and open the modal
  useEffect(() => {
    if (editBooking) {
      setSelectedSeat(editBooking.seat);
      setFormData({
        name: editBooking.name,
        number: editBooking.number,
        takeoff: editBooking.takeoff,
        destination: editBooking.destination,
        date: editBooking.date,
        busNumber: editBooking.busNumber,
      });
    }
  }, [editBooking]);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let coupleSeats = [selectedSeat];
    const couple = getCoupleSeat(selectedSeat);
    if (couple) coupleSeats.push(couple);
    coupleSeats = coupleSeats.sort((a, b) => a - b); // Always sorted
    const booking = {
      seat: Math.min(...coupleSeats), // Always the lowest seat for the booking
      coupleSeats,
      ...formData,
      busName: busId,
    };
    // Save both seats in Firebase
    coupleSeats.forEach(seatNum => {
      set(ref(database, `bookings/${busId}/${formData.date}/${seatNum}`), booking);
    });
    setSelectedSeat(null);
    toast(`Booking successful for seat${coupleSeats.length > 1 ? 's' : ''}: ${coupleSeats.join(', ')}`)
    setFormData({
      name: '',
      number: '',
      takeoff: '',
      destination: '',
      date: getTodayDate(),
      busNumber: '',
    });
    setEditBooking(null);
  };

  // Edit handler
  const handleEditBooking = (booking) => {
    setEditBooking(booking);
  };

  // Filter bookings for the selected date
  const bookingsForDateRaw = reservedSeats.filter(b => b.date === filterDate);
  // Only show one entry per couple booking
  const bookingsForDate = bookingsForDateRaw.filter((b, idx, arr) => {
    if (b.coupleSeats && b.coupleSeats.length > 1) {
      // Only show for the lowest seat in the couple
      return Math.min(...b.coupleSeats) === b.seat;
    }
    // For single seats, show as is
    return !arr.some((other, i) => i < idx && other.seat === b.seat && other.date === b.date);
  });
  const reservedSeatNumbers = reservedSeats.reduce((acc, b) => {
    if (b.coupleSeats && Array.isArray(b.coupleSeats)) {
      return acc.concat(b.coupleSeats);
    }
    return acc.concat(b.seat);
  }, []);

  // Delete booking by index in bookingsForDate
  const handleDeleteBooking = (booking) => {
    // Remove both seats if couple
    const seatsToRemove = booking.coupleSeats && Array.isArray(booking.coupleSeats) ? booking.coupleSeats : [booking.seat];
    Promise.all(seatsToRemove.map(seatNum => remove(ref(database, `bookings/${busId}/${booking.date}/${seatNum}`))))
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
      {/* Bus image at the top */}
      {/* <div className="text-center mb-3">
        <img src="/v1.png" alt="Bus" style={{ maxWidth: 200, borderRadius: 12 }} />
      </div> */}
      <Link
        to="/surat"
        className="btn btn-info"
      >
        Back
      </Link>
      <ToastContainer />
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 d-flex align-items-center justify-content-center">
            Bus Seat Booking - <span className="text-primary ms-2">{busId}</span>


          </h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-10 d-flex justify-content-around flex-wrap">
          <div>
            <h5 className="text-center">Lower Deck</h5>
            {renderDeck(lowerDeckLayout, reservedSeatNumbers, handleSeatClick)}
          </div>
          {busId === 'Mountain7474' && (
            <img src="/mountain-2.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
           {busId === 'Mountain7575' && (
            <img src="/mountain-2.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'Tarzzan6000' && (
            <img src="/v1.png" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'Tarzzan6001' && (
            <img src="/v1.png" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'MonStar3100' && (
            <img src="/monstar-1.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'MonStar3200' && (
            <img src="/monstar-1.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'Miltray9981' && (
            <img src="/miltary-3.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'Miltray9918' && (
            <img src="/miltary-3.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'MustangGT2001' && (
            <img src="/mastang-2.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          {busId === 'MustangGT2002' && (
            <img src="/mastang-2.jpg" alt="Tarzzan" className='mt-5' style={{ width: "300px", height: "300px", borderRadius: 8 }} onError={e => e.target.style.display = 'none'} />
          )}
          <div>
            <h5 className="text-center">Upper Deck</h5>
            {renderDeck(upperDeckLayout, reservedSeatNumbers, handleSeatClick)}
          </div>
        </div>
      </div>
      {/* Passenger List Table */}
      <div className="row justify-content-center mt-4">
        <div className="col-md-10">
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
                <div className="table-responsive">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Seat(s)</th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Bus Name</th>
                       
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookingsForDate.map((b, idx) => (
                        <tr key={idx} style={{ cursor: 'pointer' }}>
                          <td>{b.coupleSeats ? b.coupleSeats.join(', ') : b.seat}</td>
                          <td>{b.name}</td>
                          <td>{b.number}</td>
                          <td>{b.takeoff}</td>
                          <td>{b.destination}</td>
                          <td>{b.busName}</td>
                          
                          <td>
                            <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditBooking(b)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBooking(b)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
                <p><b>Seat{(modalBooking.coupleSeats && modalBooking.coupleSeats.length > 1) ? 's' : ''}:</b> {modalBooking.coupleSeats ? modalBooking.coupleSeats.join(', ') : modalBooking.seat}</p>
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
                <h5 className="modal-title">{editBooking ? `Edit Booking (Seat${formData.coupleSeats && formData.coupleSeats.length > 1 ? 's' : ''}: ${formData.coupleSeats ? formData.coupleSeats.join(', ') : selectedSeat})` : `Reserve Seat ${selectedSeat}`}</h5>
                <button type="button" className="btn-close" onClick={() => { setSelectedSeat(null); setEditBooking(null); }}></button>
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
                        value={busId}
                        onChange={handleChange}
                        required
                        disabled
                      />
                   
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-success">{editBooking ? 'Update' : 'Reserve'}</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => { setSelectedSeat(null); setEditBooking(null); }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 