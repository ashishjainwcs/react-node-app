import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";

import RegistrationForm from "./RegistrationForm";


function RegistrationPage() {


    return <>
        
        <div className="home-page-container" >
            <Header  />
            <Breadcrumb />
            < RegistrationForm  />
        </div>

    </>
}

export default RegistrationPage;