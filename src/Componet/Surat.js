import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Surat() {
    const navigate = useNavigate();
    const handleCardClick = (busName) => {
        navigate(`/bus/${busName}`);
    };
    return (
            <div className='container'>
                <div className='row'>
                    <h1 className='shrikhand-regular text-white bg-dark p-3'>Jay Maa Mogal</h1>
                    <Link to="/" className='btn btn-info mx-2 w-25'>Back</Link>
                    {/* <h2 className=' shrikhand-regular my-5 fw-bold'>Surat</h2> */}
                    <hr></hr>
                    <div className='col-lg-3 my-3 ' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Tarzzan6000')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Tarzzan(6000)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='v1.png' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3 ' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Tarzzan6001')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Tarzzan(6001)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='v1.png' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5 ' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('MonStar3100')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>MonStar(3100)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='monstar-1.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5 ' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('MonStar3200')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>MonStar(3200)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='monstar-1.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Mountain7001')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Mountain(7001)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='mountainslider.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px"  alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Mountain7002')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Mountain(7002)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='mountain-6.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px"  alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Miltray9981')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Miltray(9981)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='miltary-2.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Miltray9918')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Miltray(9918)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='miltary-2.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5 '  >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('MustangGT2001')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Mustang GT(2001)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='v3.png' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                     <div className='col-lg-3 my-3  rounded-5 '  >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('MustangGT2002')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Mustang GT(2002)</h2>
                            </div>
                            <div className='card-body'>
                                <img src='v3.png' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}
 