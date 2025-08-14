import { validateFields } from "../Utility/FormValidation";
import { updateCartPaymentTypes } from "../Utility/SiteHelper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADD_PAYMENT_DETAILS } from "../../constants/store.constants";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";


function CheckoutPaymentDetails() {

    const [selectedValue, setSelectedValue] = useState("");
    let userId = useSelector((state) => state.siteData.siteData.loggedInUserId);
    const userBasket = useSelector(state => state.siteData.siteData.orders.filter((order) => order.userId === userId && order.status === "P"))[0];
    const paymentTypes = useSelector(state => state.siteData.siteData.paymentTypes);
    const [orderId, setOrderId] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();


    console.log("paymentTypes befire adding ", paymentTypes);

    console.log("user paymetn basket " , userBasket);
    const handleSubmit = (event) => {
        event.preventDefault(); // stop page refresh

        console.log("user basket ::: ", userBasket.ordersId);
        setOrderId(userBasket.ordersId);

        if (!validateFields(selectedValue)) {
            alert("Please select Payment mode");
            return;
        }

        /* adding order shipping details to local storage */
        let updatedOrders = updateCartPaymentTypes(selectedValue);

        //      console.log("updatedOrders befire adding ", updatedOrders);

        /* adding order shipping details to state object */

        updateStateCartPaymentTypes(updatedOrders);

        console.log("orderID :::", userBasket.ordersId);
        navigate("/order-confirm/"+userBasket.ordersId);

    }

    const updateStateCartPaymentTypes = (updatedOrders) => {

        dispatch({
            type: ADD_PAYMENT_DETAILS,
            payload: {
                data: updatedOrders
            }
        })

    }

    const onChange = (e) => {
        setSelectedValue(e.target.value);
    }

    useEffect(() => {

        if (userBasket === null || userBasket === undefined) {
            if (orderId === "") {
                navigate('/');
            }
        } else {
            if (!userBasket.name || userBasket.name === "") {
                navigate('/checkout-page');
            }
            if (!userBasket.phoneNumber || userBasket.phoneNumber === "") {
                navigate('/checkout-page');
            }
            if (!userBasket.shippingAddress || userBasket.shippingAddress==="") {
                navigate('/checkout-page');
            }

        }

    })


    if (userBasket === null || userBasket === undefined) {

        return;
    } else {

        return <>
            <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
                <div className="row mb-3 text-center">
                    <div className="col-sm-6">
                        <h1 className="mb-5">Payment Details</h1>
                    </div></div>
                <form className='col-xxl-6' onSubmit={handleSubmit}>
                    <div className="row mb-3">


                        <label className="col-sm-4 col-form-label"></label>
                        <div className="col-sm-8">
                            {paymentTypes.map((paymentType, index) => (

                                <div key={index} className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault" value={paymentType} onChange={onChange} />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        {paymentType}
                                    </label>
                                </div>


                            ))}

                        </div>
                    </div>


                    <div className="row mb-3 text-center">
                        <div className="col-sm-8">
                            <input type='submit' className='btn btn-primary mt-2' value="Confirm Order" />
                        </div>
                    </div>

                </form>
            </div>
        </>
    }

}

export default CheckoutPaymentDetails;