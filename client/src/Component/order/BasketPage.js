import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import BasketPageMainComponent from "./BasketPageMainComponent";


function BasketPage() {

    return <>
        
        <div className="home-page-container" >
            <Header  />
            <Breadcrumb />
            < BasketPageMainComponent  />
        </div>

    </>
}
export default BasketPage;