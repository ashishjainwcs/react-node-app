import { validateFields } from "../Utility/FormValidation";
import { updateCartShippingDetails } from "../Utility/SiteHelper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADD_SHIPPING_DETAILS } from "../../constants/store.constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


function CheckoutShippingDetails() {

    let userId = useSelector((state) => state.siteData.siteData.loggedInUserId);
    const userBasket = useSelector(state => state.siteData.siteData.orders.filter((order) => order.userId === userId && order.status === "P"))[0];

    const dispatch = useDispatch();

    const navigate = useNavigate();

    console.log("userBasket befire adding ", userBasket);

    const handleSubmit = (event) => {
        event.preventDefault(); // stop page refresh

        const name = event.target.elements.name.value;
        const address = event.target.elements.address.value;
        const phoneNumber = event.target.elements.phoneNumber.value;

        let errorFound = 'false';
        if (!validateFields(name)) {
            alert("Please enter name");
            errorFound = 'true';
        }
        if (!validateFields(address)) {
            alert("Please enter address");
            errorFound = 'true';
        }
        if (!validateFields(phoneNumber)) {
            alert("Please enter phone number");
            errorFound = 'true';
        }

        if (errorFound === 'true') {
            return;
        }

        console.log("userBasket befire adding ", userBasket);
        /* adding order shipping details to local storage */
        let updatedOrders = updateCartShippingDetails(name, address, phoneNumber);

        console.log("updatedOrders befire adding ", updatedOrders);

        /* adding order shipping details to state object */
        updateStateCartShippingDetails(updatedOrders);

        navigate("/checkout-payment");

    }

    const updateStateCartShippingDetails = (updatedOrders) => {

        dispatch({
            type: ADD_SHIPPING_DETAILS,
            payload: {
                data: updatedOrders
            }
        })

    }

    useEffect(() => {

        if (userBasket === null || userBasket === undefined || userBasket.products === null || userBasket.products === undefined
            || userBasket.products.length === 0) {
            navigate('/');
        } else {
            if (!userBasket.name) {
                userBasket.name = "";
            }
            if (!userBasket.phoneNumber) {
                userBasket.phoneNumber = "";
            }
            if (!userBasket.address) {
                userBasket.address = "";
            }

        }

    })



    if (userBasket === null || userBasket === undefined || userBasket.products === null || userBasket.products === undefined
        || userBasket.products.length === 0) {

        return;
    } else {

        return <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
            <div className="row mb-3 text-center">
                <div className="col-sm-6">
                    <h1 className="mb-5">Shipping Details</h1>
                </div></div>
            <form className='col-xxl-6' onSubmit={handleSubmit}>
                <div className="row mb-3 text-center">
                    <label className="col-sm-4 col-form-label">Name : </label>
                    <div className="col-sm-8">
                        <input className='form-control' type='text' placeholder='Enter Full Name' name='name' defaultValue={userBasket.name} />
                    </div>
                </div>

                <div className="row mb-3 text-center">
                    <label className="col-sm-4 col-form-label">Address</label>
                    <div className="col-sm-8">
                        <input className='form-control' type='text' placeholder='Enter Address' name='address' defaultValue={userBasket.shippingAddress} />
                    </div>
                </div>

                <div className="row mb-3 text-center">
                    <label className="col-sm-4 col-form-label">Phone Number</label>
                    <div className="col-sm-8">
                        <input className='form-control' type='text' placeholder='Enter Phone number' name='phoneNumber' defaultValue={userBasket.phoneNumber} />
                    </div>
                </div>


                <div className="row mb-3 text-center">
                    <div className="col-sm-8">
                        <input type='submit' className='btn btn-primary mt-2' value="Proceed to Payment" />
                    </div>
                </div>

            </form>
        </div>
    }
}
export default CheckoutShippingDetails;