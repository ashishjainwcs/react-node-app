import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import LoginForm from "./LoginForm";


function LoginPage() {

    return <>
        <div className="home-page-container" >

            <Header  />
            <Breadcrumb />
            < LoginForm  />
        </div>

    </>
}

export default LoginPage;