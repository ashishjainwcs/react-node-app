import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import CheckoutShippingDetails from "./CheckoutShippingDetails";



function CheckoutPage() {


    return <>
        
        <div className="home-page-container" >
            <Header  />
            <Breadcrumb />
            < CheckoutShippingDetails  />
        </div>

    </>
}

export default CheckoutPage;