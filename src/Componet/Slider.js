import React from 'react'

export default function Slider() {
    return (
        <div>
            <div  id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" style={{width:"100%",height:"750px"}}>
                    <div className="carousel-item active">
                        <img src="vishwanthall.jpg" width="100%" height="1000px" className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="miltary1.jpg" width="100%" height="900px" className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="vnath3tmm.jpg" width="100%" height="1000px" className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="mountain.jpg" width="100%" height="1000px" className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="mountainslider.jpg" width="100%" height="1000px" className="d-block" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="vnathmmmrc.jpg" width="100%" height="1000px" className="d-block" alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    )
}
