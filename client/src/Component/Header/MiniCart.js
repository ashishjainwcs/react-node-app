
import cartLogo from "./../../images/cart.svg";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MiniCart = () => {

    const [pendingOrder, setPendingOrder] = useState({});
    const orders = useSelector(state => state.siteData.siteData.orders);
    const loggedInUserId = useSelector(state => state.siteData.siteData.loggedInUserId);

    console.log("minicart", pendingOrder);
    console.log("mini cart state orders", orders);

    const handleShowCart = () => {
        var element = document.getElementById("miniCartIcon");
        element.classList.toggle("displayBlock");
        window.addEventListener('click', function (e) {
            if (document.getElementById('miniCartParentIcon').contains(e.target)) {
                console.log("inside");
            } else {
                console.log("outside");
                document.getElementById('miniCartIcon').classList.remove("displayBlock");
            }
        });
    }

    useEffect(() => {
        console.log("mini cart useEffect");
        if (orders !== null && orders !== undefined) {
        orders.map((order) => {
                console.log(order.userId, loggedInUserId);                        
            if (order.userId === loggedInUserId && order.status==="P")  {
                
                console.log("header order" ,order, " Pending ",pendingOrder);
                setPendingOrder(order);
                return;
            }
        });

        }
    });


    return <>
        <div className="mini-cart-container" id="miniCartParentIcon">
            <button variant="link" onClick={() => handleShowCart()} title="Boots Logo" className="">
                {" "}
                <img
                    src={cartLogo}
                    border="0"
                    alt="Site Logo"
                    className="cart-logo"
                />{" "}
            </button>

            <ul className="mini-cart-content" id="miniCartIcon">
                {pendingOrder !== null && pendingOrder !== undefined && Object.keys(pendingOrder).length > 0 && pendingOrder.products.length > 0 ?
                    <li className="mini-cart-suggestion" >

                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" colSpan={3} > Your Basket</th>
                                </tr>
                                <tr>
                                    <th scope="col"> Product</th>
                                    <th scope="col">  Price </th>
                                    <th scope="col">  Quantity </th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingOrder.products.map((product, index) =>
                                    <>
                                        <tr key={index}>
                                            <td> {product.productCode} </td>
                                            <td> {product.productPrice} </td>
                                            <td> {product.qty} </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={3}>
                                                Product Total : {product.productPrice * product.qty}
                                            </td>
                                        </tr>
                                    </>


                                )}
                                <tr>
                                    <td colSpan={3}>
                                        Order Total : {pendingOrder.totalAmount}
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan={3}>
                                        <Link className="btn btn-primary" to={`/basket-page`} > Show Basket </Link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </li>
                    :
                    <li> Basket is empty</li>

                }
            </ul>
        </div>




    </>






};

export default MiniCart;