import { Button } from "react-bootstrap";
import { addToCartAndUpdate, updateSiteData } from "../Utility/SiteHelper";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../../constants/store.constants";

const AddToCart = ({ label, productId }) => {

    const dispatch = useDispatch();

    const inputQty = 1;
    const addToCart = (productId) => {
        console.log("add to cart clicked....");

        /* addint to cart and updating local storage */
        let updatedSiteData = addToCartAndUpdate(productId, inputQty);

        console.log("sitedata after adding product : ",updatedSiteData);

        /* calling reduce to update the site state */
        dispatch({
            type: ADD_TO_CART,
            payload: {
                data: updatedSiteData.siteData.orders
            }
        })

        return;
    }

    return <>

        <Button className="btn btn-primary" onClick={() => addToCart(productId)} >{label}</Button>


    </>


}

export default AddToCart;