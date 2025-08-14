import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import CheckoutPaymentDetails from "./CheckoutPaymentDetails";



function CheckoutPaymentDetailsPage() {


    return <>
        
        <div className="home-page-container" >
            <Header  />
            <Breadcrumb />
            < CheckoutPaymentDetails  />
        </div>

    </>
}

export default CheckoutPaymentDetailsPage;