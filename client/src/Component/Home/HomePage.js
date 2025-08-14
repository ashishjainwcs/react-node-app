import Header from "../Header/Header";
import RecommendedProducts from "../Marketing/RecommendedProducts";
import Carousel from "./Carousel";
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";

function HomePage() {

    const [show, setShow] = useState(false);


    return (
        <>
            <div className="home-page-container">
                <Header  />
                <Carousel />
                <RecommendedProducts />


                <Modal show={show} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Product Added</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Product has been added to your cart!!</Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    );
}

export default HomePage;
