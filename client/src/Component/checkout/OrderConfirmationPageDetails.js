import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function OrderConfirmationPageDetails() {

    let { orderId } = useParams();

    const orders = useSelector(state => state.siteData.siteData.orders);
    console.log("order confirm page : all orders", orders);
    const loggedInUserId = useSelector(state => state.siteData.siteData.loggedInUserId);
    const basket = orders.filter((order) => order.userId === loggedInUserId && order.status === "C" && order.ordersId === parseInt(orderId))[0];
    console.log("order confirm page current order ", basket);

    const navigate = useNavigate();

    useEffect(() => {

        if (basket === null || basket === undefined) {
            navigate('/');
        }


    })


    if (orderId === undefined || orderId === "" || basket === null || basket === undefined) {
        return;
    } else {


        return <>

            <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
                <div className="row mb-3 text-center">
                    <div className="">
                        <h1 className="mb-5">Order Confirmation Page</h1>
                        <h2 className="mb-5">Your order {orderId} is confirmed.</h2>
                        <div className="">
                            <div className="product-detail-container">
                                <div className="card h-100">

                                    <table class="table">
                                        <thead>

                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>
                                                    Shipping Details
                                                </th>
                                                <th>
                                                     Payment Details
                                                </th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Name:
                                                                </td>
                                                                <td>
                                                                    {basket.name}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Shipping Address:
                                                                </td>
                                                                <td>
                                                                    {basket.shippingAddress}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    Phone Number:
                                                                </td>
                                                                <td>
                                                                    {basket.phoneNumber}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>



                                                <td>
                                                   

                                                    <table class="table table-bordered">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    Payment Mode:
                                                                </td>
                                                                <td>
                                                                    {basket.paymentDetails}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2}>
                                                    <Link className="btn btn-primary" to={`/shop`} > Continue Shopping </Link>

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>

    }
}
export default OrderConfirmationPageDetails;