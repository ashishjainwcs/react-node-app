import { useSelector } from "react-redux";
import RemoveCart from "./RemoveCart";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function BasketPageMainComponent() {

    const loggedInUserType = useSelector(state => state.siteData.siteData.loggedInUserType);

    const orders = useSelector(state => state.siteData.siteData.orders);
    const loggedInUserId = useSelector(state => state.siteData.siteData.loggedInUserId);
    const basket = orders.filter((order) => order.userId === loggedInUserId && order.status === "P")[0];
    const navigate = useNavigate();


    const redirectToCheckoutPage = () => {
        navigate('/checkout-page');
    }

    console.log("current basket ", basket);

    useEffect(() => {

        if (basket === null || basket === undefined) {
            navigate('/');
        }
    })




    if (basket === null || basket === undefined) {

        return;
    } else {

        return <>

            <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
                <div className="row mb-3 text-center">
                    <div className="">
                        <h1 className="mb-5">Basket Page</h1>
                        <div className="">
                            <div className="product-detail-container">
                                <div className="card h-100">

                                    <table>
                                        <thead>

                                        </thead>
                                        <tbody>
                                            {basket.products.map((product) => (
                                                <tr className="basket-product-list-row" >
                                                    <td >
                                                        <img src={product.imgSrc} className="card-img-top-basket" alt="..." />

                                                    </td>
                                                    <td>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{product.productName}</h5>
                                                            <p className="card-text">Price    : {product.productPrice}</p>
                                                            <p className="card-text">Qty    : {product.qty}</p>
                                                            <p className="card-text">Category :{product.categoryCode}</p>
                                                        </div>
                                                        <div className="card-footer text-center">
                                                            {loggedInUserType !== "" ? <span>

                                                                <RemoveCart label={"Remove"} productId={product.productId} />
                                                            </span> : <span>

                                                            </span>
                                                            }
                                                        </div>

                                                    </td>
                                                </tr>

                                            ))
                                            }
                                            <tr className="basket-product-list-row" >
                                                <td colSpan={2}>
                                                    <div className="card-body">
                                                        <p className="card-text ">Order Total    :  {basket.totalAmount} </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="basket-product-list-row" >
                                                <td colSpan={2}>
                                                    <div className="card-body">
                                                        <Button onClick={() => redirectToCheckoutPage()}>
                                                            Checkout
                                                        </Button>

                                                    </div>
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
export default BasketPageMainComponent;