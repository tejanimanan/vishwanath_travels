import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid position-relative">
                {/* Left Logo */}
                <a className="navbar-brand fw-semibold fs-3 shrikhand-regular" href="#">
                    <img src="vishwnathlogo.png" alt="Logo" width="50px" />
                </a>

                {/* Center Title */}
                <h2 className="position-absolute top-50 start-50 translate-middle m-0 shrikhand-regular">
                    બાપા ના આશીર્વાદ
                </h2>

                {/* Toggler and Right Button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item mx-3 my-2">
                            <Link to="/surat" className="btn btn-outline-success fw-bold fs-4">Booking</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
