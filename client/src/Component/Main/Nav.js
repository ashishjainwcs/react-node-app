import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { ADD_TO_CART, RESET_ACTION, REMOVE_CART } from "../../constants/store.constants";
import { useDispatch } from "react-redux";

function Nav() {
  const action = useSelector(state => state.action);
  const dispatch = useDispatch();
  /* to display product added modal */
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {

    /* state.action is setup to "ADD_TO_CART" when a product is added to cart */
    if (action === ADD_TO_CART) {
      setShow(true);
    } else if (action === REMOVE_CART) {
      setShowDelete(true);
    
    }

  }, [action]);

  const handleClose = () => {

    setShow(false);
    /* calling reduce to reset action */
    dispatch({
      type: RESET_ACTION,
      payload: {
        action: ""
      }
    })
  }

    const handleCloseDelete = () => {

    setShowDelete(false);
    /* calling reduce to reset action */
    dispatch({
      type: RESET_ACTION,
      payload: {
        action: ""
      }
    })
  }


  return (
    <>
      <div>
        <Outlet />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product has been added to your cart!!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Product Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product removed from cart!!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default Nav;
