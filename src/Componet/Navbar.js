import React from 'react'
import {Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fw-semibold fs-3 shrikhand-regular" href="#">Vishvanath Travels</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-3 my-2">
                                <Link to='/surat'  className="btn btn-outline-success fw-bold fs-4" aria-current="page" href="#">Surat</Link>
                            </li>
                            <li className="nav-item mx-3 my-2">
                                <Link to='/bhav'  className="btn btn-outline-success fw-bold fs-4" aria-current="page" href="#">Bhavanagar</Link>
                            </li>
                            <li className="nav-item mx-3 my-2">
                                <Link to='/tana' className="btn btn-outline-success fw-bold fs-4" aria-current="page" href="#">Tana</Link>
                            </li>
                            <li className="nav-item mx-3 my-2">
                                <Link to='/surat' className="btn btn-outline-success fw-bold fs-4" aria-current="page" href="#">Talaja</Link>
                            </li>
                            
                        </ul>
                        
                    </div>
                </div>
            </nav>

        </div>
    )
}
