import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import OrderConfirmationPageDetails from "./OrderConfirmationPageDetails";



function OrderConfirmationPage() {


    return <>
        
        <div className="home-page-container" >
            <Header  />
            <Breadcrumb />
            < OrderConfirmationPageDetails  />
        </div>

    </>
}

export default OrderConfirmationPage;