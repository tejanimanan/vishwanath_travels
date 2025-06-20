import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Surat() {
    const navigate = useNavigate();
    const handleCardClick = (busName) => {
        navigate(`/bus/${busName}`);
    };
    return (
            <div className='container'>
                <div className='row'>
                    <h1 className='shrikhand-regular text-white bg-dark p-3'>શિવ કા દાસ કભી ના ઉદાસ </h1>
                    <h2 className=' shrikhand-regular my-5 fw-bold'>Surat</h2>
                    <hr></hr>
                    <div className='col-lg-3 my-3 ' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Tarzzan')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Tarzzan</h2>
                            </div>
                            <div className='card-body'>
                                <img src='v1.png' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5 ' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('MonStar')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>MonStar</h2>
                            </div>
                            <div className='card-body'>
                                <img src='monstar-1.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Mountain')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Mountain</h2>
                            </div>
                            <div className='card-body'>
                                <img src='mountainslider.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px"  alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5' >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('Miltray')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Miltray</h2>
                            </div>
                            <div className='card-body'>
                                <img src='miltary-2.jpg' className='rounded-5 border-3 border border-info' width="200px" height="200px" alt='..'></img>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 my-3  rounded-5 '  >
                        <div className='card rounded-5' style={{cursor:'pointer'}} onClick={() => handleCardClick('MustangGT')}>
                            <div className='card-header'>
                                <h2 className='fw-bold'>Mustang GT</h2>
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
 