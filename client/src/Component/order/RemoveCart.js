import { Button } from "react-bootstrap";
import { addToCartAndUpdate, updateSiteData } from "../Utility/SiteHelper";
import { useDispatch } from "react-redux";
import { REMOVE_CART } from "../../constants/store.constants";
import { removeFromCartAndUpdate } from "../Utility/SiteHelper";


const RemoveCart = ({ label, productId }) => {

    const dispatch = useDispatch();

    const inputQty = 1;
    const removeFromCart = (productId) => {
        console.log("remove cart clicked....");

        /* addint to cart and updating local storage */
        let updatedSiteData = removeFromCartAndUpdate(productId, inputQty);

        console.log("sitedata after removing product : ",updatedSiteData);

        /* calling reduce to update the site state */
        dispatch({
            type: REMOVE_CART,
            payload: {
                data: updatedSiteData.siteData.orders
            }
        })

        return;
    }

    return <>

        <Button className="btn btn-primary" onClick={() => removeFromCart(productId)} >{label}</Button>


    </>


}

export default RemoveCart;